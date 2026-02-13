'use client';
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const WelcomeBanner = () => {
    return (
        <motion.div 
            className="overflow-hidden flex flex-col"
            initial={{ x: -1000, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
                duration: 1
            }}
        >
            <div className="">
                <Image src="/childhold.png" alt="Child Holding" width={1600} height={450} />
            </div>

            <div
                className="w-full h-[764px] bg-white rounded-sm flex items-center justify-center mt-[-10px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/welcomebackground.png')" }}
            >
                <div className='flex w-full items-center justify-between px-10 md:px-20'>
                    <div className='flex-1 mt-[-200px] ml-[40px]'>
                        <Image src="/colorchild.png" alt="ColorHand" width={536} height={453} />
                    </div>
                    <div className='flex-1 text-left'>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#FF5722] mb-4">Welcome to Kidzstar</h2>
                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                            Where every child's journey begins with wonder and joy. We provide a nurturing environment for your little ones to grow, learn, and play.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default WelcomeBanner
