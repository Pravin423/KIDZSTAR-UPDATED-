import React from 'react';
import Image from 'next/image';
import EnquiryForm from './EnquiryForm';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const FooterContent = () => (
  <div className="w-full px-6 md:px-12 z-20 relative">
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 text-white">
      {/* Logo & Phrase */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        {/* Animated Glowing Logo Border - Perfect White Circle */}
        <div className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden mb-6 h-56 w-56 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          {/* Spinning Conic Gradient (White) */}
          <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0_280deg,#ffffff_360deg)]" />

          {/* Glow Blur Effect Layer */}
          <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0_280deg,#ffffff_360deg)] blur-lg opacity-80" />

          {/* Inner Mask Plate */}
          <div className="relative bg-[#000E30] rounded-full w-full h-full z-10 flex items-center justify-center p-4">
            <Image
              src="/kidzstar_logo.png"
              alt="KidzStar"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
        </div>
        <p className={`${poppins.className} text-gray-300 text-sm leading-relaxed max-w-[300px]`}>
          Nurturing young minds through play, exploration, and creative learning. A wonderful place for your child to grow, discover, and shine.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center md:items-start md:ml-10">
        <h3 className={`${poppins.className} text-[#FF6D92] text-xl font-bold mb-5`}>
          Quick Links
        </h3>
        <ul className={`${poppins.className} flex flex-col items-center md:items-start space-y-3 text-gray-300 text-base`}>
          <li><Link href="/" className="hover:text-[#FF6D92] transition-colors">Home</Link></li>
          <li><Link href="/about" className="hover:text-[#FF6D92] transition-colors">About Us</Link></li>
          <li><Link href="/programs" className="hover:text-[#FF6D92] transition-colors">Programs</Link></li>
          <li><Link href="/gallery" className="hover:text-[#FF6D92] transition-colors">Gallery</Link></li>
          <li><Link href="/contact" className="hover:text-[#FF6D92] transition-colors">Contact</Link></li>
        </ul>
      </div>

      {/* Location */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h3 className={`${poppins.className} text-[#FF6D92] text-xl font-bold mb-5`}>
          Get In Touch
        </h3>
        <div className={`${poppins.className} text-gray-300 text-base space-y-4`}>
          <p className="flex items-start justify-center md:justify-start">
            <span className="mr-3 text-xl">📍</span>
            <span>123 KidzStar Avenue,<br />Learning Block, Education City 12345</span>
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <span className="mr-3 text-xl">📞</span>
            <span>+1 (555) 123-4567</span>
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <span className="mr-3 text-xl">✉️</span>
            <span>hello@kidzstar.com</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  return (
    <div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden flex flex-col bg-[#000E30] bg-[url('/dd.png')] bg-cover bg-center overflow-hidden pb-10">

        {/* Top Content: Logo, Links, Contact */}
        <div className="pt-12 pb-4">
          <FooterContent />
        </div>

        {/* 1. Form — yellow oval card, mobile native sizing */}
        <div className="flex justify-center px-4 pt-10 relative z-20">
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
        <div className="flex justify-center overflow-hidden relative items-center">
          <Image
            src="/earthbig.png"
            alt="earth"
            width={280}
            height={280}
            className="object-contain animate-[spin_60s_linear_infinite] translate-y-1/4"
          />
        </div>

      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex flex-col justify-end bg-[#000E30] bg-[url('/dd.png')] bg-repeat-space bg-cover overflow-hidden bg-center relative pt-[400px] lg:pt-[550px] xl:pt-[750px]">

        {/* Top Middle Content: The requested content right in the stars */}
        <div className="w-full z-20 relative">
          <FooterContent />
        </div>

        {/* Bottom Elements: Earth and Form side-by-side */}
        <div className="flex justify-between items-end w-full relative z-10">
          {/* Earth (bottom left) */}
          <div className="relative -mb-96 -ml-80 flex items-center justify-center pointer-events-none">
            <Image
              src="/earthbig.png"
              alt="earth"
              width={1000}
              height={1000}
              className="object-contain animate-[spin_60s_linear_infinite]"
            />
          </div>

          <div
            className="mr-[80px] w-[695px] h-[471px] bg-[url('/yellowsvg.png')] bg-contain bg-no-repeat bg-center flex items-center justify-center pt-8 pl-12 relative z-20"
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

    </div>
  )
}

export default Footer
