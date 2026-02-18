"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
    { id: 1, name: "Wilson Arcand", role: "Specialist in Mathematics", image: "/teacher1.jpg ", bg: "#FFA500" },
    { id: 2, name: "Rayna Rhiel Madsen", role: "Music Teacher", image: "/teacher2.jpg", bg: "#FF69B4" },
    { id: 3, name: "Kaiya Dorwart", role: "Specialist in Mathematics", image: "/teacher3.jpg", bg: "#87CEEB" },
    { id: 4, name: "Davina Grissom", role: "Arts & Crafts", image: "/teacher4.jpg", bg: "#9370DB" },
    { id: 5, name: "Marcus Bell", role: "Physical Education", image: "/teacher5.jpg", bg: "#50C878" },
];

export default function Team() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextStep = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const prevStep = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    // Variants for smooth sliding and scaling
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 150 : -150,
            opacity: 0,
            scale: 0.5,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 150 : -150,
            opacity: 0,
            scale: 0.5,
        }),
    };

    return (
        <section className="w-full py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >

                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="w-12 h-[2px] bg-black"></span>
                        <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-black">
                            THE DREAM TEACHERS
                        </h2>
                    </div>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative flex items-center justify-center min-h-[500px]">

                    {/* Navigation Controls */}
                    <div className="absolute inset-0 flex items-center justify-between z-20 pointer-events-none px-4 md:px-0">
                        <button
                            onClick={prevStep}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center border border-slate-200 text-slate-700 transition-all active:scale-90" onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00218E'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextStep}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center border border-slate-200 text-slate-700 transition-all active:scale-90" onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00218E'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>

                    {/* Animated Card */}
                    <div className="relative w-full max-w-sm flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={index}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 200, damping: 25 },
                                    opacity: { duration: 0.2 },
                                }}
                                className="flex flex-col items-center"
                            >
                                {/* Image Blob with Dynamic Shadow */}
                                <div
                                    className="relative w-64 h-64 md:w-80 md:h-80 mb-8 transition-all duration-1000 ease-in-out"
                                    style={{
                                        background: teamMembers[index].bg,
                                        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                                        boxShadow: `0 30px 60px -12px ${teamMembers[index].bg}66`,
                                    }}
                                >
                                    <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                                        <Image
                                            src={teamMembers[index].image}
                                            alt={teamMembers[index].name}
                                            fill
                                            className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                        {teamMembers[index].name}
                                    </h3>
                                    <p className="font-semibold text-lg uppercase tracking-tight" style={{ color: "#00218E" }}>
                                        {teamMembers[index].role}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {teamMembers.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > index ? 1 : -1);
                                setIndex(i);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-500 ${i === index ? "w-10" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                            style={i === index ? { backgroundColor: "#00218E" } : {}}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}