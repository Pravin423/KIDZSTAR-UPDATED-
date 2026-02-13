"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { ChevronsRight } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar({className}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className={`text-[14px] font-bold border-b-2 transition-all duration-300 ${pathname === href
          ? "border-[#E6AF2E]"
          : "border-transparent "
        }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className={`${className} flex items-center justify-between px-10 py-4 transition-all duration-1000 ease-in-out text-white ${
      isScrolled ? "bg-[#000E30] shadow-md" : "bg-transparent"
    }`}>

      {/* Brand Section */}
      <div className="flex items-center gap-3">
        <Image
          src="/kidzstar_logo.png"
          alt="KidzStar Logo"
          width={65}
          height={65}
          className="object-contain"
        />
        <Image
          src="/title.png"
          alt="KidzStar Title"
          width={103}
          height={45}
          className="object-contain"
        />
      </div>

      {/* Navigation Links */}
      <div className={`${poppins.className} flex items-center gap-8`}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/programs">Programs</NavLink>
        <NavLink href="/pages">Pages</NavLink>
        <NavLink href="/contact">Contact Us</NavLink>
        <NavLink href="/gallery">Gallery</NavLink>
        <NavLink href="/teacher-training">Teacher's Course</NavLink>

        {/* Admission Button */}
        <div className="relative w-[167px] h-[53px] cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95">
          <Image
            src="/button_yellow.svg"
            alt="Admission Button"
            fill
            className="object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-between px-7">
            <span className="text-[14px] font-bold text-white">
              Admission
            </span>

            <ChevronsRight
              size={28}
              className="text-white transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
