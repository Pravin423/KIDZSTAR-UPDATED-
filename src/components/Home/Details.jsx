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

    useEffect(() => {
        // Animate each child image one by one as the user scrolls
        childrenRef.current.forEach((child, index) => {
            gsap.fromTo(child,
                { scale: 0.5, opacity: 0, y: 100 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    y: 0, 
                    ease: "power2.out", 
                    scrollTrigger: { 
                        trigger: child, 
                        start: "top 85%", 
                        end: "top 50%",
                        scrub: 1,
                        // markers: true // Uncomment to debug trigger points
                    } 
                }
            );
        });
    }, []);

    return (
        <div ref={containerRef} className="w-full h-[950px] bg-[#ACD8FA] flex items-center justify-center overflow-hidden">
            <Image
                ref={binoRef}
                src="/bino.png"
                alt="kid"
                width={209}
                height={333}
                className="object-contain mt-[400px] "
            />

            <div className="grid grid-cols-1 md:grid-cols-4 w-full items-end px-10">
                {[
                    { src: "/child1.png", backSrc: "/child1_back1.png", mt: "mt-[-90px]" },
                    { src: "/child2.png", backSrc: "/child2_back.png", mt: "mt-[150px]" },
                    { src: "/child3.png", backSrc: "/child3_back.png", mt: "mt-[-90px]" },
                    { src: "/child4.png", backSrc: "/child4_back.png", mt: "mt-[150px]" }
                ].map((child, index) => (
                    <div 
                        key={index}
                        ref={el => childrenRef.current[index] = el}
                        className={`group perspective-1000 w-[272px] h-[242px] self-start ${child.mt}`}
                    >
                        <div className="relative w-full h-full transition-transform duration-500 preserve-3d group-hover:rotate-y-180">
                            {/* Front Side */}
                            <div className="absolute inset-0 backface-hidden">
                                <Image
                                    src={child.src}
                                    alt="kid front"
                                    width={272}
                                    height={242}
                                    className="object-contain"
                                />
                            </div>
                            {/* Back Side */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180">
                                <Image
                                    src={child.backSrc}
                                    alt="kid back"
                                    width={272}
                                    height={242}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
                .group-hover\:rotate-y-180:hover {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
};

export default Details
