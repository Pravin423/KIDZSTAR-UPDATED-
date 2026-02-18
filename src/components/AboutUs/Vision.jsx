import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Poppins } from 'next/font/google';
import Spin from './Spin';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

const Vision = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <div ref={containerRef} className={`relative z-20 w-full h-[300vh] bg-white text-black ${poppins.className}`}>
            <div className="sticky top-0 h-screen flex items-center px-6 md:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 w-full">

                    {/* Left Side: Text */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <span className="w-12 h-[2px] bg-black"></span>
                            <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-black">
                                OUR VISION
                            </h2>
                        </div>

                        {/* Second paragraph animated */}
                        <AnimatedParagraph
                            content="At Kidzstar Pre-Primary School, we believe every child is born with limitless potential.
We create joyful learning experiences that spark curiosity and imagination.
Our nurturing environment builds confidence, independence, and strong values.
Through play, exploration, and guidance, children grow academically and emotionally.
We lay the foundation for lifelong learning and future success."
                            progress={scrollYProgress}
                            range={[0.1, 1]}
                        />
                    </div>

                    {/* Right Side: Image */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <Spin />
                    </div>

                </div>
            </div>
        </div>
    )
}

const AnimatedParagraph = ({ content, progress, range }) => {
    // Split by any whitespace (including newlines and carriage returns) to handle cross-platform line endings consistency
    const words = content.trim().split(/\s+/);

    const rangeStart = range[0];
    const rangeEnd = range[1];
    const rangeSpan = rangeEnd - rangeStart;

    return (
        <p className="flex flex-wrap text-xl md:text-2xl font-bold text-gray-700 leading-snug mt-8">
            {words.map((word, i) => {
                const step = 1 / words.length;
                const start = i * step;
                const end = start + (step * 5); // Overlap words for smoother continuous fill

                // Calculate the specific scroll trigger points for this word
                const wordStart = rangeStart + (start * rangeSpan);
                const wordEnd = rangeStart + (end * rangeSpan);

                return (
                    <Word
                        key={i}
                        word={word}
                        progress={progress}
                        range={[wordStart, wordEnd]}
                    />
                )
            })}
        </p>
    )
}

const Word = ({ word, progress, range }) => {
    // Fill color transitions from transparent to solid gray-700 (#374151)
    const color = useTransform(progress, range, ["rgba(55, 65, 81, 0)", "rgba(55, 65, 81, 1)"]);

    return (
        <motion.span
            style={{
                color: color,
                WebkitTextStroke: "1px #374151"
            }}
            className="mr-2 align-middle inline-block"
        >
            {word}
        </motion.span>
    )
}

export default Vision;