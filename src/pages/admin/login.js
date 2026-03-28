import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Mail, Lock, ShieldCheck, AlertCircle, Home, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

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

export default function AdminLogin() {
  const router = useRouter();
  const { status } = useSession();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [status, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Unauthorized access attempt. Credentials invalid.");
      setLoading(false);
    }
  };

  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5
  }));

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#030014] overflow-hidden relative ${poppins.className}`}>
      {/* ── Background Elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s) => <Star key={s.id} {...s} />)}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* ── Return to Home ── */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 z-50"
      >
        <Link 
          href="/"
          className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-full border border-white/10 backdrop-blur-md transition-all duration-300"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Exit to Home</span>
        </Link>
      </motion.div>

      {/* ── Main Login Card ── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[440px] px-4"
      >
        {/* Glow behind card */}
        <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10" />

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 overflow-hidden relative">
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#FFF005]/50 to-transparent" />

          {/* Header Section */}
          <div className="flex flex-col items-center mb-10 text-center">
            <motion.div 
              initial={{ rotate: -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mb-6 relative group"
            >
              <div className="absolute inset-0 bg-[#FFF005]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShieldCheck className="w-10 h-10 text-[#FFF005] drop-shadow-[0_0_10px_rgba(255,240,5,0.4)]" />
            </motion.div>
            
            <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-2">
              Admin <span className="text-[#FFF005]">Portal</span>
            </h2>
            <p className="text-white/40 text-sm font-medium tracking-wide">
              Secure Gateway for Kidzstar Systems
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-400 text-xs font-medium tracking-wide">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">
                Identifier (Email)
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#FFF005] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@kidzstar.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-[#FFF005]/50 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-2">
                Secret Key (Password)
              </label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#FFF005] transition-colors" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 focus:border-[#FFF005]/50 rounded-2xl pl-14 pr-6 py-4 text-white placeholder:text-white/10 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full relative group overflow-hidden bg-white text-black py-4 rounded-2xl font-bold transition-all mt-8"
            >
              <div className="absolute inset-0 bg-[#FFF005] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Engaging Core...</span>
                  </>
                ) : (
                  <>
                    <span>Initialize Portal</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Footer Decoration */}
          <div className="mt-10 pt-10 border-t border-white/5 flex justify-center">
            <p className="text-[10px] text-white/20 font-bold tracking-[0.3em] uppercase">
              ✨ Encrypted Protocol v2.6 ✨
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Dynamic Light Orbs ── */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, 50, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full -z-10"
      />
    </div>
  );
}
