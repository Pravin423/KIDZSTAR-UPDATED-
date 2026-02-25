import React from 'react';
import Image from 'next/image';
import EnquiryForm from './EnquiryForm';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const Footer = () => {
  return (
    <div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden flex flex-col bg-[#000E30] bg-[url('/dd.png')] bg-cover bg-center overflow-hidden pb-10">

        {/* 1. Form — yellow oval card, mobile native sizing */}
        <div className="flex justify-center px-4 pt-10">
          <div
            className="w-full max-w-[340px] flex flex-col items-center px-8 py-8"
            style={{
              backgroundImage: "url('/yellowsvg.png')",
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              minHeight: '380px',
            }}
          >
            <p className={`${poppins.className} text-[#FF6D92] text-[13px] font-bold mb-1 text-center mt-2`}>
              Book Your Free Trial Class Now!
            </p>
            <Image src="/contactus.png" alt="Contact Us" width={200} height={48} className="object-contain mb-2" />
            <div className="w-full">
              <EnquiryForm isShortForm={true} />
            </div>
          </div>
        </div>

        {/* 2. Earth image — directly below the form, no gap */}
        <div className="flex justify-center overflow-hidden">
          <Image
            src="/earthbig.png"
            alt="earth"
            width={280}
            height={280}
            className="object-contain animate-[spin_60s_linear_infinite] translate-y-1/4"
          />
        </div>

      </div>

      {/* ── DESKTOP LAYOUT: 100% original, unchanged ── */}
      <div className="hidden md:flex justify-between items-end bg-[#000E30] bg-[url('/dd.png')] bg-repeat-space bg-cover min-h-screen overflow-y-hidden bg-center">

        {/* Earth (bottom left) */}
        <div className="relative -mb-96 -ml-80">
          <Image
            src="/earthbig.png"
            alt="earth"
            width={1000}
            height={1000}
            className="object-contain animate-[spin_60s_linear_infinite]"
          />
        </div>

        <div
          className="mr-[80px] w-[695px] h-[471px] bg-[url('/yellowsvg.png')] bg-contain bg-no-repeat bg-center flex items-center justify-center pt-8 pl-12"
          aria-label="Yellow background decoration"
        >
          <div className="flex flex-col items-center w-full max-w-[420px]">
            <p className={`${poppins.className} text-[#FF6D92] text-[16px] font-bold mb-2`}>
              Book Your Free Trial Class Now!
            </p>
            <Image src="/contactus.png" width={245} height={58} alt="Contact Us" className="mb-4" />
            <div className="w-full">
              <EnquiryForm isShortForm={true} />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Footer
