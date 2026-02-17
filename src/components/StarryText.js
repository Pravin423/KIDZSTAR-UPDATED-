"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function StarryText({ children, className = "" }) {
    const [stars, setStars] = useState([]);
    const containerRef = useRef(null);
    const lastStarTime = useRef(0);

    // Spawn random ambient stars
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const newStar = {
                id: `ambient-${now}`,
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                size: Math.random() * 20 + 10, // 10px to 30px
                rotation: Math.random() * 360,
            };
            setStars((prev) => [...prev, newStar]);
        }, 1000); // Every 2 seconds

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const now = Date.now();
        // Throttle star creation to avoid too many DOM elements
        if (now - lastStarTime.current < 50) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newStar = {
            id: `cursor-${now}`,
            x,
            y,
            size: Math.random() * 20 + 10,
            rotation: Math.random() * 360,
        };

        setStars((prev) => [...prev, newStar]);
        lastStarTime.current = now;
    };

    const removeStar = (id) => {
        setStars((prev) => prev.filter((star) => star.id !== id));
    };

    return (
        <div
            ref={containerRef}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-none pointer-events-auto ${className}`} // changed to cover full area
            onMouseMove={handleMouseMove}
            style={{ cursor: "default" }} // Keep default cursor, or 'none' if user wants only stars
        >
            {/* The Text Content */}
            <div className="relative z-10 pointer-events-none">{children}</div>

            {/* The Stars Trail */}
            <AnimatePresence>
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 1, scale: 0, rotate: star.rotation }}
                        animate={{ opacity: 0, scale: 1.5, rotate: star.rotation + 45 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        onAnimationComplete={() => removeStar(star.id)}
                        className="absolute text-black pointer-events-none z-0"
                        style={{
                            top: star.y,
                            left: star.x,
                            width: star.size,
                            height: star.size,
                            transform: "translate(-50%, -50%)", // Center on cursor
                        }}
                    >
                        <Star fill="currentColor" strokeWidth={0} className="w-full h-full" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
