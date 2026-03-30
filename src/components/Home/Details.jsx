'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
    const containerRef = useRef(null);
    const binoRef = useRef(null);
    const mobileContainerRef = useRef(null);  // for IntersectionObserver

    // Separate refs for scroll trigger targets and desktop / mobile card elements
    const childrenRef = useRef([]);       // desktop scroll trigger anchors
    const desktopCardsRef = useRef([]);   // desktop flip targets
    const mobileCardsRef = useRef([]);    // mobile tap flip targets

    const isAnimatingDesktop = useRef([]);
    const isAnimatingMobile = useRef([]);

    const cards = [
        { src: "/child1.png", backSrc: "/child1_backk.png", mt: "mt-[-90px]" },
        { src: "/child2.png", backSrc: "/child2_back.png", mt: "mt-[150px]" },
        { src: "/child3.png", backSrc: "/child3_back.png", mt: "mt-[-90px]" },
        { src: "/child4.png", backSrc: "/child4_back.png", mt: "mt-[150px]" },
    ];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const rocketProgress = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
    const rocketPathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

    // Desktop GSAP scroll-entry + auto-flip
    useEffect(() => {
        childrenRef.current.forEach((child, index) => {
            if (!child) return;
            gsap.fromTo(
                child,
                { scale: 0.5, opacity: 0, y: 100 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: child,
                        start: "top 90%",
                        end: "top 50%",
                        scrub: 1,
                        once: true,
                        onEnter: () => {
                            const card = desktopCardsRef.current[index];
                            if (!card) return;
                            isAnimatingDesktop.current[index] = true;
                            gsap.to(card, { rotateY: 180, duration: 0.6, ease: "power2.out", delay: 0.3 });
                            gsap.to(card, {
                                rotateY: 0, duration: 0.6, ease: "power2.out", delay: 1.6,
                                onComplete: () => { isAnimatingDesktop.current[index] = false; }
                            });
                        }
                    }
                }
            );
        });
    }, []);

    // Mobile: flip each card once (staggered) when the section enters the viewport
    useEffect(() => {
        const container = mobileContainerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    observer.disconnect(); // fire only once

                    cards.forEach((_, index) => {
                        setTimeout(() => {
                            const card = mobileCardsRef.current[index];
                            if (!card || isAnimatingMobile.current[index]) return;
                            isAnimatingMobile.current[index] = true;

                            gsap.to(card, {
                                rotateY: 180, duration: 0.5, ease: "power2.out",
                                onComplete: () => {
                                    gsap.to(card, {
                                        rotateY: 0, duration: 0.5, ease: "power2.out", delay: 0.6,
                                        onComplete: () => { isAnimatingMobile.current[index] = false; }
                                    });
                                }
                            });
                        }, index * 300); // 300ms stagger between cards
                    });
                });
            },
            { threshold: 0.3 } // trigger when 30% of section is visible
        );

        observer.observe(container);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* ══════════════════════════════════════════
                MOBILE: 2×2 grid, tap-to-flip, no fixed heights
            ══════════════════════════════════════════ */}
            <div ref={mobileContainerRef} className="md:hidden w-full bg-[#ACD8FA] py-10 px-6">
                <div className="grid grid-cols-2 gap-5 w-full max-w-sm mx-auto">
                    {cards.map((child, index) => (
                        <div
                            key={`mob-${index}`}
                            className="perspective-1000 w-full aspect-square"
                        >
                            <div
                                ref={el => mobileCardsRef.current[index] = el}
                                className="relative w-full h-full preserve-3d cursor-pointer"
                                onClick={() => {
                                    const card = mobileCardsRef.current[index];
                                    if (!card || isAnimatingMobile.current[index]) return;
                                    isAnimatingMobile.current[index] = true;
                                    gsap.to(card, {
                                        rotateY: 180, duration: 0.6, ease: "power2.out",
                                        onComplete: () => {
                                            gsap.to(card, {
                                                rotateY: 0, duration: 0.6, ease: "power2.out", delay: 1,
                                                onComplete: () => { isAnimatingMobile.current[index] = false; }
                                            });
                                        }
                                    });
                                }}
                            >
                                {/* Front */}
                                <div className="absolute inset-0 backface-hidden">
                                    <Image src={child.src} alt="front" fill className="object-contain" />
                                </div>
                                {/* Back */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180">
                                    <Image src={child.backSrc} alt="back" fill className="object-contain" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div
                ref={containerRef}
                className="hidden md:flex relative w-full h-[950px] bg-[#ACD8FA] items-center justify-center overflow-hidden"
            >
                {/* ── Scroll Path & Rocket ── */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-[5]">
                    <svg width="100%" height="950" className="absolute top-0 left-0 overflow-visible">
                        {/* Outer Red Glow */}
                        <motion.path 
                            style={{ pathLength: rocketPathLength }}
                            d="M -50 0 C 200 400, 400 850, 800 850 S 1300 850, 1800 750" 
                            fill="none" 
                            stroke="#FF0000" 
                            strokeWidth="24"
                            opacity="0.25"
                        />
                        {/* Mid Orange Glow */}
                        <motion.path 
                            style={{ pathLength: rocketPathLength }}
                            d="M -50 0 C 200 400, 400 850, 800 850 S 1300 850, 1800 750" 
                            fill="none" 
                            stroke="#FFA500" 
                            strokeWidth="12"
                            opacity="0.6"
                        />
                         {/* Inner Yellow Core */}
                        <motion.path 
                            style={{ pathLength: rocketPathLength }}
                            d="M -50 0 C 200 400, 400 850, 800 850 S 1300 850, 1800 750" 
                            fill="none" 
                            stroke="#87FE41" 
                            strokeWidth="3.5" 
                        />
                    </svg>
                    <motion.div
                        className="absolute top-0 left-0 z-[6] drop-shadow-3xl"
                        style={{
                            offsetPath: 'path("M -50 0 C 200 400, 400 850, 800 850 S 1300 850, 1800 750")',
                            offsetDistance: rocketProgress,
                            offsetRotate: "auto",
                            willChange: "transform"
                        }}
                    >
                        <div style={{ position: "absolute", left: "-100px", top: "-100px", width: "200px", height: "200px", transform: "rotate(90deg)" }}>
                            <img src="/rocket_edit.gif" alt="Rocket" width="200" height="200" className="object-contain drop-shadow-xl" style={{ transform: "translate(0px, -20px)" }} />
                        </div>
                    </motion.div>
                </div>

                {/* Center Bino character */}
                <Image
                    ref={binoRef}
                    src="/bino.png"
                    alt="kid"
                    width={209}
                    height={333}
                    className="object-contain mt-[630px] ml-[100px] relative z-10"
                />

                {/* 4-column card grid */}
                <div className="grid grid-cols-4 w-full items-end px-10 relative z-10">
                    {cards.map((child, index) => (
                        <div
                            key={`desk-${index}`}
                            ref={el => childrenRef.current[index] = el}
                            className={`perspective-1000 w-[272px] h-[242px] self-start ${child.mt}`}
                            onMouseEnter={() => {
                                if (isAnimatingDesktop.current[index]) return;
                                gsap.to(desktopCardsRef.current[index], {
                                    rotateY: 180, duration: 0.6, ease: "power2.out"
                                });
                            }}
                            onMouseLeave={() => {
                                if (isAnimatingDesktop.current[index]) return;
                                gsap.to(desktopCardsRef.current[index], {
                                    rotateY: 0, duration: 0.6, ease: "power2.out"
                                });
                            }}
                        >
                            <div
                                ref={el => desktopCardsRef.current[index] = el}
                                className="relative w-full h-full preserve-3d cursor-pointer"
                            >
                                {/* Front */}
                                <div className="absolute inset-0 backface-hidden">
                                    <Image src={child.src} alt="front" width={272} height={242} className="object-contain" />
                                </div>
                                {/* Back */}
                                <div className="absolute inset-0 backface-hidden rotate-y-180">
                                    <Image src={child.backSrc} alt="back" width={272} height={242} className="object-contain" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3D flip styles */}
            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d {
                    transform-style: preserve-3d;
                    will-change: transform;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </>
    );
};

export default Details;
