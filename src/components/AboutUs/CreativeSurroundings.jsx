"use client";
import { useRef } from "react";
import Image from "next/image";
import StarryText from "@/components/StarryText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CreativeSurroundings() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Text slides in from left, stays, then slides out to right
    const textX = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], ["-100%", "0%", "0%", "100%"]);
    // Whole section fades in and out
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-white z-20">
            {/* Sticky inner so it stays on screen while user scrolls through 200vh */}
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div
                    style={{ opacity }}
                    className="relative w-full h-full flex items-center justify-center bg-white mix-blend-screen font-alfa text-[clamp(2rem,5vw,60px)] leading-tight uppercase text-center text-black"
                >
                    {/* Rotating Earth Logo */}
                    <motion.div
                        className="absolute bottom-[10%] left-[10%] w-[150px] md:w-[200px]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    >
                        <Image
                            src="/eathlogo.png"
                            alt="Earth Logo"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Floating Saturn Logo */}
                    <motion.div
                        className="absolute top-[15%] right-[15%] w-[120px] md:w-[180px]"
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image
                            src="/staurnlogo.png"
                            alt="Saturn Logo"
                            width={180}
                            height={120}
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Sliding Text */}
                    <motion.div
                        style={{ x: textX }}
                        className="w-full h-full flex items-center justify-center relative"
                    >
                        <StarryText className="w-full h-full">
                            Creative Surroundings<br />to Borderless Future
                        </StarryText>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
