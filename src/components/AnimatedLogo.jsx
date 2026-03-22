"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AnimatedLogo() {
  const text = "KIDZSTAR";
  const letters = text.split("");

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css?family=Anton&display=swap');
        .font-anton { font-family: 'Anton', sans-serif; }
      `}} />

      <Link href="/" className="flex flex-col items-center justify-center font-anton no-underline select-none">
        <div className="flex overflow-hidden h-[34px] leading-[34px] text-[32px] text-white tracking-[0.05em] relative">
          {letters.map((char, i) => {
            // Since the flex column contains 10 items, its total height is 10 times one item.
            // Translating by -10% shifts the column up by exactly 1 item.
            // We want to scroll past a random number of items (4 to 8).
            const numItemsToScroll = Math.floor(Math.random() * 5 + 4);
            const targetY = mounted ? `-${numItemsToScroll * 10}%` : "0%";
            
            // Make the animation slower (4 to 6.5 seconds)
            const duration = mounted ? 4 + Math.random() * 2.5 : 0; 
            
            // Use a fixed total loop time (10 seconds) so that all letters
            // finish their animations and pause together, reading "KIDZSTAR"
            const delay = mounted ? 10 - duration : 0; 

            return (
              <div key={i} className="relative inline-block h-[34px]">
                {!mounted ? (
                  <span className="h-[34px] flex items-center justify-center px-[0.02em]">
                    {char}
                  </span>
                ) : (
                  <motion.div
                    className="flex flex-col"
                    animate={{ y: ["0%", targetY] }}
                    transition={{
                      duration: duration,
                      ease: [0.25, 0.1, 0.25, 1], // power1.inOut equivalent
                      repeat: Infinity,
                      repeatDelay: delay, // Rests on the target clone for a long time
                      repeatType: "loop", 
                    }}
                  >
                    {/* Render 10 clones of the letter to ensure enough scroll depth */}
                    {[...Array(10)].map((_, j) => (
                      <span key={j} className="h-[34px] flex items-center justify-center px-[0.02em]">
                        {char}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* The codepen text underline replication (H2 in the codepen) */}
        <div className="w-[105%] flex flex-col items-center">
          <div className="h-[2px] w-full bg-white/70 mt-1 mb-1 rounded-full" />
          <h2 className="text-[12px] tracking-[0.35em] font-sans font-medium text-white/90 pl-[0.35em] m-0">
            PRE SCHOOL
          </h2>
        </div>
      </Link>
    </>
  );
}
