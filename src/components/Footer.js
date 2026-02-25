import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import EnquiryForm from './EnquiryForm';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between items-end bg-[#000E30] bg-[url('/dd.png')] bg-repeat-space bg-cover min-h-screen overflow-y-hidden  bg-center ">

        {/* Earth (bottom left) */}
        <div className="relative -mb-96 -ml-80">
          <Image
            src="/earthbig.png"   // your earth image
            alt="earth"
            width={1000}
            height={1000}
            className="object-contain animate-[spin_60s_linear_infinite]"
          />
        </div>

        <div
          className="mr-[20px]  w-[695px] h-[471px] bg-[url('/yellowsvg.png')] bg-contain bg-no-repeat bg-center"
          aria-label="Yellow background decoration"
        >
          <div className='ml-[100px] mt-[40px]'>
            <p className={`${poppins.className} ml-[120px] text-[#FF6D92] text-[16px] font-bold mb-1`}>
              Book Your Free Trial Class Now!
            </p>

            <Image className='ml-[130px]' src="/contactus.png" width={245} height={58} />


            <EnquiryForm isShortForm={true} />

          </div>


        </div>

      </div>


    </div>
  )
}

export default Footer
