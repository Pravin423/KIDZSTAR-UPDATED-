import { useRef } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomScroll from "@/components/ZoomScroll";
import StarryText from "@/components/StarryText";
import { Inter } from "next/font/google";
import { motion, useScroll, useTransform } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["500", "700"] });

export default function About() {
  const { scrollYProgress } = useScroll();

  // Custom transforms for the "Creative Surroundings" section
  // Container: Fade in/out, Mix Blend Mode, White Background
  const containerOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.85, 0.95], [0, 1, 1, 0]);

  // Text: Slide In and Out
  const textX = useTransform(scrollYProgress, [0.5, 0.6, 0.85, 0.95], ["-100%", "0%", "0%", "100%"]);

  return (
    <>
      <Head>
        <title>About Us - Kidzstar</title>
      </Head>

      <div className="relative bg-[#0D3697] overflow-x-hidden">
        <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={true} />

        {/* Main scroll container to create scrollable height */}
        <div className="relative h-[400vh]">

          {/* Fixed Background Video */}
          <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute w-auto min-w-full min-h-full max-w-none object-cover"
            >
              <source src="/space.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Animation 1: About Us - Faster zoom out */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:6px_6px_#808080,5px_5px_#808080,5.5px_5.5px_#808080,5.25px_5.25px_#808080,5.75px_5.75px_#808080,4px_4px_#808080,4.5px_4.5px_#808080,4.25px_4.25px_#808080,4.75px_4.75px_#808080,3px_3px_#808080,3.5px_3.5px_#808080,3.25px_3.25px_#808080,3.75px_3.75px_#808080,2px_2px_#808080,2.5px_2.5px_#808080,2.25px_2.25px_#808080,2.75px_2.75px_#808080,1px_1px_#808080,1.5px_1.5px_#808080,1.25px_1.25px_#808080,1.75px_1.75px_#808080,0.5px_0.5px_#808080,0.25px_0.25px_#808080,0.75px_0.75px_#808080] font-montserrat font-extrabold text-[5rem] uppercase whitespace-nowrap"
            scrollPoints={[0, 0.15, 0.3]}
            scaleValues={[1, 2, 100]}
            xValues={["0%", "0%", "3%"]}
            opacityValues={[1, 1, 0]}
          >
            About Us
          </ZoomScroll>

          {/* Animation 2: Welcome to Kidzstar - Overlaps and zooms fast */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:6px_6px_#808080,5px_5px_#808080,5.5px_5.5px_#808080,5.25px_5.25px_#808080,5.75px_5.75px_#808080,4px_4px_#808080,4.5px_4.5px_#808080,4.25px_4.25px_#808080,4.75px_4.75px_#808080,3px_3px_#808080,3.5px_3.5px_#808080,3.25px_3.25px_#808080,3.75px_3.75px_#808080,2px_2px_#808080,2.5px_2.5px_#808080,2.25px_2.25px_#808080,2.75px_2.75px_#808080,1px_1px_#808080,1.5px_1.5px_#808080,1.25px_1.25px_#808080,1.75px_1.75px_#808080,0.5px_0.5px_#808080,0.25px_0.25px_#808080,0.75px_0.75px_#808080] font-montserrat font-extrabold text-[5rem] uppercase whitespace-nowrap"
            scrollPoints={[0.15, 0.35, 0.5]}
            scaleValues={[0, 1, 100]}
            opacityValues={[1, 1, 0]}
          >
            Welcome to Kidzstar
          </ZoomScroll>

          {/* Animation 3: Creative Surroundings - Custom Slide In/Out */}
          <motion.div
            style={{ opacity: containerOpacity }}
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-20 mix-blend-screen bg-white text-black font-alfa text-[120px] leading-tight uppercase text-center`}
          >
            <motion.div style={{ x: textX }} className="w-full h-full flex items-center justify-center">
              <StarryText className="w-full h-full">
                Creative Surroundings<br />to Borderless Future
              </StarryText>
            </motion.div>
          </motion.div>

        </div>

        {/* Footer Section - Appearing after animations */}
        <div className="relative z-20 mt-[-50vh]">
          <Footer />
        </div>

      </div>

    </>
  );
}
