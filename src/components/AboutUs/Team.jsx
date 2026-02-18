"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
    {
        id: 1,
        name: "Wilson Arcand",
        role: "Specialist in Mathematics",
        image: "https://placehold.co/400x400/FFA500/FFFFFF",
        bg: "#FFA500",
    },
    {
        id: 2,
        name: "Rayna Rhiel Madsen",
        role: "Music Teacher",
        image: "https://placehold.co/400x400/FF69B4/FFFFFF",
        bg: "#FF69B4",
    },
    {
        id: 3,
        name: "Kaiya Dorwart",
        role: "Specialist in Mathematics",
        image: "https://placehold.co/400x400/87CEEB/FFFFFF",
        bg: "#87CEEB",
    },
    {
        id: 4,
        name: "Davina Grissom",
        role: "Arts & Crafts",
        image: "https://placehold.co/400x400/9370DB/FFFFFF",
        bg: "#9370DB",
    },
    {
        id: 5,
        name: "Marcus Bell",
        role: "Physical Education",
        image: "https://placehold.co/400x400/50C878/FFFFFF",
        bg: "#50C878",
    },
];

const total = teamMembers.length;

export default function Team() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const goNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % total);
    };

    const goPrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + total) % total);
    };

    // Show 3 cards: prev, active, next
    const indices = [
        (activeIndex - 1 + total) % total,
        activeIndex,
        (activeIndex + 1) % total,
    ];

    return (
        <section className="w-full py-24 bg-white">
            {/* Heading */}
            <div className="text-center mb-16">
                <p className="text-sm font-semibold tracking-[0.3em] uppercase text-[#FF6B8B] mb-2">
                    Meet The People
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                    Our Team
                </h2>
                <div className="mx-auto mt-4 w-16 h-1 rounded-full bg-[#FF6B8B]" />
            </div>

            {/* Carousel */}
            <div className="relative max-w-5xl mx-auto px-8 flex items-center justify-center gap-6">

                {/* Prev Button */}
                <button
                    onClick={goPrev}
                    className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-[#FF6B8B] text-[#FF6B8B] flex items-center justify-center hover:bg-[#FF6B8B] hover:text-white transition-all duration-300 shadow-md"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Cards */}
                <div className="flex items-center justify-center gap-6 flex-1 overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        {indices.map((memberIdx, position) => {
                            const member = teamMembers[memberIdx];
                            const isCenter = position === 1;
                            return (
                                <motion.div
                                    key={member.id}
                                    custom={direction}
                                    initial={(dir) => ({
                                        opacity: 0,
                                        x: dir > 0 ? 120 : -120,
                                        scale: 0.85,
                                    })}
                                    animate={{
                                        opacity: isCenter ? 1 : 0.5,
                                        x: 0,
                                        scale: isCenter ? 1 : 0.85,
                                    }}
                                    exit={(dir) => ({
                                        opacity: 0,
                                        x: dir > 0 ? -120 : 120,
                                        scale: 0.85,
                                    })}
                                    transition={{
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 28,
                                    }}
                                    className="flex flex-col items-center text-center flex-shrink-0"
                                    style={{ width: isCenter ? 220 : 180 }}
                                >
                                    {/* Image blob */}
                                    <div
                                        className="relative mb-5 overflow-hidden shadow-2xl transition-all duration-500"
                                        style={{
                                            width: isCenter ? 200 : 160,
                                            height: isCenter ? 200 : 160,
                                            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                                            background: member.bg,
                                            boxShadow: isCenter
                                                ? `0 20px 60px ${member.bg}66`
                                                : "none",
                                        }}
                                    >
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Name & Role */}
                                    <h3
                                        className="font-bold transition-all duration-300"
                                        style={{
                                            fontSize: isCenter ? "1.1rem" : "0.95rem",
                                            color: isCenter ? "#FF1493" : "#9CA3AF",
                                        }}
                                    >
                                        {member.name}
                                    </h3>
                                    <p
                                        className="mt-1 transition-all duration-300"
                                        style={{
                                            fontSize: isCenter ? "0.875rem" : "0.8rem",
                                            color: isCenter ? "#6B7280" : "#D1D5DB",
                                        }}
                                    >
                                        {member.role}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Next Button */}
                <button
                    onClick={goNext}
                    className="flex-shrink-0 w-11 h-11 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center hover:border-[#FF6B8B] hover:text-[#FF6B8B] transition-all duration-300 shadow-md"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2 mt-12">
                {teamMembers.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > activeIndex ? 1 : -1);
                            setActiveIndex(i);
                        }}
                        className="transition-all duration-300 rounded-full"
                        style={{
                            width: i === activeIndex ? 28 : 10,
                            height: 10,
                            background: i === activeIndex ? "#FF6B8B" : "#E5E7EB",
                        }}
                    />
                ))}
            </div>
        </section>
    );
}
