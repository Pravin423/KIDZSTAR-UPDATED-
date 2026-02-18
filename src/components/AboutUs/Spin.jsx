"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SpinningFrame() {
    const [rotationingDirection, setRotationingDirection] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotationingDirection((prev) => !prev);
        }, 15000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="relative flex items-center justify-center w-[60vw] max-w-[450px] aspect-square overflow-visible sm:scale-100 scale-90">
            {/* --- Outer rotating SVG layer --- */}
            <motion.img
                src="/bottom.png"
                alt="outer layer"
                className="absolute w-auto h-auto -right-5 -top-[15%] opacity-70 scale-105"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* --- Middle rotating SVG layer --- */}
            <motion.img
                src="/middle2.png"
                alt="middle layer"
                className="absolute w-auto h-auto right-3 top-[1%]"
                animate={{ rotate: [0, 45, -30, 15, 0], scale: [1, 1.05, 1] }}
                transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />

            {/* --- Inner rotating SVG layer --- */}
            <motion.img
                src="/top.png"
                alt="inner layer"
                className="absolute w-auto h-auto top-[8%] left-[6%] z-0 opacity-80"
                animate={{ rotate: -360 }}
                transition={{
                    duration: 50,
                    ease: "linear",
                    repeat: Infinity,
                }}
            />

            {/* --- Static center portrait with gentle zoom animation --- */}
            {/* --- Static center portrait with gentle zoom animation --- */}
            <motion.div
                className="relative z-10 flex items-center justify-center w-[65%] h-auto"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <Image
                    src="/mainimg.png"
                    alt="portrait"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain"
                    priority
                />
            </motion.div>
        </div>
    );
}