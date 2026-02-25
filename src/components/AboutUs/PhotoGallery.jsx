"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const PICTURES = 12;
const HOVER_ZONES = 9;

export default function PhotoGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/gallery?page=1&limit=12")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.images && data.images.length > 0) {
          const fetchedUrls = data.images.map(img => img.imageUrl);

          let finalImages = [];
          while (finalImages.length < PICTURES) {
            finalImages.push(...fetchedUrls);
          }

          setImages(finalImages.slice(0, PICTURES));
        }
      })
      .catch((err) => console.error("Error fetching gallery images:", err));
  }, []);

  // Fallback to dummy images if loading or API fails
  const displayImages = images.length === PICTURES
    ? images
    : Array.from({ length: PICTURES }, (_, i) => `https://picsum.photos/seed/kidzt${i + 5}/800/600`);

  return (
    <section className={`w-full py-24 bg-white overflow-hidden relative ${poppins.className}`}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-start gap-4">
            <span className="w-12 h-[2px] bg-black"></span>
            <h2 className="text-sm md:text-base font-semibold  tracking-[0.2em] uppercase text-black">
              OUR GALLERY
            </h2>
           
          </div>
        </motion.div>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          Glimpses of the joy, creativity, and wonder that fills our classrooms every day.
        </p>
      </div>

      {/* Gallery Strip */}
      <div className="flex justify-center items-center w-full min-h-[500px]">
        <nav
          className="photo-nav"
          style={{
            "--max-p": PICTURES,
            "--max-z": HOVER_ZONES,
          }}
        >
          {displayImages.map((url, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="photo-item"
              style={{
                "--i": i,
                "--img": `url('${url}')`,
              }}
            >
              <div className="photo-img"></div>
              <aside className="hover-zone">
                {Array.from({ length: HOVER_ZONES }, (_, j) => (
                  <i key={j}></i>
                ))}
              </aside>
            </a>
          ))}
        </nav>
      </div>

      {/* We use dangerouslySetInnerHTML to bypass styled-jsx which corrupts modern CSS math functions */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .photo-nav {
          /* calculate hover region */
          --r: calc(var(--max-z) * (var(--p, 0) - 1) + var(--z, 0)); 
          
          /* normalized [0-1] */
          --r-n: calc(
            (var(--r) - 1) / (var(--max-z) * var(--max-p) - 1)
          );
          
          /* BIGGER SIZES: block-size is height, inline-size is width */
          block-size: clamp(300px, 60vh, 500px);
          inline-size: min(100%, 1400px);

          display: flex;
          align-items: flex-end;
          position: relative;
          
          perspective: 2500px;
          transform-style: preserve-3d;
          --dir: 0deg;
        }

        @media (max-width: 1024px) {
           .photo-nav {
              block-size: min(100vw, 800px);
              inline-size: min(100%, 350px);
              writing-mode: sideways-rl;
              --dir: -90deg;
           }
        }

        .photo-nav > a.photo-item {  
          flex: 1;
          block-size: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          color: inherit;
          cursor: pointer;
          transform-style: preserve-3d;
          text-decoration: none;
          
          /* timing defaults */
          --ts: calc(
            70ms * var(--falloff, 0) +
            300ms * (1 - var(--falloff, 0))
          );
          
          --fs: calc(
            0.1s * var(--falloff,0) +
            0.8s * (1 - var(--falloff,0))
          );
          
          transition: 
            scale var(--op, .15s),
            filter var(--fs),
            transform var(--ts, 300ms),
            flex .3s;
        }

        .photo-nav a.photo-item {
          --p-n: calc(var(--i) / (var(--max-p) - 1));
          --diff: calc(var(--p-n) - var(--r-n, 0));  
          --u: calc(abs(var(--diff)) / var(--w, 0.4)); 
            
          --w: 0.4;
          --falloff: clamp(calc(0.5 * (1 + cos(min(var(--u), 1) * 180deg))), 0, 1);
          
          --tilt: calc(clamp(-1,var(--diff) * 5, 1) * var(--falloff) * 70deg);
          
          transform: 
            translateZ(calc(var(--falloff) * 20rem))
            rotateY(calc(var(--tilt) * cos(var(--dir))))
            rotateX(calc(var(--tilt) * sin(var(--dir))));
          
          filter: 
            brightness(max(.5, var(--falloff, 0) * 1.2))
            saturate(max(0.7, var(--falloff, 0)));
        }

        .photo-img {
          background: var(--img);
          background-color: #dde4f0;
          background-size: cover;
          background-position: center;
          width: 100%;
          height: 100%;
          margin-inline: 0.15em;
          border-radius: 8px;
        }

        .hover-zone {
          position: absolute;
          inset: 0;
          inset-inline: -3px;
          display: flex;
          z-index: 999;
        }

        .hover-zone > i {
          flex: 1;
          transition: .3s;
        }

        .hover-zone::after {
          position: absolute;
          inset: 0;
        }
        
        .hover-zone:active::after, 
        .hover-zone:hover:not(:has(> i:hover))::after,
        a.photo-item:focus-visible .hover-zone::after {
          content: '';
          pointer-events: all;
          --o: 1;
        }

        /* update z coordinate when hovering active card's hover zone */
        .photo-nav:has(.hover-zone:hover):not(:has(i:hover)), 
        .photo-nav:has(a.photo-item:focus-visible) {
          --z: calc((var(--max-z) + 1) / 2);
        }
        
        /* Expand the card dynamically */
        .photo-nav:has(.hover-zone:hover):not(:has(i:hover)) a.photo-item:hover, 
        .photo-nav:has(a.photo-item:focus-visible) a.photo-item:focus-visible {
          flex: 4;
        }

        /* The ugly but necessary index definitions for pictures --p */
        .photo-nav:has(a.photo-item:nth-child(1):is(:hover,:focus-visible)) {--p: 1;}
        .photo-nav:has(a.photo-item:nth-child(2):is(:hover,:focus-visible)) {--p: 2;}
        .photo-nav:has(a.photo-item:nth-child(3):is(:hover,:focus-visible)) {--p: 3;}
        .photo-nav:has(a.photo-item:nth-child(4):is(:hover,:focus-visible)) {--p: 4;}
        .photo-nav:has(a.photo-item:nth-child(5):is(:hover,:focus-visible)) {--p: 5;}
        .photo-nav:has(a.photo-item:nth-child(6):is(:hover,:focus-visible)) {--p: 6;}
        .photo-nav:has(a.photo-item:nth-child(7):is(:hover,:focus-visible)) {--p: 7;}
        .photo-nav:has(a.photo-item:nth-child(8):is(:hover,:focus-visible)) {--p: 8;}
        .photo-nav:has(a.photo-item:nth-child(9):is(:hover,:focus-visible)) {--p: 9;}
        .photo-nav:has(a.photo-item:nth-child(10):is(:hover,:focus-visible)) {--p: 10;}
        .photo-nav:has(a.photo-item:nth-child(11):is(:hover,:focus-visible)) {--p: 11;}
        .photo-nav:has(a.photo-item:nth-child(12):is(:hover,:focus-visible)) {--p: 12;}

        /* and index definitions for hover zones --z */
        .hover-zone i {
           /* Needed anchor */
        }
        
        .photo-nav:has(.hover-zone i:nth-child(1):hover) {--z: 1;}
        .photo-nav:has(.hover-zone i:nth-child(2):hover) {--z: 2;}
        .photo-nav:has(.hover-zone i:nth-child(3):hover) {--z: 3;}
        .photo-nav:has(.hover-zone i:nth-child(4):hover) {--z: 4;}
        .photo-nav:has(.hover-zone i:nth-child(5):hover) {--z: 5;}
        .photo-nav:has(.hover-zone i:nth-child(6):hover) {--z: 6;}
        .photo-nav:has(.hover-zone i:nth-child(7):hover) {--z: 7;}
        .photo-nav:has(.hover-zone i:nth-child(8):hover) {--z: 8;}
        .photo-nav:has(.hover-zone i:nth-child(9):hover) {--z: 9;}
      ` }} />
    </section>
  );
}
