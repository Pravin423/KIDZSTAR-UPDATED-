import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const facilities = [
  {
    number: "Sector 01",
    title: "Safe Outdoor Play",
    description: "Safe and secure outdoor play area with age-appropriate equipment to promote physical development and teamwork.",
    emoji: "🛝",
    accent: "#FF6D92",
    glowColor: "rgba(255,109,146,0.4)",
    borderColor: "rgba(255,109,146,0.25)",
  },
  {
    number: "Sector 02",
    title: "Colorful Classrooms",
    description: "Colorful and stimulating classrooms designed to spark imagination and encourage focus.",
    emoji: "🎨",
    accent: "#87FE41",
    glowColor: "rgba(135,254,65,0.4)",
    borderColor: "rgba(135,254,65,0.25)",
  },
  {
    number: "Sector 03",
    title: "Indoor Play Spaces",
    description: "Indoor play spaces for physical activities, sensory development, and weather-proof recreation.",
    emoji: "🏠",
    accent: "#60CFFF",
    glowColor: "rgba(96,207,255,0.4)",
    borderColor: "rgba(96,207,255,0.25)",
  },
  {
    number: "Sector 04",
    title: "Interactive Learning",
    description: "Interactive learning tools and educational toys tailored to each developmental stage.",
    emoji: "🧩",
    accent: "#A78BFA",
    glowColor: "rgba(167,139,250,0.4)",
    borderColor: "rgba(167,139,250,0.25)",
  },
  {
    number: "Sector 05",
    title: "Art & Creativity Corner",
    description: "Art and creativity corner filled with open-ended materials for self-expression and sensory play.",
    emoji: "✏️",
    accent: "#4ADE80",
    glowColor: "rgba(74,222,128,0.4)",
    borderColor: "rgba(74,222,128,0.25)",
  },
  {
    number: "Sector 06",
    title: "Smart Tech Integration",
    description: "Multimedia and technology integration for smart learning and early digital literacy.",
    emoji: "💡",
    accent: "#FF6D92",
    glowColor: "rgba(255,109,146,0.4)",
    borderColor: "rgba(255,109,146,0.25)",
  },
];

function Star({ x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, transform: "translateZ(0)" }}
      animate={{ opacity: [0.1, 0.7, 0.1] }}
      transition={{ duration: 3 + Math.random() * 4, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function FacilityCard({ facility, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="relative group h-full"
    >
      {/* Outer Glow Path */}
      <div 
        className="absolute -inset-[1px] rounded-[32px] opacity-20 group-hover:opacity-100 transition-opacity duration-700 blur-[8px]"
        style={{ background: `linear-gradient(45deg, transparent, ${facility.accent}, transparent)` }}
      />

      {/* Main Card */}
      <div 
        className="relative h-full rounded-[30px] p-8 overflow-hidden flex flex-col items-start border border-white/10 bg-[#05011a]/85 backdrop-blur-xl"
        style={{ boxShadow: `0 4px 20px rgba(0,0,0,0.5)`, transform: "translateZ(0)" }}
      >
        {/* Animated Background Aura */}
        <motion.div
          className="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[40px] opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
          style={{ background: facility.glowColor, willChange: "transform", transform: "translateZ(0)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header: Sector + Emoji */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-1">Mission Component</span>
            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: facility.accent }}>{facility.number}</span>
          </div>
          <motion.div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative bg-white/5 border border-white/10"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          >
            <div className="absolute inset-0 rounded-2xl blur-lg opacity-20" style={{ background: facility.accent }} />
            <span className="text-3xl relative z-10">{facility.emoji}</span>
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#87FE41] transition-colors duration-300">
          {facility.title}
        </h3>

        {/* Description */}
        <p className="text-[#a0a8cc] text-sm leading-relaxed mb-8 flex-grow">
          {facility.description}
        </p>

        {/* Decorative Progress Bar / Data Line */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ background: facility.accent, willChange: "transform", transform: "translateZ(0)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeading() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-20 relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/40" />
        <span className="text-white/60 text-xs md:text-sm font-bold tracking-[0.4em] uppercase">Advanced Campus</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/40" />
      </motion.div>

      <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
        Best <span className="text-[#87FE41] drop-shadow-[0_0_15px_rgba(135,254,65,0.3)]">Facilities</span> <br className="hidden md:block"/> For Our <span className="text-[#FF6D92] drop-shadow-[0_0_15px_rgba(255,109,146,0.3)]">Explorers</span>
      </h1>

      <p className="max-w-2xl mx-auto text-[#a0a8cc] text-base md:text-lg leading-relaxed opacity-80">
        Every corner is an orbit of discovery, meticulously engineered to fuel curiosity, safety, and rapid intellectual ignition.
      </p>
    </div>
  );
}

export default function BestFacilities() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const stars = [
    { x: 5, y: 10, size: 2, delay: 0 }, { x: 95, y: 85, size: 1, delay: 1.5 },
    { x: 15, y: 80, size: 1.5, delay: 0.3 }, { x: 50, y: 90, size: 1.5, delay: 1.2 },
    { x: 25, y: 30, size: 3, delay: 0.8 }, { x: 80, y: 60, size: 2, delay: 0.1 },
    { x: 40, y: 60, size: 1, delay: 0.2 }, { x: 35, y: 45, size: 1, delay: 1.8 },
    { x: 55, y: 15, size: 2.5, delay: 1.1 }, { x: 70, y: 8, size: 2.5, delay: 0.5 },
    { x: 65, y: 75, size: 2, delay: 0.6 }, { x: 20, y: 95, size: 1, delay: 1.0 },
    { x: 75, y: 40, size: 1.5, delay: 0.9 }, { x: 95, y: 50, size: 2, delay: 1.4 },
    { x: 85, y: 20, size: 3, delay: 0.4 }, { x: 10, y: 55, size: 2, delay: 0.7 },
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-32 overflow-hidden bg-[#030014] ${poppins.className}`}
    >
      {/* Cosmic Glow Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      {/* Star Field */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: starsY }}>
        {stars.map((s, i) => <Star key={i} {...s} />)}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading />

        {/* Facilities Grid with Staggered Vertical Alignment for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {facilities.map((f, i) => (
            <div 
              key={f.number} 
              className={i % 3 === 1 ? "md:mt-0 lg:mt-12" : i % 3 === 2 ? "md:mt-0 lg:mt-24" : "mt-0"}
            >
              <FacilityCard facility={f} index={i} />
            </div>
          ))}
        </div>

        {/* Aesthetic Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-8 py-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <span className="text-white/40 text-[10px] md:text-sm font-bold tracking-[0.5em] uppercase">
              ✨ Fueling Curiosity · Empowering Futures ✨
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
