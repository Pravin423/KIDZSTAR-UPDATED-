import React from 'react'
import { Poppins } from "next/font/google";
import { ChevronsRight } from "lucide-react";
import Image from 'next/image';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "400", "600", "700"],
});

const HomeBanner = () => {
    return (
        <div className="px-6 gap-[40px] md:pl-[100px] flex flex-col md:flex-row items-center justify-between">
            <div className='flex  flex-col items-center md:items-start text-center md:text-left flex-1'>

                {/* Main Heading */}
                <h1 className={`${poppins.className} text-5xl md:text-[96px] leading-none font-bold text-white`}>
                    Admission
                </h1>

                {/* Sub-heading Row: OPEN FOR 2026-2027 */}
                <div className='flex flex-col md:flex-row items-center md:ml-[20px] gap-2 md:gap-7 mt-2'>
                    <h2 className={`${poppins.className} text-xl md:text-[32px] text-[#FFF005] font-bold tracking-tight`}>
                        OPEN FOR
                    </h2>
                    <h2 className={`${poppins.className} text-3xl md:text-[48px] md:mt-[-10px] font-bold text-[#FFF005]`}>
                        2026-2027
                    </h2>
                </div>

                {/* Categories */}
                <p className={`${poppins.className} md:ml-[40px] mt-4 md:mt-[-4px] text-sm md:text-[20px] text-white font-extralight mb-8`}>
                    Playground <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> Nursery <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> JR.KG <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> SR.KG
                </p>

                {/* Enrollment Button */}
                <div className="relative w-[180px] h-[56px] md:w-[223px] md:h-[70px] md:ml-[100px] md:mt-[-10px] cursor-pointer group">
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
                </div>
            </div>

            {/* Right Side Image */}
            <div className="flex-1 flex justify-center">
                <div className="relative w-[1000px] h-[1000px] md">
                    <Image
                        src="/homerightgirl.png" // Replace with your actual image path
                        alt="Kids Illustration"
                        fill
                        className="object-fill7"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}

export default HomeBanner