import { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZoomScroll from "@/components/ZoomScroll";
import ProgramOverview from "@/components/Programs/ProgramOverview";
import Activities from "@/components/Programs/Activities";
import FAQ from "@/components/Programs/FAQ";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function Programs() {
  const { scrollYProgress } = useScroll();
  const [isNavbarActive, setIsNavbarActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsNavbarActive(latest > 0.3);
  });

  return (
    <>
      <Head>
        <title>Programs - Kidzstar</title>
      </Head>

      <div className="relative bg-[#0D3697]">
        <Navbar className="fixed top-0 left-0 right-0 w-full z-30" disableScrollEffect={!isNavbarActive} />

        {/* Scroll container — ZoomScroll animations for all screens */}
        <div className="relative h-[250vh] md:h-[400vh] overflow-x-hidden">

          {/* Fixed Background Video */}
          <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute w-auto min-w-full min-h-full max-w-none object-cover">
              <source src="/space.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Step 1: "Our Programs" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] md:[text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[2.2rem] md:text-[5rem] uppercase md:whitespace-nowrap"
            scrollPoints={[0, 0.1, 0.18]}
            scaleValues={[1, 1, 50]}
            xValues={["0%", "0%", "3%"]}
            opacityValues={[1, 1, 0]}
          >
            Our Programs
          </ZoomScroll>

          {/* Step 2: "Let's see the curriculum" zoom */}
          <ZoomScroll
            className="z-10 text-white [text-shadow:3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] md:[text-shadow:6px_6px_#808080,5px_5px_#808080,4px_4px_#808080,3px_3px_#808080,2px_2px_#808080,1px_1px_#808080] font-montserrat font-extrabold text-[1.4rem] md:text-[5rem] uppercase md:whitespace-nowrap text-center px-4 md:px-0"
            scrollPoints={[0.2, 0.28, 0.58, 0.68]}
            scaleValues={[0, 1, 1, 50]}
            opacityValues={[0, 1, 1, 0]}
          >
            Let's see the curriculum
          </ZoomScroll>

        </div>

        {/* Content Sections */}
        <div className="relative z-20 bg-white">
          <ProgramOverview />
          <Activities />
          <FAQ />
        </div>

        {/* Footer */}
        <div className="relative z-20">
          <Footer />
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 4s infinite;
        }
        .animation-delay-2000 {
          animation-delay: -1.3s;
        }
        .animation-delay-4000 {
          animation-delay: -2.6s;
        }
      `}</style>
    </>
  );
}
