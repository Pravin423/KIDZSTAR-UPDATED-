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
        <div className="px-6 md:pl-[100px]">
            <div className='flex mt-10 md:mt-[70px] flex-col items-center md:items-start text-center md:text-left'>

                {/* Main Heading */}
                <h1 className={`${poppins.className} text-5xl md:text-[96px] leading-tight font-bold text-white`}>
                    Admission
                </h1>

                {/* Sub-heading Row: OPEN FOR 2026-2027 */}
                <div className='flex flex-col md:flex-row items-center md:ml-[20px] gap-2 md:gap-7'>
                    <h2 className={`${poppins.className} text-xl md:text-[32px] text-[#FFF005] font-bold tracking-tight`}>
                        OPEN FOR
                    </h2>
                    <h2 className={`${poppins.className} text-3xl ml-[10px] md:text-[48px] md:mt-[-10px] font-bold text-[#FFF005]`}>
                        2026-2027
                    </h2>
                </div>

                {/* Categories */}
                <p className={`${poppins.className} md:ml-[40px] mt-2 md:mt-[-4px] text-sm md:text-[20px] text-white font-extralight mb-8`}>
                    Playground <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> Nursery <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> JR.KG <span className="hidden md:inline">&nbsp;|&nbsp;</span><br className="md:hidden" /> SR.KG
                </p>

                {/* Enrollment Button */}
                <div className="relative w-[180px] h-[56px] md:w-[223px] md:h-[70px] md:ml-[100px] md:mt-[-24px] cursor-pointer group">
                    <Image
                        src="/button_cyan.png"
                        alt="Admission Button"
                        fill
                        className="object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 pr-2">
                        <span className={`${poppins.className} ml-[10px] text-lg md:text-[24px] font-bold text-white`}>
                            Enroll Now
                        </span>
                        <ChevronsRight
                            size={24}
                            className="text-white transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner