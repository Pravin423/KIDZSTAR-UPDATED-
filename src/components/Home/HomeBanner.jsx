'use client';
import React from 'react';
import { Poppins } from "next/font/google";
import { ChevronsRight } from "lucide-react";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";



const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "400", "600", "700"],
});

const HomeBanner = () => {
    const { scrollY } = useScroll();
    const triangleScale = useTransform(scrollY, [0, 1000], [1, 0.1]);
    const kidScale = useTransform(scrollY, [0, 500], [1, 1.1]);

    return (
        <div className="overflow-hidden">
            <div className="px-6 gap-[40px] md:pl-[100px] flex flex-col md:flex-row items-center justify-between">
                <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='flex  flex-col items-center md:items-start text-center md:text-left flex-1'
                >

                    <h1 className={`${poppins.className} text-5xl md:text-[96px] leading-none font-bold text-white drop-shadow-4xl`}>
                        Admission
                    </h1>

                    <div className='flex flex-col md:flex-row items-center md:ml-[20px] gap-2 md:gap-7 mt-2'>
                        <h2 className={`${poppins.className} text-xl md:text-[32px] text-[#FFF005] font-bold tracking-tight`}>
                            OPEN FOR
                        </h2>
                        <h2 className={`${poppins.className} text-3xl md:text-[48px] md:mt-[-10px] font-bold text-[#FFF005]`}>
                            2026-2027
                        </h2>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className={`${poppins.className} md:ml-[40px] mt-4 md:mt-[-4px] text-sm md:text-[20px] text-white font-extralight mb-8`}
                    >
                        Playground <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> Nursery <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> JR.KG <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> SR.KG
                    </motion.p>

                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative w-[180px] h-[56px] md:w-[223px] md:h-[70px] md:ml-[100px] md:mt-[-10px] cursor-pointer group"
                    >
                        <Image
                            src="/button_cyan.png"
                            alt="Admission Button"
                            fill
                            className="object-contain"
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-2">
                            <span className={`${poppins.className} text-lg md:text-[24px] font-bold text-white`}>
                                Enroll Now
                            </span>
                            <ChevronsRight
                                size={28}
                                className="text-white transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                <div className="flex-1 flex justify-center relative w-full max-w-[2000px] h-[500px] md:h-[900px]">
                    <motion.div
                        style={{ scale: triangleScale }}
                        className="absolute inset-0 flex items-center justify-center scale-125 md:scale-150"
                    >
                        <Image
                            src="/bannertrianglw.png"
                            alt="Background Shape"
                            width={2500}
                            height={2500}
                            className="object-contain mt-[-100px] "
                        />
                    </motion.div>

                    <motion.div
                        className="relative w-[70%] h-[70%] mt-10"
                        style={{ scale: kidScale }}
                        animate={{
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 3,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    >
                        <Image
                            src="/bannerkid.png"
                            alt="Kids Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </div>
            </div>
            <div className='relative mt-[-130px] md:mt-[-300px]  w-fit drop-shadow-2xl'>
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity
                    }}
                >
                    <Image src="/eathlogo.png" alt="Earth Logo" width={200} height={200} />
                </motion.div>
            </div>

        </div>

    )
}

export default HomeBanner