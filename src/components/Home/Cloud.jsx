'use client';
import Image from 'next/image'
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Cloud = () => {
    const { scrollYProgress } = useScroll();

    // Desktop: clouds slide in from sides on scroll
    const leftCloudX = useTransform(scrollYProgress, [0, 1], [-400, 40]);
    const rightCloudX = useTransform(scrollYProgress, [0, 1], [400, -40]);

    return (
        <>
            {/* ── MOBILE: static clouds, fully merged, no animation ── */}
            <div className="md:hidden flex w-full relative h-[120px] overflow-hidden">
                <div className="absolute left-0 w-3/5 h-full">
                    <Image src="/cloud2.png" alt="Cloud" fill className="object-cover" />
                </div>
                <div className="absolute right-0 w-3/5 h-full">
                    <Image src="/cloud1st.png" alt="Cloud" fill className="object-cover" />
                </div>
            </div>

            {/* ── DESKTOP: original scroll-driven slide animation, unchanged ── */}
            <div className='hidden md:flex w-screen relative h-[350px] overflow-hidden'>
                <motion.div
                    style={{ x: leftCloudX }}
                    className="absolute left-0 w-3/5 h-full"
                >
                    <Image src="/cloud2.png" alt="Cloud" fill className="object-cover" />
                </motion.div>
                <motion.div
                    style={{ x: rightCloudX }}
                    className="absolute right-0 w-3/5 h-full"
                >
                    <Image src="/cloud1st.png" alt="Cloud" fill className="object-cover" />
                </motion.div>
            </div>
        </>
    )
}

export default Cloud
