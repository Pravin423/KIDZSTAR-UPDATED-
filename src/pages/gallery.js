import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomScroll from "@/components/ZoomScroll";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const CAPTIONS = [
  "Curious minds at work!",
  "Learning through play",
  "Every day is an adventure",
  "Growing together",
  "Imagination has no limits",
  "Happy hearts, happy minds",
  "Our little explorers",
  "Creativity in every corner",
  "Friendship starts here",
  "Joy in every moment",
  "Building tomorrow's leaders",
  "Magic happens here",
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const { scrollYProgress } = useScroll();
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsNavbarActive(latest > 0.3);
  });

  useEffect(() => {
    fetch("/api/gallery?page=1&limit=50")
      .then(res => res.json())
      .then(data => {
        setImages(data.images || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Gallery - Kidzstar</title>
      </Head>

      <div className={`relative bg-[#0D3697] text-white overflow-hidden ${poppins.className}`}>
        <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={!isNavbarActive} />

        {/* Scroll container — ZoomScroll animations for all screens */}
        <div className="relative h-[250vh] md:h-[400vh] overflow-x-hidden">
          {/* Fixed Background Video */}
          <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute w-auto min-w-full min-h-full max-w-none object-cover">
              <source src="/space.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Step 1: "OUR GALLERY" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] md:[text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[2.2rem] md:text-[6rem] uppercase md:whitespace-nowrap"
            scrollPoints={[0, 0.1, 0.18]}
            scaleValues={[1, 1, 50]}
            xValues={["0%", "0%", "3%"]}
            opacityValues={[1, 1, 0]}
          >
            Our Gallery
          </ZoomScroll>

          {/* Step 2: "Magical Moments" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] md:[text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[1.4rem] md:text-[5rem] uppercase md:whitespace-nowrap text-center px-4 md:px-0"
            scrollPoints={[0.2, 0.28, 0.58, 0.68]}
            scaleValues={[0, 1, 1, 50]}
            opacityValues={[0, 1, 1, 0]}
          >
            Magical Moments
          </ZoomScroll>
        </div>

        {/* Floating decorative blobs for the gallery area */}
        <div className="absolute top-[400vh] left-0 w-full h-[150vh] overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-[#FF6D92]/20 rounded-full blur-[100px]" />
          <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#60CFFF]/15 rounded-full blur-[120px]" />
        </div>

        {/* Content Section - Uses Solid Background to hide the video gracefully */}
        <div className="relative z-20 bg-gray-900 w-full pt-16 pb-20">

          <div className="flex flex-col items-center justify-center text-center px-4 mb-16 relative">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-block bg-[#FF6D92]/15 border border-[#FF6D92]/30 text-[#FF6D92] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            >
              Memories & Moments
            </motion.span>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#E6AF2E] via-[#ffcf5d] to-[#FF6D92]"
              style={{ filter: "drop-shadow(0 4px 20px rgba(230,175,46,0.25))" }}
            >
              Our Gallery
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-base md:text-lg text-[#A3B1D5] max-w-2xl text-center leading-relaxed font-medium"
            >
              A glimpse into the joy, creativity, and exploration that happens every
              day in our classrooms. Click on any image to view it closer.
            </motion.p>
          </div>        {/* Gallery Grid Section */}
          <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 pb-10">
            {loading ? (
              <div className="flex justify-center items-center py-20 text-xl font-medium text-white/60 animate-pulse">Loading amazing moments...</div>
            ) : images.length === 0 ? (
              <div className="flex justify-center items-center py-20 text-xl font-medium text-white/60">No images uploaded yet.</div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-3 space-y-3">
                {images.map((img, i) => {
                  const APP_COLORS = [
                    { hex: "#FF6D92", rgb: "255,109,146", icon: "⭐" },
                    { hex: "#E6AF2E", rgb: "230,175,46", icon: "🎨" },
                    { hex: "#60CFFF", rgb: "96,207,255", icon: "🚀" },
                    { hex: "#A78BFA", rgb: "167,139,250", icon: "🧩" },
                    { hex: "#4ADE80", rgb: "74,222,128", icon: "🌱" }
                  ];
                  const theme = APP_COLORS[i % APP_COLORS.length];

                  return (
                    <motion.div
                      key={img._id}
                      initial={{ opacity: 0, scale: 0.9, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "50px" }}
                      transition={{ duration: 0.6, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ 
                        y: -8, 
                        boxShadow: `0 25px 50px -12px rgba(${theme.rgb}, 0.5), 0 0 0 2px rgba(${theme.rgb}, 0.3)`
                      }}
                      onClick={() => setSelectedImage({ url: img.imageUrl, caption: img.caption || CAPTIONS[i % CAPTIONS.length] })}
                      className="break-inside-avoid relative group rounded-[24px] overflow-hidden bg-white/5 cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border-2 border-white/5 transition-all duration-300 z-10 hover:z-20"
                    >
                      {/* Image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.imageUrl}
                        alt={img.caption || CAPTIONS[i % CAPTIONS.length]}
                        className="w-full h-auto object-cover block transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#000E30]/95 via-[#000E30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-3">
                          {/* Colorful pill representation of KidsStar */}
                          <div 
                            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: theme.hex }}
                          >
                            <span className="text-sm drop-shadow-md">{theme.icon}</span>
                          </div>
                          <p className="text-white font-semibold text-sm md:text-base leading-tight drop-shadow-lg">
                            {img.caption || CAPTIONS[i % CAPTIONS.length]}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-20 bg-[#0D3697]">
          <Footer />
        </div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center cursor-default bg-transparent p-2 rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 md:-top-4 md:-right-12 right-0 text-white hover:text-[#FF6D92] transition-colors bg-white/10 rounded-full p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
                />
                <p className="text-white font-medium text-lg mt-4 drop-shadow-md text-center">
                  {selectedImage.caption}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
