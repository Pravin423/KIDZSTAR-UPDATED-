"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { ChevronsRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Navbar({ className, disableScrollEffect = false }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (disableScrollEffect) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableScrollEffect]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

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

  const SidebarLink = ({ href, children }) => (
    <Link
      href={href}
      onClick={() => setSidebarOpen(false)}
      className={`text-[16px] font-semibold py-3 px-4 rounded-xl transition-all duration-300 ${pathname === href
        ? "bg-[#E6AF2E]/20 text-[#E6AF2E] border-l-4 border-[#E6AF2E]"
        : "text-white/80 hover:bg-white/10 hover:text-white"
        }`}
    >
      {children}
    </Link>
  );

  return (
    <>
      <nav className={`${className} flex items-center justify-between px-4 md:px-10 py-4 transition-all duration-1000 ease-in-out text-white ${isScrolled && !disableScrollEffect ? "bg-[#000E30] shadow-md" : "bg-transparent"
        }`}>

        {/* Brand Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/kidzstar_logo.png"
            alt="KidzStar Logo"
            width={65}
            height={65}
            className="object-contain w-[45px] h-[45px] md:w-[65px] md:h-[65px]"
          />
          <Image
            src="/title.png"
            alt="KidzStar Title"
            width={103}
            height={45}
            className="object-contain w-[75px] md:w-[103px]"
          />
        </div>

        {/* Desktop Navigation Links — unchanged, hidden on mobile */}
        <div className={`${poppins.className} hidden lg:flex items-center gap-8`}>
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
              <Link href="/admission" className="absolute inset-0 z-10" />
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

        {/* Mobile Hamburger Button — visible only on mobile */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 active:scale-90"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} className="text-white" />
        </button>
      </nav>

      {/* ── Mobile Sidebar Overlay + Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel — slides in from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#000E30] z-[101] lg:hidden flex flex-col shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Image
                    src="/kidzstar_logo.png"
                    alt="KidzStar Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <Image
                    src="/title.png"
                    alt="KidzStar Title"
                    width={80}
                    height={35}
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sidebar Links */}
              <div className={`${poppins.className} flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto`}>
                <SidebarLink href="/">Home</SidebarLink>
                <SidebarLink href="/about">About Us</SidebarLink>
                <SidebarLink href="/programs">Programs</SidebarLink>
                <SidebarLink href="/pages">Pages</SidebarLink>
                <SidebarLink href="/contact">Contact Us</SidebarLink>
                <SidebarLink href="/gallery">Gallery</SidebarLink>
                <SidebarLink href="/teacher-training">Teacher's Course</SidebarLink>
              </div>

              {/* Sidebar Admission Button */}
              <div className={`${poppins.className} px-4 pb-8`}>
                <Link
                  href="/admission"
                  onClick={() => setSidebarOpen(false)}
                  className="relative block w-full h-[53px] cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/button_yellow.svg"
                    alt="Admission Button"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <span className="text-[14px] font-bold text-white">Admission</span>
                    <ChevronsRight
                      size={24}
                      className="text-white transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
