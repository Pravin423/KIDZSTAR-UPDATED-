"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const teamMembers = [
    { id: 1, name: "Wilson Arcand", role: "Specialist in Mathematics", image: "/teacher1.jpg" },
    { id: 2, name: "Rayna Rhiel Madsen", role: "Music Teacher", image: "/teacher2.jpg" },
    { id: 3, name: "Kaiya Dorwart", role: "Specialist in Mathematics", image: "/teacher3.jpg" },
    { id: 4, name: "Davina Grissom", role: "Arts & Crafts", image: "/teacher4.jpg" },
    { id: 5, name: "Marcus Bell", role: "Physical Education", image: "/teacher5..jpg" },
];

const total = teamMembers.length;

const SLOT_STYLES = {
    left: { x: -320, rotate: -8, scale: 0.78, opacity: 0.6, zIndex: 1 },
    center: { x: 0, rotate: 0, scale: 1, opacity: 1, zIndex: 3 },
    right: { x: 320, rotate: 8, scale: 0.78, opacity: 0.6, zIndex: 1 },
    // off-screen entry/exit positions
    farLeft: { x: -560, rotate: -14, scale: 0.6, opacity: 0, zIndex: 0 },
    farRight: { x: 560, rotate: 14, scale: 0.6, opacity: 0, zIndex: 0 },
};

const SPRING = {
    type: "spring",
    stiffness: 180,
    damping: 30,
    mass: 1,
};

export default function Team() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const prevIdx = (activeIndex - 1 + total) % total;
    const nextIdx = (activeIndex + 1) % total;

    const goNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev + 1) % total);
    };

    const goPrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex((prev) => (prev - 1 + total) % total);
    };

    const goTo = (i) => {
        if (isAnimating || i === activeIndex) return;
        setIsAnimating(true);
        setActiveIndex(i);
    };

    return (
        <section className={`w-full py-24 bg-slate-50 overflow-hidden relative ${poppins.className}`}>

            {/* Lightweight high-performance CSS background (Replaced heavy SVG filters) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00218E] mix-blend-multiply blur-[100px]" />
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#F5C842] mix-blend-multiply blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#6366F1] mix-blend-multiply blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 relative" style={{ zIndex: 1 }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-20"
                >
                    <div className="flex items-center justify-start gap-4">
                        <span className="w-12 h-[2px] bg-black" />
                        <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-black">
                            THE DREAM TEACHERS
                        </h2>
                    </div>
                </motion.div>

                {/* Fan — 3 fixed slots, content swaps inside */}
                <div className="relative flex items-center justify-center h-[400px] md:h-[460px]">
                    <div className="relative w-[260px] md:w-[300px] h-full">

                        {/* LEFT card */}
                        <motion.div
                            key={`left-${prevIdx}`}
                            className="absolute inset-0 rounded-[40px] overflow-hidden cursor-pointer"
                            style={{ transformOrigin: "bottom center", willChange: "transform, opacity" }}
                            initial={SLOT_STYLES.farLeft}
                            animate={SLOT_STYLES.left}
                            exit={SLOT_STYLES.farLeft}
                            transition={SPRING}
                            onAnimationComplete={() => setIsAnimating(false)}
                            onClick={goPrev}
                        >
                            <div className="w-full h-full border-4 border-white shadow-lg" style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}>
                                <Image
                                    src={teamMembers[prevIdx].image}
                                    alt={teamMembers[prevIdx].name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* CENTER card */}
                        <motion.div
                            key={`center-${activeIndex}`}
                            className="absolute inset-0 rounded-[40px] overflow-hidden"
                            style={{ transformOrigin: "bottom center", willChange: "transform, opacity" }}
                            initial={SLOT_STYLES.farRight}
                            animate={SLOT_STYLES.center}
                            exit={SLOT_STYLES.farLeft}
                            transition={SPRING}
                        >
                            <div
                                className="w-full h-full border-4 border-white"
                                style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.28)", background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}
                            >
                                <Image
                                    src={teamMembers[activeIndex].image}
                                    alt={teamMembers[activeIndex].name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* RIGHT card */}
                        <motion.div
                            key={`right-${nextIdx}`}
                            className="absolute inset-0 rounded-[40px] overflow-hidden cursor-pointer"
                            style={{ transformOrigin: "bottom center", willChange: "transform, opacity" }}
                            initial={SLOT_STYLES.farRight}
                            animate={SLOT_STYLES.right}
                            exit={SLOT_STYLES.farRight}
                            transition={SPRING}
                            onClick={goNext}
                        >
                            <div className="w-full h-full border-4 border-white shadow-lg" style={{ background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)" }}>
                                <Image
                                    src={teamMembers[nextIdx].image}
                                    alt={teamMembers[nextIdx].name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* Active member info */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-center mt-10"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                            {teamMembers[activeIndex].name}
                        </h3>
                        <p className="mt-1 font-semibold text-base uppercase tracking-wide" style={{ color: "#00218E" }}>
                            {teamMembers[activeIndex].role}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
                    <button
                        onClick={goPrev}
                        className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 transition-colors duration-200 active:scale-90"
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00218E'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex gap-2">
                        {teamMembers.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2.5 rounded-full transition-all duration-500 ${i === activeIndex ? "w-10" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                                    }`}
                                style={i === activeIndex ? { backgroundColor: "#00218E" } : {}}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goNext}
                        className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 transition-colors duration-200 active:scale-90"
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00218E'; e.currentTarget.style.color = 'white'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

            </div>
        </section>
    );
}