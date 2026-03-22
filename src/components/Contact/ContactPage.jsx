"use client";

import { useState, useRef } from "react";
import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ── Icons ──────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-6 h-6">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07
      19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3
      a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11
      L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45
      12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-6 h-6">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-6 h-6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-6 h-6">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324
      1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788
      4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504
      0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73
      0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691
      4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069
      4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07
      -3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92
      -.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849
      .149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069
      4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78
      2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014
      3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072
      4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618
      6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667
      -.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059
      -1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162
      6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403
      -2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4
      4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441
      1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s
      -.644-1.44-1.439-1.44z" />
  </svg>
);

// ── Contact Info Items ────────────────────────────────────────────────────
const contactItems = [
  {
    icon: <PhoneIcon />,
    label: "Call Us",
    value: "9321002881 / 9323331360\n7304344802",
    href: "tel:9321002881",
  },
  {
    icon: <EmailIcon />,
    label: "Email Us",
    value: "kidzstarpreprimaryschool@gmail.com",
    href: "mailto:kidzstarpreprimaryschool@gmail.com",
  },
  {
    icon: <LocationIcon />,
    label: "Visit Us",
    value: "Thane - Sawarkar Nagar\n& Indira Nagar, Koparkhairane",
    href: "#map",
  },
  {
    icon: <ClockIcon />,
    label: "School Hours",
    value: "Mon – Sat: 8:00 AM – 1:00 PM\nSunday: Closed",
    href: null,
  },
];

// ── Branch map data (placeholder iframes — user replaces src) ─────────────
const branches = [
  {
    id: "thane",
    name: "Thane – Sawarkar Nagar",
    address: "Sawarkar Nagar, Thane, Maharashtra",
    // ↓ Replace this src with your actual Google Maps iframe src
    mapSrc: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15228.028528765022!2d72.952698!3d19.205698!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9e4a789d0c5%3A0xa93541f84765b135!2sKIDZSTAR%20PRE%20PRIMARY%20SCHOOL!5e1!3m2!1sen!2sin!4v1774151425272!5m2!1sen!2sin",
    color: "#FF6D92",
  },
  {
    id: "koparkhairane",
    name: "Koparkhairane – Indira Nagar",
    address: "Indira Nagar, Koparkhairane, Navi Mumbai, Maharashtra",
    // ↓ Replace this src with your actual Google Maps iframe src
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.5!2d73.02!3d19.10!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS2lkelN0YXI!5e0!3m2!1sen!2sin!4v1600000000001!5m2!1sen!2sin",
    color: "#E6AF2E",
  },
];

// ── Floating Star decoration ─────────────────────────────────────────────
const FloatingStar = ({ style }) => (
  <div className="absolute pointer-events-none select-none" style={style}>
    <svg viewBox="0 0 20 20" fill="white" opacity="0.25" width="8" height="8">
      <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
    </svg>
  </div>
);

// ── Animation variants ───────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

// ── Main Component ────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeBranch, setActiveBranch] = useState(0);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <div
      className={`${poppins.className} relative bg-[#000E30] min-h-screen overflow-x-hidden`}
      style={{ backgroundImage: "url('/dd.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Decorative floating stars */}
      {[
        { top: "8%", left: "5%", width: 10, height: 10 },
        { top: "15%", left: "88%", width: 7, height: 7 },
        { top: "40%", left: "3%", width: 12, height: 12 },
        { top: "55%", left: "93%", width: 9, height: 9 },
        { top: "70%", left: "12%", width: 6, height: 6 },
        { top: "85%", left: "80%", width: 11, height: 11 },
      ].map((s, i) => (
        <FloatingStar key={i} style={s} />
      ))}

      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-20 px-4">
        {/* Glow blob behind title */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(255,109,146,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <span className="inline-block bg-[#FF6D92]/20 border border-[#FF6D92]/40 text-[#FF6D92] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4"
            style={{ textShadow: "0 0 40px rgba(255,109,146,0.4)" }}>
            Contact{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FF6D92 0%, #E6AF2E 100%)" }}>
              KidzStar
            </span>
          </h1>
          <p className="text-[#A3B1D5] text-lg max-w-xl mx-auto leading-relaxed">
            We'd love to hear from you! Reach out to us and let's start your child's
            wonderful journey together.
          </p>
        </motion.div>

        {/* Hero wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z"
              fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ────────────────────────────────────────── */}
      <section className="relative z-10 px-4 md:px-10 max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactItems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="group flex flex-col items-start p-6 rounded-2xl h-full
                    bg-white/5 border border-white/10 backdrop-blur-sm
                    hover:bg-white/10 hover:border-[#FF6D92]/50
                    transition-all duration-300 cursor-pointer block"
                >
                  <ContactCard item={item} />
                </a>
              ) : (
                <div className="group flex flex-col items-start p-6 rounded-2xl h-full
                  bg-white/5 border border-white/10 backdrop-blur-sm">
                  <ContactCard item={item} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FORM + MAP SECTION ────────────────────────────────────────── */}
      <section id="contact-form" className="relative z-10 px-4 md:px-10 max-w-6xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-[#03153c]/60 backdrop-blur-md border border-white/10
              rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <h2 className="text-white text-3xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-[#A3B1D5] text-sm mb-8">
              Have a question or want to book a free trial class? We'll get back to you within 24 hours.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#FF6D92]/20 border-2 border-[#FF6D92]
                  flex items-center justify-center mb-6">
                  <svg className="w-9 h-9 text-[#FF6D92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Message Sent! 🎉</h3>
                <p className="text-[#A3B1D5]">Thank you for reaching out. We'll be in touch with you very soon!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2.5 rounded-xl bg-[#FF6D92]/20 border border-[#FF6D92]/40
                    text-[#FF6D92] text-sm font-semibold hover:bg-[#FF6D92]/30 transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[#E2E8F0] text-sm font-semibold">Your Name</label>
                  <input
                    name="name"
                    placeholder="Parent / Guardian Name"
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3
                      text-white placeholder:text-white/40 text-sm
                      focus:outline-none focus:border-[#FF6D92]/70 focus:bg-white/10
                      transition-all duration-200"
                  />
                </div>

                {/* Phone + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[#E2E8F0] text-sm font-semibold">Phone Number</label>
                    <input
                      name="phone"
                      placeholder="e.g. 9321002881"
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3
                        text-white placeholder:text-white/40 text-sm
                        focus:outline-none focus:border-[#FF6D92]/70 focus:bg-white/10
                        transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[#E2E8F0] text-sm font-semibold">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3
                        text-white placeholder:text-white/40 text-sm
                        focus:outline-none focus:border-[#FF6D92]/70 focus:bg-white/10
                        transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[#E2E8F0] text-sm font-semibold">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your child's age, any questions or specific requirements..."
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3
                      text-white placeholder:text-white/40 text-sm resize-none
                      focus:outline-none focus:border-[#FF6D92]/70 focus:bg-white/10
                      transition-all duration-200"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full h-14 flex items-center justify-center
                    rounded-xl font-bold text-white text-[15px] overflow-hidden
                    transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #FF6D92 0%, #e05070 50%, #c8405a 100%)",
                    boxShadow: "0 8px 32px rgba(255,109,146,0.4)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <ChevronsRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
                </button>

                <p className="text-[#6B7A9E] text-xs text-center">
                  📞 Prefer to call? Reach us at{" "}
                  <a href="tel:9321002881" className="text-[#FF6D92] hover:underline">9321002881</a>
                </p>
              </form>
            )}
          </motion.div>

          {/* Right: Quick Info Panel */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Branch Hours Card */}
            <div className="bg-[#03153c]/60 backdrop-blur-md border border-white/10
              rounded-3xl p-7 shadow-2xl">
              <h3 className="text-[#FF6D92] text-sm font-bold uppercase tracking-widest mb-5">
                📅 School Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday – Friday", time: "8:00 AM – 1:00 PM" },
                  { day: "Saturday", time: "8:00 AM – 12:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center
                    border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-[#A3B1D5] text-sm">{row.day}</span>
                    <span className={`text-sm font-semibold ${row.time === "Closed" ? "text-red-400" : "text-white"}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social / CTA Card */}
            <div className="bg-gradient-to-br from-[#FF6D92]/15 to-[#E6AF2E]/10
              border border-[#FF6D92]/20 rounded-3xl p-7 shadow-2xl flex-1">
              <h3 className="text-white text-xl font-bold mb-2">Follow KidzStar ⭐</h3>
              <p className="text-[#A3B1D5] text-sm mb-5 leading-relaxed">
                Stay updated with fun activities, events, and little milestones from our school every day!
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-white/10 border border-white/15 text-white text-sm font-semibold
                    hover:bg-[#FF6D92] hover:border-[#FF6D92] transition-all duration-300"
                >
                  <FacebookIcon /> Facebook
                </a>
                <a
                  href="https://www.instagram.com/kidzstar_7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                    bg-white/10 border border-white/15 text-white text-sm font-semibold
                    hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045]
                    hover:border-transparent transition-all duration-300"
                >
                  <InstagramIcon /> Instagram
                </a>
              </div>

              {/* Admission CTA */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-[#A3B1D5] text-sm mb-3">Ready to enrol your little one?</p>
                <a
                  href="/admission"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl
                    font-bold text-white text-sm transition-all duration-300
                    hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #E6AF2E 0%, #c99000 100%)",
                    boxShadow: "0 4px 20px rgba(230,175,46,0.3)",
                  }}
                >
                  Apply for Admission
                  <ChevronsRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── MAP SECTION ───────────────────────────────────────────────── */}
      <section id="map" className="relative z-10 px-4 md:px-10 max-w-6xl mx-auto mb-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-block bg-[#E6AF2E]/20 border border-[#E6AF2E]/40
              text-[#E6AF2E] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              📍 Our Locations
            </span>
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              Find Us on the Map
            </h2>
            <p className="text-[#A3B1D5] mt-3 text-sm max-w-lg mx-auto">
              KidzStar has two convenient locations to serve your family. Click on a branch below to explore.
            </p>
          </div>

          {/* Branch Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {branches.map((branch, i) => (
              <button
                key={branch.id}
                onClick={() => setActiveBranch(i)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                  ${activeBranch === i
                    ? "text-white shadow-lg scale-105"
                    : "bg-white/5 border border-white/10 text-[#A3B1D5] hover:bg-white/10 hover:text-white"
                  }`}
                style={activeBranch === i ? {
                  background: `linear-gradient(135deg, ${branch.color} 0%, ${branch.color}aa 100%)`,
                  boxShadow: `0 4px 20px ${branch.color}55`,
                } : {}}
              >
                📍 {branch.name}
              </button>
            ))}
          </div>

          {/* Map iframe container */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            style={{ boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)` }}>
            {/* Map header bar */}
            <div className="bg-[#03153c]/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between
              border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${branches[activeBranch].color} 0%, ${branches[activeBranch].color}88 100%)` }}>
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{branches[activeBranch].name}</p>
                  <p className="text-[#6B7A9E] text-xs">{branches[activeBranch].address}</p>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(branches[activeBranch].address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg
                  text-white transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${branches[activeBranch].color} 0%, ${branches[activeBranch].color}bb 100%)` }}
              >
                Open in Maps ↗
              </a>
            </div>

            {/* Actual Google Maps iframe */}
            <div className="relative w-full" style={{ height: "420px" }}>
              {branches.map((branch, i) => (
                <iframe
                  key={branch.id}
                  src={branch.mapSrc}
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    position: "absolute",
                    inset: 0,
                    opacity: activeBranch === i ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: activeBranch === i ? "auto" : "none",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map - ${branch.name}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA STRIP ─────────────────────────────────────────── */}
      <section className="relative z-10 px-4 md:px-10 max-w-6xl mx-auto mb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-12"
          style={{
            background: "linear-gradient(135deg, #FF6D92 0%, #c84070 50%, #E6AF2E 100%)",
            boxShadow: "0 20px 60px rgba(255,109,146,0.3)",
          }}
        >
          {/* Stars overlay shimmer */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url('/dd.png')", backgroundSize: "cover" }} />

          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3">
              Book a Free Trial Class! 🌟
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
              Let your child experience the magic of KidzStar for a day — completely free!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:9321002881"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl
                  bg-white text-[#FF6D92] font-bold text-sm
                  hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
              >
                <PhoneIcon /> Call Now
              </a>
              <a
                href="/admission"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl
                  bg-white/20 border-2 border-white/50 text-white font-bold text-sm
                  hover:bg-white/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Apply Online <ChevronsRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}

// ── Helper sub-component ──────────────────────────────────────────────────
function ContactCard({ item }) {
  return (
    <>
      <div className="w-12 h-12 rounded-xl bg-[#FF6D92]/15 border border-[#FF6D92]/30
        flex items-center justify-center text-[#FF6D92] mb-4
        group-hover:bg-[#FF6D92]/25 transition-all duration-300">
        {item.icon}
      </div>
      <p className="text-[#FF6D92] text-xs font-bold uppercase tracking-widest mb-1">
        {item.label}
      </p>
      <p className="text-white text-sm font-medium leading-relaxed whitespace-pre-line break-all">
        {item.value}
      </p>
    </>
  );
}
