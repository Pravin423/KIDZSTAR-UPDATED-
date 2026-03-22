import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomScroll from "@/components/ZoomScroll";
import Vision from "@/components/AboutUs/Vision";
import Team from "@/components/AboutUs/Team";
import Curriculum from "@/components/AboutUs/Curriculum";
import PhotoGallery from "@/components/AboutUs/PhotoGallery";
import CreativeSurroundings from "@/components/AboutUs/CreativeSurroundings";
import BestFacilities from "@/components/AboutUs/BestFacilities";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import CatChatbot from "@/components/CatChatbot";

export default function About() {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  // Refs for measuring section positions
  const creativeRef = useRef(null);
  const curriculumRef = useRef(null);

  // Scroll range: Creative start → Curriculum bottom
  const [catRange, setCatRange] = useState([9999, 10000]);
  const [catVisible, setCatVisible] = useState(false);
  const [catLanded, setCatLanded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsNavbarActive(latest > 0.3);
  });

  // Measure section positions after mount
  useEffect(() => {
    const measure = () => {
      if (creativeRef.current && curriculumRef.current) {
        const start = creativeRef.current.offsetTop;
        const end =
          curriculumRef.current.offsetTop +
          curriculumRef.current.offsetHeight -
          window.innerHeight;
        setCatRange([start, Math.max(end, start + 1)]);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Show/hide cat and detect landing
  useMotionValueEvent(scrollY, "change", (latest) => {
    setCatVisible(latest >= catRange[0] - 10);
    const landAt = catRange[0] + (catRange[1] - catRange[0]) * 0.65;
    setCatLanded(latest >= landAt);
  });

  // Y: slides from top (10vh) down to landing position (72vh)
  const rawCatY = useTransform(scrollY, catRange, ["10vh", "72vh"]);
  // Scale: small (0.18) through Team, grows to full (0.32) in Curriculum
  const rawCatScale = useTransform(
    scrollY,
    [
      catRange[0],
      catRange[0] + (catRange[1] - catRange[0]) * 0.5,
      catRange[0] + (catRange[1] - catRange[0]) * 0.65,
      catRange[1],
    ],
    [0.18, 0.18, 0.32, 0.32]
  );

  // Spring smoothing on all values
  const springCfg = { stiffness: 55, damping: 18, mass: 0.9 };
  const catY = useSpring(rawCatY, springCfg);
  const catScale = useSpring(rawCatScale, springCfg);

  return (
    <>
      <Head>
        <title>About Us - Kidzstar</title>
      </Head>

      <div className="relative bg-[#0D3697]">
        <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={!isNavbarActive} />

        {/* Scroll container — ZoomScroll animations for all screens */}
        <div className="relative h-[500vh] overflow-x-hidden">

          {/* Fixed Background Video */}
          <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute w-auto min-w-full min-h-full max-w-none object-cover">
              <source src="/space.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Step 1: "About Us" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] md:[text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[2.2rem] md:text-[5rem] uppercase md:whitespace-nowrap"
            scrollPoints={[0, 0.1, 0.18]}
            scaleValues={[1, 1, 50]}
            xValues={["0%", "0%", "3%"]}
            opacityValues={[1, 1, 0]}
          >
            About Us
          </ZoomScroll>

          {/* Step 2: "Welcome to Kidzstar" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] md:[text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[1.6rem] md:text-[5rem] uppercase md:whitespace-nowrap text-center px-4 md:px-0"
            scrollPoints={[0.2, 0.28, 0.58, 0.68]}
            scaleValues={[0, 1, 1, 50]}
            opacityValues={[0, 1, 1, 0]}
          >
            Welcome to Kidzstar
          </ZoomScroll>

        </div>

        {/* Step 3: Creative Surroundings — cat appears here */}
        <div ref={creativeRef}>
          <CreativeSurroundings />
        </div>

        {/* Step 4: Vision */}
        <div className="relative z-20 bg-white">
          <Vision />
        </div>

        {/* Step 4b: Best Facilities */}
        <div className="relative z-20">
          <BestFacilities />
        </div>

        {/* Step 5: Team (Dream Teacher) */}
        <div className="relative z-20 bg-white pb-20">
          <Team />
        </div>

        {/* Step 6: Curriculum */}
        <div ref={curriculumRef} className="relative z-20 bg-white">
          <Curriculum />
        </div>

        {/* Step 7: Photo Gallery */}
        <div className="relative z-20 bg-white">
          <PhotoGallery />
        </div>

        {/* Footer */}
        <div className="relative z-20">
          <Footer />
        </div>




      </div>

      <style jsx global>{`
        @keyframes scrollCatFloat {
          0%, 100% { transform: scale(0.32) translateY(0px); }
          50%       { transform: scale(0.32) translateY(-18px); }
        }
        @keyframes scrollCatBlink {
          0%, 10%, 13%, 100% { height: 0 }
          11.5% { height: 100% }
        }

        .scroll-cat {
          --fur: #111;
          --fur-dark: #000;
          --skin: pink;
          --suit: #fff;
          --suit-dark: #ddd;
          font-size: 0.4vmin;
          width: 80em;
          aspect-ratio: 1;
          position: absolute;
          bottom: 15%;
          left: 50%;
          translate: -50%;
        }
        .scroll-cat *, .scroll-cat *::before, .scroll-cat *::after {
          position: absolute;
          box-sizing: border-box;
        }
        .scroll-cat-tail {
          width: 50%; height: 50%;
          border-radius: 50%;
          border: 7em solid #0000;
          border-top-color: var(--suit-dark);
          border-left-color: var(--suit-dark);
          clip-path: polygon(100% 0, 100% 100%, 0 30%, 0 0);
          top: 75%; left: 52%;
        }
        .scroll-cat-body {
          left: 50%; translate: -50%;
          bottom: 0; width: 35%; height: 40%;
          background:
            radial-gradient(circle at 17% 55%, #36c 2em, #0000 0),
            radial-gradient(100% 70% at 50% 0, var(--fur-dark) 50%, #0000 0),
            radial-gradient(150% 70% at 49% 0, var(--fur) 50%, #d99 0 59%, #0000 calc(59% + 1px)),
            var(--suit);
          border-radius: 100% / 200% 200% 20% 20%;
        }
        .scroll-cat-ear {
          width: 40%; aspect-ratio: 1;
          border: 4em solid var(--fur);
          border-radius: 5% 90% 10% 80%;
          background: var(--skin);
          top: 5%; left: 10%;
        }
        .scroll-cat-ear-r { scale: -1 1; left: auto; right: 10%; }
        .scroll-cat-head {
          width: 80%; aspect-ratio: 1.1;
          background: linear-gradient(#0003, #0000 50%), var(--fur);
          left: 50%; translate: -50%;
          border-radius: 100% / 125% 125% 80% 75%;
        }
        .scroll-cat-nose {
          width: 10%; height: 7%;
          background: var(--skin);
          border-radius: 50%;
          left: 50%; translate: -50% -50%;
          top: 55%;
        }
        .scroll-cat-eye {
          width: 35%; aspect-ratio: 1;
          border-radius: 50%;
          background:
            radial-gradient(50% 50% at 50% 32%, #fff 25%, #0000 calc(25% + 1px)),
            radial-gradient(50% 50% at 42% 51%, #fff 12%, #0000 calc(12% + 1px)),
            radial-gradient(circle at 60% 40%, #000 35%, #0000 calc(35% + 1px)),
            white;
          left: 25%; translate: -50% -50%;
          top: 43%; overflow: hidden;
        }
        .scroll-cat-eye-r { left: calc(100% - 25%); scale: -1 1; }
        .scroll-cat-eye::before {
          top: -30%; left: 50%; translate: -50%;
          width: 150%; height: 0%;
          content: ""; background: var(--fur);
          rotate: -10deg;
          animation: scrollCatBlink 1s linear infinite;
        }
        .scroll-cat-eye::after {
          bottom: -10%; left: 50%; translate: -50%;
          width: 150%; height: 0%;
          content: ""; background: var(--fur);
          rotate: -10deg;
          animation: scrollCatBlink 1s linear infinite;
        }
      `}</style>
    </>
  );
}
