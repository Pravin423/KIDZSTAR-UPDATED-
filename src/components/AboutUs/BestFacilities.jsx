import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

// ── Theme colours (matching project: navy + pink + gold) ─────────────────────
const facilities = [
  {
    number: "01",
    title: "Safe Outdoor Play",
    description: "Safe and secure outdoor play area with age-appropriate equipment to promote physical development and teamwork.",
    emoji: "🛝",
    accent: "#FF6D92",       // project pink
    glowColor: "rgba(255,109,146,0.35)",
    borderColor: "rgba(255,109,146,0.3)",
  },
  {
    number: "02",
    title: "Colorful Classrooms",
    description: "Colorful and stimulating classrooms designed to spark imagination and encourage focus.",
    emoji: "🎨",
    accent: "#E6AF2E",       // project gold
    glowColor: "rgba(230,175,46,0.35)",
    borderColor: "rgba(230,175,46,0.3)",
  },
  {
    number: "03",
    title: "Indoor Play Spaces",
    description: "Indoor play spaces for physical activities, sensory development, and weather-proof recreation.",
    emoji: "🏠",
    accent: "#60CFFF",
    glowColor: "rgba(96,207,255,0.35)",
    borderColor: "rgba(96,207,255,0.3)",
  },
  {
    number: "04",
    title: "Interactive Learning",
    description: "Interactive learning tools and educational toys tailored to each developmental stage.",
    emoji: "🧩",
    accent: "#A78BFA",
    glowColor: "rgba(167,139,250,0.35)",
    borderColor: "rgba(167,139,250,0.3)",
  },
  {
    number: "05",
    title: "Art & Creativity Corner",
    description: "Art and creativity corner filled with open-ended materials for self-expression and sensory play.",
    emoji: "✏️",
    accent: "#4ADE80",
    glowColor: "rgba(74,222,128,0.35)",
    borderColor: "rgba(74,222,128,0.3)",
  },
  {
    number: "06",
    title: "Smart Tech Integration",
    description: "Multimedia and technology integration for smart learning and early digital literacy.",
    emoji: "💡",
    accent: "#FF6D92",
    glowColor: "rgba(255,109,146,0.35)",
    borderColor: "rgba(255,109,146,0.3)",
  },
];

// ── Twinkling star in background ─────────────────────────────────────────────
function Star({ x, y, size, delay }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.4, 1] }}
      transition={{ duration: 2 + Math.random() * 2, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── Glassmorphism facility card ───────────────────────────────────────────────
function FacilityCard({ facility, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Alternate: even cards slide from left, odd from right
  const xFrom = index % 2 === 0 ? -60 : 60;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xFrom, y: 30 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
      className="relative group rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${facility.borderColor}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: `0 8px 40px rgba(0,0,0,0.3), 0 0 0 0 ${facility.glowColor}`,
      }}
    >
      {/* Glow blob on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${facility.glowColor}, transparent 70%)`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${facility.accent}, transparent)` }}
      />

      <div className="relative z-10 p-7">
        {/* Number + emoji row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-5xl font-black leading-none select-none"
            style={{ color: facility.accent, opacity: 0.18 }}
          >
            {facility.number}
          </span>
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
            transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          >
            {facility.emoji}
          </motion.span>
        </div>

        {/* Title */}
        <h3
          className="text-[1.1rem] font-bold mb-3 leading-tight"
          style={{ color: "#FFFFFF" }}
        >
          {facility.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(200,210,255,0.7)" }}>
          {facility.description}
        </p>

        {/* Bottom accent dot row */}
        <div className="flex gap-1.5 mt-5">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              style={{ background: facility.accent, width: i === 0 ? 20 : 6, opacity: i === 0 ? 1 : 0.4 }}
              animate={inView ? { scaleX: [0, 1] } : {}}
              transition={{ delay: 0.4 + index * 0.1 + i * 0.06, duration: 0.4 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Animated section heading ──────────────────────────────────────────────────
function SectionHeading() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const words = ["Best", "Facilities", "For", "Kids"];

  return (
    <div ref={ref} className="text-center mb-16 px-4">
      {/* Label — matches Vision "OUR VISION" style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center justify-center gap-4 mb-6"
      >
        <span className="w-12 h-[2px] bg-white inline-block" />
        <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-white">
          Our Campus
        </h2>
      </motion.div>

      {/* Main heading — word-by-word reveal */}
      <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 flex flex-wrap justify-center gap-x-4">
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: i === 1 || i === 3
                ? "#FF6D92"
                : "#FFFFFF",
              display: "inline-block",
              textShadow: i === 1 || i === 3
                ? "0 0 40px rgba(255,109,146,0.5)"
                : "none",
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Sub text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
        style={{ color: "rgba(200,210,255,0.65)" }}
      >
        Every corner of KidzStar is thoughtfully designed to nurture your child's growth,
        creativity, and joy — where learning feels like playtime.
      </motion.p>

      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        className="mt-8 mx-auto h-[2px] rounded-full max-w-xs"
        style={{
          background: "linear-gradient(90deg, transparent, #FF6D92 40%, #E6AF2E 60%, transparent)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function BestFacilities() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  // Parallax the star field
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // Fixed set of stars so no hydration mismatch
  const stars = [
    { x: 5,  y: 10, size: 2,   delay: 0 },
    { x: 15, y: 80, size: 1.5, delay: 0.3 },
    { x: 25, y: 30, size: 3,   delay: 0.8 },
    { x: 40, y: 60, size: 1,   delay: 0.2 },
    { x: 55, y: 15, size: 2.5, delay: 1.1 },
    { x: 65, y: 75, size: 2,   delay: 0.6 },
    { x: 75, y: 40, size: 1.5, delay: 0.9 },
    { x: 85, y: 20, size: 3,   delay: 0.4 },
    { x: 90, y: 85, size: 1,   delay: 1.5 },
    { x: 10, y: 55, size: 2,   delay: 0.7 },
    { x: 50, y: 90, size: 1.5, delay: 1.2 },
    { x: 80, y: 60, size: 2,   delay: 0.1 },
    { x: 35, y: 45, size: 1,   delay: 1.8 },
    { x: 70, y: 8,  size: 2.5, delay: 0.5 },
    { x: 20, y: 95, size: 1,   delay: 1.0 },
    { x: 95, y: 50, size: 2,   delay: 1.4 },
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 overflow-hidden ${poppins.className}`}
      style={{ background: "linear-gradient(160deg, #000E30 0%, #0D3697 50%, #000E30 100%)" }}
    >
      {/* ── Star field (parallax) ──────────────────────────────────────── */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: starsY }}>
        {stars.map((s, i) => <Star key={i} {...s} />)}
      </motion.div>

      {/* ── Large nebula blobs ─────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600, height: 600,
          top: "-20%", left: "-10%",
          background: "radial-gradient(circle, rgba(255,109,146,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500, height: 500,
          bottom: "-15%", right: "-8%",
          background: "radial-gradient(circle, rgba(230,175,46,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, i) => (
            <FacilityCard key={f.number} facility={f} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ color: "#E6AF2E" }}
          >
            ✨ Designed for every child's journey ✨
          </p>
          <p className="text-xs" style={{ color: "rgba(200,210,255,0.45)" }}>
            Sawarkar Nagar, Thane &amp; Indira Nagar, Koparkhairane
          </p>
        </motion.div>
      </div>
    </section>
  );
}
