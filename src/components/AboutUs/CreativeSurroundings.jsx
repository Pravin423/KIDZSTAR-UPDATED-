"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import StarryText from "@/components/StarryText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CreativeSurroundings() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const textX = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], ["-100%", "0%", "0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-white z-20">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div
                    style={{ opacity }}
                    className="relative w-full h-full flex items-center justify-center bg-white"
                >
                    {/* Rotating Earth Logo */}
                    <motion.div
                        className="absolute bottom-[10%] left-[10%] w-[150px] md:w-[200px] z-10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    >
                        <Image src="/eathlogo.png" alt="Earth Logo" width={200} height={200} className="object-contain" />
                    </motion.div>

                    {/* Floating Saturn Logo */}
                    <motion.div
                        className="absolute top-[15%] right-[15%] w-[120px] md:w-[180px] z-10"
                        animate={{ y: [0, -15, 0], rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image src="/staurnlogo.png" alt="Saturn Logo" width={180} height={120} className="object-contain" />
                    </motion.div>

                    {/* Sliding Text with Video Fill */}
                    <motion.div
                        style={{ x: textX }}
                        className="w-full h-full flex items-center justify-center relative z-20"
                    >
                        <StarryText className="w-full h-full">
                            <VideoText />
                        </StarryText>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

function VideoText() {
    return (
        /*
         * Technique: 
         * 1. A white background container
         * 2. The video plays on top with mix-blend-mode: multiply
         *    (multiply: white areas show video, black areas stay black)
         * 3. The text is rendered in black on white — so the video shows THROUGH the text
         *    and the white areas outside the text also show the video (but we clip the container)
         *
         * Better technique: isolation + mix-blend-mode on a dark background
         * We use: text is white on black bg, video on top with mix-blend-mode: screen
         * Screen: black areas let video through, white areas stay white
         */
        <div
            className="relative inline-block"
            style={{ isolation: "isolate" }}
        >
            {/* Black background so mix-blend-mode: screen works */}
            <div
                className="relative font-alfa uppercase leading-tight text-center select-none"
                style={{
                    fontSize: "clamp(2.5rem, 6vw, 72px)",
                    color: "white",
                    backgroundColor: "black",
                    padding: "0.2em 0.4em",
                    borderRadius: "0.2em",
                }}
            >
                {/* The text — white on black */}
                <span style={{ position: "relative", zIndex: 1 }}>
                    Creative Surroundings<br />to Borderless Future
                </span>

                {/* Video overlay with screen blend — shows through white text */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        mixBlendMode: "screen",
                        zIndex: 2,
                        borderRadius: "inherit",
                    }}
                >
                    <source src="/space.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
