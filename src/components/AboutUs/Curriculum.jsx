"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const programs = [
    {
        id: 1,
        name: "Playgroup",
        ageRange: "2.5-3.5 Years",
        description: "By creating a safe, consistent and welcoming environment where every child feels valued and inspired to explore.",
        src: "/child1.png",
        backSrc: "/child1_backk.png",
        badgeColor: "#FFA500",
    },
    {
        id: 2,
        name: "Nursery",
        ageRange: "3.5 – 4.5 Years",
        description: "By creating a safe, consistent and welcoming environment where every child feels valued and inspired to explore.",
        src: "/child2.png",
        backSrc: "/child2_back.png",
        badgeColor: "#FF69B4",
    },
    {
        id: 3,
        name: "Junior KG",
        ageRange: "4.5 – 5.5 Years",
        description: "By creating a safe, consistent and welcoming environment where every child feels valued and inspired to explore.",
        src: "/child3.png",
        backSrc: "/child3_back.png",
        badgeColor: "#87CEEB",
    },
    {
        id: 4,
        name: "Senior KG",
        ageRange: "5.5 – 6.5 Years",
        description: "By creating a safe, consistent and welcoming environment where every child feels valued and inspired to explore.",
        src: "/child4.png",
        backSrc: "/child4_back.png",
        badgeColor: "#9370DB",
    },
];

export default function Curriculum() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const cardRef = useRef(null);
    const isFlipped = useRef(false);

    const nextStep = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % programs.length);
    };

    const prevStep = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + programs.length) % programs.length);
    };

    // Reset flip state when card changes
    useEffect(() => {
        isFlipped.current = false;
        if (cardRef.current) {
            gsap.set(cardRef.current, { rotateY: 0 });
        }
    }, [index]);

    const handleMouseEnter = () => {
        if (cardRef.current && !isFlipped.current) {
            isFlipped.current = true;
            gsap.to(cardRef.current, { rotateY: 180, duration: 0.6, ease: "power2.out" });
        }
    };

    const handleMouseLeave = () => {
        if (cardRef.current && isFlipped.current) {
            isFlipped.current = false;
            gsap.to(cardRef.current, { rotateY: 0, duration: 0.6, ease: "power2.out" });
        }
    };

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

    const current = programs[index];

    return (
        <section className={`w-full py-24 bg-white overflow-hidden relative ${poppins.className}`}>
            <div className="max-w-7xl mx-auto px-4 text-center">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="w-12 h-[2px] bg-black"></span>
                        <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-black">
                            OUR CURRICULUM
                        </h2>
                    </div>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative flex items-center justify-center min-h-[500px]">

                    {/* Navigation Controls */}
                    <div className="absolute inset-0 flex items-center justify-between z-20 pointer-events-none px-4 md:px-0">
                        <button
                            onClick={prevStep}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center border border-slate-200 text-slate-700 transition-all active:scale-90"
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00218E'; e.currentTarget.style.color = 'white'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextStep}
                            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center border border-slate-200 text-slate-700 transition-all active:scale-90"
                            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#00218E'; e.currentTarget.style.color = 'white'; }}
                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; }}
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
                                {/* Flip Card — exactly like home page Details style */}
                                <div
                                    className="perspective-1000 w-[272px] h-[272px] mb-8 cursor-pointer"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div
                                        ref={cardRef}
                                        className="relative w-full h-full preserve-3d"
                                    >
                                        {/* Front */}
                                        <div className="absolute inset-0 backface-hidden">
                                            <Image
                                                src={current.src}
                                                alt={current.name}
                                                width={272}
                                                height={272}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                        {/* Back */}
                                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                                            <Image
                                                src={current.backSrc}
                                                alt={`${current.name} back`}
                                                width={272}
                                                height={272}
                                                className="object-contain w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Age Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                    className="mb-3 px-4 py-1 rounded-full text-white text-xs font-bold tracking-widest uppercase"
                                    style={{ backgroundColor: current.badgeColor }}
                                >
                                    {current.ageRange}
                                </motion.div>

                                {/* Content */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center"
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                        {current.name}
                                    </h3>
                                    <p className="font-semibold text-lg uppercase tracking-tight" style={{ color: "#00218E" }}>
                                        {current.ageRange}
                                    </p>
                                    <p className="mt-3 text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
                                        {current.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {programs.map((_, i) => (
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

            {/* CSS Cat decoration — bottom right corner */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '30px',
                fontSize: '0.55vmin',
                width: '90em',
                aspectRatio: '1',
                pointerEvents: 'none',
                zIndex: 10,
                transform: 'scale(0.18)',
                transformOrigin: 'bottom right',
                animation: 'catFloat 4s ease-in-out infinite',
            }}>
                <div style={{
                    position: 'absolute',
                    width: '120%',
                    height: '40%',
                    left: '50%',
                    bottom: 0,
                    translate: '-50% 60%',
                    borderRadius: '50% / 100% 100% 0 0',
                    boxShadow: '0 0 3em #ffc, 0 0 9em #ffc8',
                    background: 'radial-gradient(at 38% 20%, #0001 2%, #0000 0), radial-gradient(13% 8% at 50% 0, #0001 99%, #0000), #ffc',
                }} />
                <div className="css-cat">
                    <div className="css-cat-tail" />
                    <div className="css-cat-body" />
                    <div className="css-cat-ear" />
                    <div className="css-cat-ear css-cat-ear-r" />
                    <div className="css-cat-head">
                        <div className="css-cat-eye" />
                        <div className="css-cat-eye css-cat-eye-r" />
                        <div className="css-cat-nose" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes catFloat {
                    0%, 100% { transform: scale(0.18) translateY(0px); }
                    50% { transform: scale(0.18) translateY(-18px); }
                }
                @keyframes blink {
                    0%, 25%, 28%, 100% { height: 0 }
                    26.5% { height: 100% }
                }

                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                    will-change: transform;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }

                /* ── CSS Cat ── */
                .css-cat {
                    --fur: #111;
                    --fur-dark: #000;
                    --skin: pink;
                    --suit: #fff;
                    --suit-dark: #ddd;
                    font-size: 0.4vmin;
                    width: 80em;
                    aspect-ratio: 1;
                    position: absolute;
                    bottom: 15%;
                    left: 50%;
                    translate: -50%;
                }
                .css-cat *, .css-cat *::before, .css-cat *::after {
                    position: absolute;
                    box-sizing: border-box;
                }
                .css-cat-tail {
                    width: 50%; height: 50%;
                    border-radius: 50%;
                    border: 7em solid #0000;
                    border-top-color: var(--suit-dark);
                    border-left-color: var(--suit-dark);
                    clip-path: polygon(100% 0, 100% 100%, 0 30%, 0 0);
                    top: 75%; left: 52%;
                }
                .css-cat-body {
                    left: 50%; translate: -50%;
                    bottom: 0; width: 35%; height: 40%;
                    background:
                        radial-gradient(circle at 17% 55%, #36c 2em, #0000 0),
                        radial-gradient(100% 70% at 50% 0, var(--fur-dark) 50%, #0000 0),
                        radial-gradient(150% 70% at 49% 0, var(--fur) 50%, #d99 0 59%, #0000 calc(59% + 1px)),
                        var(--suit);
                    border-radius: 100% / 200% 200% 20% 20%;
                }
                .css-cat-ear {
                    width: 40%; aspect-ratio: 1;
                    border: 4em solid var(--fur);
                    border-radius: 5% 90% 10% 80%;
                    background: var(--skin);
                    top: 5%; left: 10%;
                }
                .css-cat-ear-r { scale: -1 1; left: auto; right: 10%; }
                .css-cat-head {
                    width: 80%; aspect-ratio: 1.1;
                    background: linear-gradient(#0003, #0000 50%), var(--fur);
                    left: 50%; translate: -50%;
                    border-radius: 100% / 125% 125% 80% 75%;
                }
                .css-cat-nose {
                    width: 10%; height: 7%;
                    background: var(--skin);
                    border-radius: 50%;
                    left: 50%; translate: -50% -50%;
                    top: 55%;
                }
                .css-cat-eye {
                    width: 35%; aspect-ratio: 1;
                    border-radius: 50%;
                    background:
                        radial-gradient(50% 50% at 50% 32%, #fff 25%, #0000 calc(25% + 1px)),
                        radial-gradient(50% 50% at 42% 51%, #fff 12%, #0000 calc(12% + 1px)),
                        radial-gradient(circle at 60% 40%, #000 35%, #0000 calc(35% + 1px)),
                        white;
                    left: 25%; translate: -50% -50%;
                    top: 43%; overflow: hidden;
                }
                .css-cat-eye-r { left: calc(100% - 25%); scale: -1 1; }
                .css-cat-eye::before {
                    top: -30%; left: 50%; translate: -50%;
                    width: 150%; height: 0%;
                    content: ""; background: var(--fur);
                    rotate: -10deg;
                    animation: blink 10s linear infinite;
                }
                .css-cat-eye::after {
                    bottom: -10%; left: 50%; translate: -50%;
                    width: 150%; height: 0%;
                    content: ""; background: var(--fur);
                    rotate: -10deg;
                    animation: blink 10s linear infinite;
                }
            `}</style>
        </section>
    );
}
