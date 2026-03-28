'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Poppins } from "next/font/google";
import { ChevronsRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "700"],
});

const SLIDE_DURATION = 8000;

/* ─────────────────────────────────────────────
   Load the Houdini Ring-Particles worklet once.
   Module-level flag survives re-renders / HMR.
 ───────────────────────────────────────────── */
let workletLoaded = false;

function useRingParticlesWorklet() {
  useEffect(() => {
    if (workletLoaded) return;
    if (typeof window === 'undefined') return;
    if (!('paintWorklet' in CSS)) return;

    /* plain bracket notation — no TypeScript cast needed */
    CSS['paintWorklet']
      .addModule('https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js')
      .then(() => { workletLoaded = true; })
      .catch(console.warn);
  }, []);
}

/* ─────────────────────────────────────────────
   Dot indicator
 ───────────────────────────────────────────── */
function SlideDots({ total, current, onSelect }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative w-8 h-2 rounded-full overflow-hidden bg-white/20 transition-all duration-300"
          aria-label={`Go to slide ${i + 1}`}
        >
          {i === current && (
            <motion.div
              className="absolute inset-0 bg-[#FFF005] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Star Background Component
───────────────────────────────────────────── */
function StarBackground() {
  const colors = ["#ffffff", "#fff4e6", "#e6f8ff", "#f3e8ff"];
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#030014]">
      {/* 1. Deep space base with subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,0.8)_0%,_rgba(3,0,20,1)_100%)]" />

      {/* 2. Denser distant background stars (Subtle blinking) */}
      {[...Array(150)].map((_, i) => (
        <motion.div
          key={`distant-${i}`}
          className="absolute rounded-full bg-white"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 1.2 + 0.3}px`,
            height: `${Math.random() * 1.2 + 0.3}px`,
            opacity: Math.random() * 0.12 + 0.03
          }}
          animate={{
            opacity: [null, 0.2, 0.05, 0.2, null]
          }}
          transition={{
            duration: 2 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
      
      {/* 3. Mid-ground twinkling stars (Faster blinking) */}
      {[...Array(80)].map((_, i) => {
        const starColor = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 1.8 + 0.8;
        return (
          <motion.div
            key={`mid-${i}`}
            className="absolute rounded-full"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.2,
              scale: size / 2,
            }}
            animate={{
              opacity: [null, 1, 0.3, 1, null],
              scale: [null, 1.3, 0.8, 1.3, null],
            }}
            transition={{
              duration: 1.5 + Math.random() * 2.5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: starColor,
              boxShadow: `0 0 ${size * 4}px ${starColor}99`,
            }}
          />
        );
      })}

      {/* 4. Large hero stars with diffraction spikes (Noticeable pulsing) */}
      {[...Array(10)].map((_, i) => {
        const starColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={`hero-${i}`}
            className="absolute"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.15,
              scale: 0.6,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            style={{ width: '4px', height: '4px' }}
          >
            {/* Bright Core */}
            <div 
              className="absolute inset-0 rounded-full blur-[0.2px]" 
              style={{ backgroundColor: starColor, boxShadow: `0 0 16px 2px ${starColor}` }} 
            />
            {/* Diffuse diffraction spikes */}
            <div 
              className="absolute top-1/2 left-[-500%] right-[-500%] h-[0.5px] -translate-y-1/2 blur-[1.5px] opacity-20"
              style={{ background: `linear-gradient(to right, transparent, ${starColor}, transparent)` }}
            />
            <div 
              className="absolute left-1/2 top-[-500%] bottom-[-500%] w-[0.5px] -translate-x-1/2 blur-[1.5px] opacity-20"
              style={{ background: `linear-gradient(to bottom, transparent, ${starColor}, transparent)` }}
            />
          </motion.div>
        );
      })}

      {/* Dust clouds / Nebulae (Subtle) */}
      <div className="absolute top-[25%] left-[15%] w-[50%] h-[40%] bg-blue-500/5 blur-[160px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] right-[20%] w-[45%] h-[50%] bg-indigo-500/5 blur-[140px] pointer-events-none mix-blend-screen delay-1000" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Slide 1 — Original Admission Hero
 ───────────────────────────────────────────── */
function Slide1({ kidScale }) {
  return (
    <motion.div
      key="slide1"
      className="absolute inset-0 flex items-center"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="px-6 gap-[40px] md:pl-[120px] pt-[80px] flex flex-col md:flex-row items-center justify-between w-full relative z-10">
        {/* Left: text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 max-w-[850px] z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-6 w-[2px] bg-green-600 mx-4" />
            <span className={`${poppins.className} text-green-200 text-sm md:text-[20px] font-bold tracking-[0.3em] uppercase opacity-80`}>
              Admissions Live For 2026-2027
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`${poppins.className} text-7xl md:text-[145px] leading-[0.8] font-black text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] uppercase mb-4 tracking-tighter`}>
              Kidz<span className="text-[#FFF005] drop-shadow-[0_0_25px_rgba(255,240,5,0.4)]">star</span>
            </h1>
          </motion.div>

          <motion.h2
            className={`${poppins.className} text-3xl md:text-[56px] font-bold text-white uppercase tracking-tight mb-8 drop-shadow-lg flex items-center h-20`}
          >
            {"building futures".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.05,
                  delay: 0.8 + i * 0.08,
                  ease: "easeIn"
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {"...".split("").map((dot, i) => (
              <motion.span
                key={i + 10}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{
                  opacity: {
                    times: [0, 0.1, 0.5, 1],
                    duration: 2,
                    delay: 2.1 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }
                }}
                className="text-[#FFF005]"
              >
                {dot}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`${poppins.className} text-sm md:text-[24px] text-white font-medium mb-12 tracking-[0.2em] opacity-90`}
          >
            Playground &nbsp;·&nbsp; Nursery &nbsp;·&nbsp; JR.KG &nbsp;·&nbsp; SR.KG
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: "backOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-[200px] h-[60px] md:w-[260px] md:h-[82px] cursor-pointer group z-20"
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-[20px] opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            <Image src="/button_cyan.png" alt="Admission Button" fill className="object-contain" />
            <Link href="/admission" className="absolute inset-0 z-10" />
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              <span className={`${poppins.className} text-xl md:text-[28px] font-extrabold text-white`}>Enroll Now</span>
              <ChevronsRight size={34} className="text-white transition-transform duration-300 group-hover:translate-x-3" />
            </div>
          </motion.div>
        </div>

        {/* Right: kid + triangle */}
        <div className="flex-1 flex justify-center relative w-full h-[500px] md:h-[900px] z-0">
          <div className="absolute inset-0 flex items-center justify-center scale-110 md:scale-135 pointer-events-none">
            <Image src="/bannertrianglw.png" alt="Background Shape" width={2500} height={2500} className="object-contain" />
          </div>
          <motion.div
            className="relative w-[80%] h-[80%] mt-10 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ scale: kidScale, willChange: "transform" }}
            animate={{ y: [0, -25, 0], rotate: [0, 1, 0, -1, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          >
            <Image src="/bannerkid.png" alt="Kids Illustration" fill className="object-contain" priority />
          </motion.div>
        </div>
      </div>

      {/* Spinning earth logo */}
      <div className="absolute -bottom-20 -left-20 z-0 opacity-20 pointer-events-none transition-opacity duration-1000">
        <motion.div
          animate={{ rotate: 360 }}
          style={{ willChange: "transform" }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="relative"
        >
          <div className="absolute inset-0 bg-blue-400/30 blur-[100px] rounded-full scale-125" />
          <Image src="/eathlogo.png" alt="Earth Logo" width={480} height={480} className="relative z-10" />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Slide 2 — Antigravity Hero + Ring Particles
 ───────────────────────────────────────────── */
function Slide2() {
  /* ── 3-D tilt (existing) ── */
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["10%", "90%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["10%", "90%"]);

  /* ── Ring-Particles refs ── */
  const particleRef = useRef(null);
  const isInteractiveRef = useRef(false);

  /* Load worklet once (no-op if already done or unsupported) */
  useRingParticlesWorklet();

  /* Pointer tracking: update CSS custom props on the particle layer */
  const handleParticleMove = useCallback((e) => {
    const el = particleRef.current;
    if (!el) return;
    if (!isInteractiveRef.current) {
      el.classList.add('rp-interactive');
      isInteractiveRef.current = true;
    }
    el.style.setProperty('--ring-x', String((e.clientX / window.innerWidth) * 100));
    el.style.setProperty('--ring-y', String((e.clientY / window.innerHeight) * 100));
    el.style.setProperty('--ring-interactive', '1');
  }, []);

  const handleParticleLeave = useCallback(() => {
    const el = particleRef.current;
    if (!el) return;
    el.classList.remove('rp-interactive');
    isInteractiveRef.current = false;
    el.style.setProperty('--ring-x', '50');
    el.style.setProperty('--ring-y', '50');
    el.style.setProperty('--ring-interactive', '0');
  }, []);

  /* Combined 3-D tilt handlers (card only) */
  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mx, my]);

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      key="slide2"
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      /* Ring-Particles pointer events sit on the outer wrapper (full slide) */
      onPointerMove={handleParticleMove}
      onPointerLeave={handleParticleLeave}
    >
      {/* ── Ring-Particles background layer ── */}
      <div
        ref={particleRef}
        aria-hidden="true"
        className="rp-layer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          /* Houdini custom properties */
          '--ring-radius': '150',
          '--ring-thickness': '500',
          '--particle-count': '70',
          '--particle-rows': '20',
          '--particle-size': '2',
          '--particle-color': 'white',
          '--particle-min-alpha': '0.08',
          '--particle-max-alpha': '0.9',
          '--seed': '42',
          '--ring-x': '50',
          '--ring-y': '50',
          '--animation-tick': '0',
        }}
      />

      {/* ── 3-D tilt card (existing) ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000, zIndex: 1 }}
        className="relative flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
      >
        {/* Glow orb */}
        <motion.div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{
            background: "radial-gradient(circle, #FFF005, #00e5ff, transparent 70%)",
            left: glowX, top: glowY,
            translateX: "-50%", translateY: "-50%",
          }}
        />


        {/* Headline */}
        <motion.div
          style={{ translateZ: 40 }}
          className="text-center"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
        >
          <h1 className={`${poppins.className} text-[80px] md:text-[110px] leading-none font-bold text-white drop-shadow-[0_0_40px_rgba(255,240,5,0.4)]`}>
            Your Child's Journey
          </h1>
          <h2 className={`${poppins.className} text-[36px] md:text-[52px] font-bold text-[#FFF005] mt-1 drop-shadow-[0_0_20px_rgba(255,240,5,0.6)] uppercase`}>
            Admissions are Live For  2026-2027
          </h2>
        </motion.div>

        {/* Classes */}
        <motion.p
          style={{ translateZ: 30 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          className={`${poppins.className} text-[18px] text-white/70 font-extralight mt-5 tracking-[0.25em] uppercase`}
        >
          Playground &nbsp;·&nbsp; Nursery &nbsp;·&nbsp; JR.KG &nbsp;·&nbsp; SR.KG
        </motion.p>

        {/* CTA */}
        <motion.div
          style={{ translateZ: 50 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
          className="relative w-[200px] h-[62px] cursor-pointer group mt-10"
        >
          <Image src="/button_cyan.png" alt="Admission Button" fill className="object-contain" />
          <Link href="/admission" className="absolute inset-0 z-10" />
          <div className="absolute inset-0 flex items-center justify-center gap-2">
            <span className={`${poppins.className} text-[22px] font-bold text-white`}>Enroll Now</span>
            <ChevronsRight size={26} className="text-white transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </motion.div>

        {/* Orbiting particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#FFF005]/60"
            style={{
              top: `${20 + Math.sin((i / 6) * Math.PI * 2) * 38}%`,
              left: `${50 + Math.cos((i / 6) * Math.PI * 2) * 38}%`,
              translateZ: 20,
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      {/* ── Houdini ring-particles CSS ──
          @property lets CSS animate the numeric custom props.
          Move to globals.css if you prefer — it just needs to exist once. ── */}
      <style>{`
        @property --animation-tick { syntax: '<number>'; inherits: false; initial-value: 0; }
        @property --ring-radius    { syntax: '<number>'; inherits: false; initial-value: 150; }
        @property --ring-x         { syntax: '<number>'; inherits: false; initial-value: 50; }
        @property --ring-y         { syntax: '<number>'; inherits: false; initial-value: 50; }

        @keyframes rp-ripple { from { --animation-tick: 0 } to { --animation-tick: 1 } }
        @keyframes rp-ring   { 0%   { --ring-radius: 130  } 100% { --ring-radius: 230 } }

        /* Idle auto-pulse when the mouse isn't over the slide */
        .rp-layer:not(.rp-interactive) {
          animation:
            rp-ripple 6s linear infinite,
            rp-ring   6s ease-in-out infinite alternate;
        }

        /* Smooth drift back to centre after mouse leaves */
        .rp-layer {
          transition: --ring-x 2.5s ease, --ring-y 2.5s ease;
        }

        /* Only apply the worklet paint in supporting browsers */
        @supports (background: paint(ring-particles)) {
          .rp-layer {
            background-image: paint(ring-particles);
          }
        }
      `}</style>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Banner
 ───────────────────────────────────────────── */
const HomeBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const TOTAL_SLIDES = 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const kidScale = 1;

  return (
    <div className="overflow-hidden relative min-h-screen bg-[#030014]">
      {/* Global Space Background */}
      <StarBackground />

      {/* ── Mobile Layout ── */}
      <div className="flex md:hidden flex-col items-center justify-center min-h-screen text-center px-6 pt-[100px] pb-16 relative z-10">
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <motion.div
              key="mobile-slide1"
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 mb-6"
              >

                <div className="h-4 w-[1px] bg-white/20 mx-2" />
                <span className={`${poppins.className} text-white text-[11px] font-bold tracking-[0.1em] uppercase opacity-80`}>
                  Admissions Live
                </span>
                <div className="h-[2px] w-10 bg-[#FFF005] rounded-full shadow-[0_0_10px_rgba(255,240,5,0.4)]" />
              </motion.div>
              <h1 className={`${poppins.className} text-[68px] leading-[0.85] font-bold text-white uppercase`}>Kidzstar</h1>
              <motion.h2 className={`${poppins.className} text-[28px] font-bold text-[#FFF005] uppercase mt-2 flex items-center`}>
                {"building futures".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.05, delay: 0.6 + i * 0.06 }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                {"...".split("").map((dot, i) => (
                  <motion.span
                    key={i + 10}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1] }}
                    transition={{
                      opacity: {
                        duration: 1.5,
                        delay: 1.6 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }
                    }}
                  >
                    {dot}
                  </motion.span>
                ))}
              </motion.h2>
              <p className={`${poppins.className} text-[14px] text-white/80 font-extralight mt-4 mb-2 tracking-wide`}>
                Playground · Nursery · JR.KG · SR.KG
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-[190px] h-[58px] cursor-pointer group mt-4">
                <Image src="/button_cyan.png" alt="Admission Button" fill className="object-contain" />
                <Link href="/admission" className="absolute inset-0 z-10" />
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  <span className={`${poppins.className} text-[18px] font-bold text-white`}>Enroll Now</span>
                  <ChevronsRight size={24} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="mobile-slide2"
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <div className="mb-4 px-5 py-2 rounded-full border border-[#FFF005]/40 bg-[#FFF005]/10">
                <span className={`${poppins.className} text-[#FFF005] text-xs font-semibold tracking-widest uppercase`}>
                  2026 – 2027 Academic Year
                </span>
              </div>
              <h1 className={`${poppins.className} text-[32px] leading-none font-bold text-white uppercase`}>Your Child's Journey</h1>
              <h2 className={`${poppins.className} text-[28px] font-bold text-[#FFF005] uppercase`}>Admissions are Live</h2>
              <p className={`${poppins.className} text-[14px] text-white/70 font-extralight mt-2 tracking-[0.2em] uppercase`}>
                Playground · Nursery · JR.KG · SR.KG
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative w-[190px] h-[58px] cursor-pointer group mt-4">
                <Image src="/button_cyan.png" alt="Admission Button" fill className="object-contain" />
                <Link href="/admission" className="absolute inset-0 z-10" />
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                  <span className={`${poppins.className} text-[18px] font-bold text-white`}>Enroll Now</span>
                  <ChevronsRight size={24} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* Mobile dots */}
        <div className="flex gap-3 mt-8">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-8 h-2 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-[#FFF005]' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
 
      {/* ── Desktop Layout ── */}
      <div className="hidden md:block relative w-full h-screen min-h-[700px] z-10">
        <AnimatePresence mode="wait">
          {activeSlide === 0 ? (
            <Slide1 key="slide1" kidScale={kidScale} />
          ) : (
            <Slide2 key="slide2" />
          )}
        </AnimatePresence>
 
        <SlideDots total={TOTAL_SLIDES} current={activeSlide} onSelect={setActiveSlide} />
      </div>
    </div>
  );
};
 
export default HomeBanner;