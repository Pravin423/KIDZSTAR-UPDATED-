'use client';
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Details = () => {
    const containerRef = useRef(null);
    const binoRef = useRef(null);
    const childrenRef = useRef([]);
    const cardsRef = useRef([]);
    const isAnimating = useRef([]);

    useEffect(() => {

        childrenRef.current.forEach((child, index) => {

            // Card entry animation
            gsap.fromTo(child,
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
                            const card = cardsRef.current[index];

                            if (card) {
                                isAnimating.current[index] = true;
                                // auto flip once
                                gsap.to(card, {
                                    rotateY: 180,
                                    duration: 0.6,
                                    ease: "power2.out",
                                    delay: 0.3
                                });

                                gsap.to(card, {
                                    rotateY: 0,
                                    duration: 0.6,
                                    ease: "power2.out",
                                    delay: 1.6,
                                    onComplete: () => {
                                        isAnimating.current[index] = false;
                                    }
                                });
                            }
                        }
                    }
                }
            );

        });

    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-[950px] bg-[#ACD8FA] flex items-center justify-center overflow-hidden"
        >

            {/* Center character */}
            <Image
                ref={binoRef}
                src="/bino.png"
                alt="kid"
                width={209}
                height={333}
                className="object-contain mt-[400px]"
            />

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 w-full items-end px-10">

                {[
                    { src: "/child1.png", backSrc: "/child1_backk.png", mt: "mt-[-90px]" },
                    { src: "/child2.png", backSrc: "/child2_back.png", mt: "mt-[150px]" },
                    { src: "/child3.png", backSrc: "/child3_back.png", mt: "mt-[-90px]" },
                    { src: "/child4.png", backSrc: "/child4_back.png", mt: "mt-[150px]" }
                ].map((child, index) => (

                    <div
                        key={index}
                        ref={el => childrenRef.current[index] = el}
                        className={`perspective-1000 w-[272px] h-[242px] self-start ${child.mt}`}
                    >

                        <div
                            ref={el => cardsRef.current[index] = el}
                            className="relative w-full h-full preserve-3d cursor-pointer"

                            onMouseEnter={() => {
                                gsap.to(cardsRef.current[index], {
                                    rotateY: 180,
                                    duration: 0.6,
                                    ease: "power2.out"
                                });
                            }}

                            onMouseLeave={() => {
                                gsap.to(cardsRef.current[index], {
                                    rotateY: 0,
                                    duration: 0.6,
                                    ease: "power2.out"
                                });
                            }}
                        >

                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden">
                                <Image
                                    src={child.src}
                                    alt="front"
                                    width={272}
                                    height={242}
                                    className="object-contain"
                                />
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180">
                                <Image
                                    src={child.backSrc}
                                    alt="back"
                                    width={272}
                                    height={242}
                                    className="object-contain"
                                />
                            </div>

                        </div>
                    </div>

                ))}

            </div>

            {/* Styles */}
            <style jsx global>{`

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

            `}</style>

        </div>
    );
};

export default Details;
