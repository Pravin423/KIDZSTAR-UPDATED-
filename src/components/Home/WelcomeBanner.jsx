'use client';
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Poppins } from "next/font/google";
import { ADLaM_Display } from "next/font/google";
import { ChevronsRight } from "lucide-react";
import Link from 'next/link';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "400", "600", "700"],
});

const adlam = ADLaM_Display({
    subsets: ["latin"],
    weight: ["400"],
});

const WelcomeBanner = () => {
    return (
        <motion.div
            className="overflow-hidden flex flex-col"
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                mass: 1,
                duration: 1
            }}
        >
            {/* Top image strip */}
            <div className="w-full overflow-hidden">
                <Image src="/childhold.png" alt="Child Holding" width={1600} height={450} className="w-full h-auto" />
            </div>

            {/* ── MOBILE Layout ── */}
            <div
                className="md:hidden w-full bg-white py-10 px-6 flex flex-col items-center text-center bg-cover bg-center bg-no-repeat mt-[-10px]"
                style={{ backgroundImage: "url('/welcomebackground.png')" }}
            >
                {/* Floating child image — smaller on mobile, centered */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mt-2 mb-2"
                >
                    <Image
                        src="/colorchild.png"
                        alt="ColorHand"
                        width={220}
                        height={186}
                        className="object-contain mx-auto"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <p className={`${poppins.className} text-[#FF6D92] text-[18px] font-normal`}>
                        Welcome to Kidzstar
                    </p>

                    <Image
                        src="/Play & Learn.png"
                        alt="Play & Learn"
                        width={280}
                        height={70}
                        className="object-contain"
                    />

                    <h2 className={`${adlam.className} text-[38px] font-bold text-[#1f2f8f] mt-[-8px]`}>
                        New Things
                    </h2>

                    <p className={`${poppins.className} text-[#E65000] text-[14px] font-extralight mt-2 max-w-[340px] leading-relaxed`}>
                        At Kidzstar Pre Primary School, our mission is to provide a safe, stimulating, and inclusive environment where children are encouraged to explore, learn, and develop at their own pace.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-[200px] h-[56px] cursor-pointer group mt-4"
                    >
                        <Image
                            src="/greenbutton.png"
                            alt="Know More Button"
                            fill
                            className="object-contain"
                        />
                        <Link href="/about" className="absolute inset-0 z-10" />
                        <div className="absolute inset-0 flex items-center justify-center gap-2">
                            <span className={`${poppins.className} text-[16px] font-bold text-white`}>
                                Know More
                            </span>
                            <ChevronsRight
                                size={22}
                                className="text-white transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* ── DESKTOP Layout: 100% original, unchanged ── */}
            <div
                className="hidden md:flex w-full h-[764px] bg-white rounded-sm items-center justify-center mt-[-10px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/welcomebackground.png')" }}
            >
                <div className='flex flex-col md:flex-row w-full items-center justify-between px-10 md:px-20'>
                    <motion.div
                        initial={{ x: -200, opacity: 0, scale: 1, y: 0 }}
                        whileInView={{
                            x: 0,
                            opacity: 1,
                            scale: [1, 1.05, 1],
                            y: [0, -15, 0],
                        }}
                        viewport={{ once: true }}
                        transition={{
                            x: { duration: 0.8, delay: 0.2, ease: "easeOut" },
                            opacity: { duration: 0.8, delay: 0.2 },
                            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className='mt-[-100px] md:mt-[-200px]'>
                        <Image src="/colorchild.png" alt="ColorHand" width={536} height={453} className="object-contain" />
                    </motion.div>

                    <div className="flex items-center ml-[100px] mt-[-180px] justify-center gap-2 md:gap-4 flex-1 w-full">

                        {/* Left Text Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex flex-col gap-1"
                        >

                            {/* Small Top Text */}
                            <p className={`${poppins.className} ml-[50px] text-[#FF6D92] text-[24px] font-normal mb-1`}>
                                Welcome to Kidzstar
                            </p>

                            {/* Play & Learn Image */}
                            <div className="">
                                <Image
                                    src="/Play & Learn.png"
                                    alt="Play & Learn"
                                    width={400}
                                    height={100}
                                    className="object-contain"
                                />
                            </div>

                            {/* Bold Bottom Text */}
                            <h2 className={`${adlam.className} text-[58px] font-bold text-[#1f2f8f] text-left ml-[50px] mt-[-20px]`}>
                                New Things
                            </h2>

                            <p className={`${poppins.className} text-[#E65000] text-[20px] font-extralight mt-4 max-w-[570px]`}>
                                At Kidzstar Pre Primary School, our mission is to provide a safe, stimulating, and inclusive environment where children are encouraged to explore, learn, and develop at their own pace. Through a blend of hands-on activities, creative play, and personalized attention, we aim to build a strong foundation in early childhood education.
                            </p>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-[230px] h-[56px] md:w-[230px] md:h-[70px] ml-[100px] mt-6 cursor-pointer group"
                            >
                                <Image
                                    src="/greenbutton.png"
                                    alt="Admission Button"
                                    fill
                                    className="object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center gap-2">
                                    <span className={`${poppins.className} text-lg md:text-[24px] font-bold text-white`}>
                                        Know More
                                    </span>
                                    <ChevronsRight
                                        size={28}
                                        className="text-white transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Image Section */}
                        <div className="flex justify-end mr-[30px] self-start mt-[-10px] md:mt-[-50px]">
                            <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.5
                                }}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 5, 0, -5, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <Image
                                        src="/staurnlogo.png"
                                        alt="Saturn"
                                        width={180}
                                        height={120}
                                        priority
                                    />
                                </motion.div>
                            </motion.div>
                        </div>

                    </div>

                </div>
            </div>
        </motion.div>
    )
}

export default WelcomeBanner
