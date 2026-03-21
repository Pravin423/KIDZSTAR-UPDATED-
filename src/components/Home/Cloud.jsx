'use client';
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Cloud = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    // Desktop: clouds slide in from sides on scroll using percentages for better responsiveness
    const leftCloudX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
    const rightCloudX = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

    return (
        <div ref={ref}>
            {/* ── MOBILE: static clouds, fully merged, no animation ── */}
            <div className="md:hidden flex w-full relative h-[120px] overflow-hidden">
                <div className="absolute left-0 w-[65%] h-full">
                    <Image src="/cloud2.png" alt="Cloud" fill className="object-cover" />
                </div>
                <div className="absolute right-0 w-[65%] h-full">
                    <Image src="/cloud1st.png" alt="Cloud" fill className="object-cover" />
                </div>
            </div>

            {/* ── DESKTOP: original scroll-driven slide animation, unchanged ── */}
            <div className='hidden md:flex w-screen relative h-[350px] overflow-hidden'>
                <motion.div
                    style={{ x: leftCloudX }}
                    className="absolute left-0 w-[65%] h-full"
                >
                    <Image src="/cloud2.png" alt="Cloud" fill className="object-cover" />
                </motion.div>
                <motion.div
                    style={{ x: rightCloudX }}
                    className="absolute right-0 w-[65%] h-full"
                >
                    <Image src="/cloud1st.png" alt="Cloud" fill className="object-cover" />
                </motion.div>
            </div>
        </div>
    )
}

export default Cloud
