import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomScroll from "@/components/ZoomScroll";
import Vision from "@/components/AboutUs/Vision";
import CreativeSurroundings from "@/components/AboutUs/CreativeSurroundings";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function About() {
  const { scrollYProgress } = useScroll();
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsNavbarActive(latest > 0.3);
  });

  return (
    <>
      <Head>
        <title>About Us - Kidzstar</title>
      </Head>

      <div className="relative bg-[#0D3697]">
        <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={!isNavbarActive} />

        {/* Scroll container: 300vh for the two fixed zoom animations */}
        <div className="relative h-[300vh]">

          {/* Fixed Background Video */}
          <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute w-auto min-w-full min-h-full max-w-none object-cover">
              <source src="/space.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Step 1: "About Us" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[5rem] uppercase whitespace-nowrap"
            scrollPoints={[0, 0.2, 0.4]}
            scaleValues={[1, 2, 100]}
            xValues={["0%", "0%", "3%"]}
            opacityValues={[1, 1, 0]}
          >
            About Us
          </ZoomScroll>

          {/* Step 2: "Welcome to Kidzstar" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[5rem] uppercase whitespace-nowrap"
            scrollPoints={[0.3, 0.6, 0.9]}
            scaleValues={[0, 1, 100]}
            opacityValues={[1, 1, 0]}
          >
            Welcome to Kidzstar
          </ZoomScroll>

        </div>

        {/* Step 3: Creative Surroundings — normal flow section after fixed animations */}
        <CreativeSurroundings />

        {/* Step 4: Vision */}
        <div className="relative z-20 bg-white">
          <Vision />
        </div>

        {/* Footer */}
        <div className="relative z-20">
          <Footer />
        </div>

      </div>
    </>
  );
}
