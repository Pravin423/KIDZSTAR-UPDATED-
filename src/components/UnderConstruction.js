import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UnderConstruction({ pageTitle = "This Page" }) {
    return (
        <div className="min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-[#FFFAF5] font-montserrat p-6">
            {/* Animated Ambient Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4081] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00BCD4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-[#E6AF2E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
                {/* Left: 404 Caveman Animation */}
                <div className="caveman-wrapper flex-shrink-0 w-full md:w-[500px]">
                    <div className="text-404"><p>404</p></div>
                    <div className="caveman-container">
                        {/* caveman left */}
                        <div className="caveman">
                            <div className="leg">
                                <div className="foot"><div className="fingers"></div></div>
                            </div>
                            <div className="leg">
                                <div className="foot"><div className="fingers"></div></div>
                            </div>
                            <div className="caveman-shape">
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                            <div className="caveman-head">
                                <div className="eye"><div className="nose"></div></div>
                                <div className="mouth"></div>
                            </div>
                            <div className="arm-right"><div className="club"></div></div>
                        </div>
                        {/* caveman right */}
                        <div className="caveman">
                            <div className="leg">
                                <div className="foot"><div className="fingers"></div></div>
                            </div>
                            <div className="leg">
                                <div className="foot"><div className="fingers"></div></div>
                            </div>
                            <div className="caveman-shape">
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                            <div className="caveman-head">
                                <div className="eye"><div className="nose"></div></div>
                                <div className="mouth"></div>
                            </div>
                            <div className="arm-right"><div className="club"></div></div>
                        </div>
                    </div>
                </div>

                {/* Right: Text Box */}
                <div className="flex-1 bg-white/70 backdrop-blur-xl border-2 border-white rounded-[3rem] p-10 md:p-14 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden text-left">
                    {/* Inner glowing edge */}
                    <div className="absolute inset-0 rounded-[3rem] border border-white/50 pointer-events-none"></div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D3697] leading-tight mb-6 font-montserrat"
                    >
                        Building Something <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4081] to-[#00BCD4]">
                            Magical!
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-[#5a6b90] text-lg md:text-xl font-medium leading-relaxed mb-10"
                    >
                        Oops! It looks like <strong className="text-[#0D3697]">{pageTitle}</strong> is currently getting a fresh coat of paint and some extra sprinkles. Check back very soon!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <Link href="/">
                            <button className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF4081] hover:bg-[#d81b60] transition-colors duration-300 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform group">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                RETURN TO HOME
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
