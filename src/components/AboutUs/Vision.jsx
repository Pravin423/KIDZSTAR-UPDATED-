import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700']
});

const Vision = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.5"]
    });

    return (
        <div ref={containerRef} className={`relative z-20 w-full min-h-screen flex items-center bg-white text-black py-20 px-6 md:px-20 ${poppins.className}`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Left Side: Text */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold font-alfa text-[#0D3697]">
                        OUR VISION
                    </h2>

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
                    <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <Image
                            src="/child1.png"
                            alt="Vision Child"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

const AnimatedParagraph = ({ content, progress, range }) => {
    // Replace newlines with spaces and split into words
    const words = content.replace(/\n/g, " ").split(" ").filter(word => word !== "");

    const rangeStart = range[0];
    const rangeEnd = range[1];
    const rangeSpan = rangeEnd - rangeStart;

    return (
        <p className="flex flex-wrap text-xl md:text-2xl font-bold text-gray-700 leading-snug mt-8">
            {words.map((word, i) => {
                const step = 1 / words.length;
                const start = i * step;
                const end = start + step;

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