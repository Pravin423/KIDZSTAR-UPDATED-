import React from 'react';
import Image from 'next/image';
import EnquiryForm from './EnquiryForm';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
);

const FooterContent = () => (
  <div className="w-full px-6 md:px-12 z-20 relative">
    <div className="max-w-[1200px] mx-auto bg-[#03153c]/40 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 text-white items-start">

        {/* Brand & Mission Info - takes 5 cols */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Animated Glowing Logo Border - Perfect White Circle */}
          <div className="relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden mb-8 h-48 w-48 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0_280deg,#ffffff_360deg)]" />
            <div className="absolute inset-[-150%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0_280deg,#ffffff_360deg)] blur-lg opacity-70" />

            <div className="relative bg-[#05112F] rounded-full w-full h-full z-10 flex items-center justify-center p-4">
              <Image
                src="/kidzstar_logo.png"
                alt="KidzStar"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
          </div>
          <p className={`${poppins.className} text-[#A3B1D5] text-[15px] leading-relaxed max-w-[340px] mb-6 font-light`}>
            Nurturing young minds through play, exploration, and creative learning. A wonderful place for your child to grow, discover, and shine.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF6D92] hover:border-[#FF6D92] transition-all duration-300">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/kidzstar_7?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF6D92] hover:border-[#FF6D92] transition-all duration-300">
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Navigation Links - takes 3 cols */}
        <div className="md:col-span-3 flex flex-col items-center md:items-start">
          <h3 className={`${poppins.className} text-[#FF6D92] text-lg font-semibold tracking-wider uppercase mb-6`}>
            Quick Links
          </h3>
          <ul className={`${poppins.className} flex flex-col items-center md:items-start space-y-4 text-[#E2E8F0] text-[15px]`}>
            <li>
              <Link href="/" className="hover:text-white hover:translate-x-1 inline-flex transition-transform duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6D92] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white hover:translate-x-1 inline-flex transition-transform duration-300 relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6D92] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-white hover:translate-x-1 inline-flex transition-transform duration-300 relative group">
                Programs
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6D92] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white hover:translate-x-1 inline-flex transition-transform duration-300 relative group">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6D92] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-flex transition-transform duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FF6D92] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Location - takes 4 cols */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className={`${poppins.className} text-[#FF6D92] text-lg font-semibold tracking-wider uppercase mb-6`}>
            Get In Touch
          </h3>
          <div className={`${poppins.className} text-[#E2E8F0] text-[15px] space-y-6 w-full lg:max-w-[400px]`}>
            <div className="flex items-start justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className="text-[#FF6D92]"><LocationIcon /></span>
              <span className="leading-relaxed">Thane - Sawarkar Nagar<br />& Indira Nagar, Koparkhairane</span>
            </div>

            <div className="flex items-start justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className="text-[#FF6D92] mt-0.5"><PhoneIcon /></span>
              <span className="leading-relaxed">9321002881 / 9323331360 / 7304344802</span>
            </div>

            <div className="flex items-start justify-center md:justify-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <span className="text-[#FF6D92] mt-0.5"><EmailIcon /></span>
              <a href="mailto:kidzstarpreprimaryschool@gmail.com" className="hover:text-white transition-colors break-all sm:break-normal">
                kidzstarpreprimaryschool@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className={`${poppins.className} text-[#8B9DC3] text-sm`}>
          © {new Date().getFullYear()} KidzStar Preschool. All rights reserved.
        </p>
        <p className={`${poppins.className} text-[#8B9DC3] text-sm flex gap-4`}>
          <a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors hover:underline">Terms of Service</a>
        </p>
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
