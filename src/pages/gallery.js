import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    <div className={`min-h-screen bg-[#0D3697] text-white overflow-hidden relative ${poppins.className}`} style={{ backgroundImage: "linear-gradient(160deg, #000E30 0%, #0D3697 50%, #000E30 100%)" }}>
      <Navbar />
      
      {/* Floating decorative blobs in the background */}
      <div className="absolute top-0 left-0 w-full h-[150vh] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-[#FF6D92]/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#60CFFF]/15 rounded-full blur-[120px]" />
      </div>

      {/* Header section */}
      <div className="pt-40 pb-12 px-6 text-center relative z-10">
         <motion.h1 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-[#FF6D92] via-[#E6AF2E] to-[#60CFFF] bg-clip-text text-transparent"
         >
           Our Gallery
         </motion.h1>
         
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="flex flex-col items-center justify-center gap-4"
         >
           <div className="w-16 h-1 bg-[#FF6D92] rounded-full shadow-[0_0_10px_rgba(255,109,146,0.6)]"></div>
           <p className="text-base text-white/80 max-w-xl mx-auto drop-shadow">
             A glimpse into the joy, creativity, and exploration that happens every day in our classrooms. Click on any image to view it closer.
           </p>
         </motion.div>
      </div>

      {/* Masonry Grid Section (Larger columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-32 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center py-32 text-xl font-medium text-white/60 animate-pulse">Loading amazing moments...</div>
        ) : images.length === 0 ? (
          <div className="flex justify-center items-center py-32 text-xl font-medium text-white/60">No images uploaded yet.</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((img, i) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: "easeOut" }}
                onClick={() => setSelectedImage({ url: img.imageUrl, caption: CAPTIONS[i % CAPTIONS.length] })}
                className="break-inside-avoid relative group rounded-[16px] overflow-hidden bg-white/5 cursor-pointer ring-1 ring-white/10 shadow-2xl"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.imageUrl} 
                  alt={CAPTIONS[i % CAPTIONS.length]}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#000E30]/90 via-[#000E30]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-sm md:text-base leading-tight drop-shadow-lg">
                      {CAPTIONS[i % CAPTIONS.length]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking exactly on the image
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

      <Footer />
    </div>
  );
}
