import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0); // keep first open by default

    const faqs = [
        {
            q: "What is a normal school day?",
            a: "A typical day includes a balance of structured learning, free play, outdoor activities, and meal times tailored to the age group. Our schedule is designed to keep children engaged while allowing time for rest and creativity."
        },
        {
            q: "What is the size of the classes?",
            a: "The size of our Pre-School classes is typically 14 to 17 students. This guarantees an excellent staff-to-student ratio, ensuring every child receives the attention they need to reach their full potential."
        },
        {
            q: "Who will teach my child?",
            a: "Our teachers are highly qualified early childhood educators who are passionate about nurturing young minds. Each classroom is staffed by a lead teacher and dedicated assistants to maintain our low staff-to-student ratios."
        },
        {
            q: "Are any meals provided for my child?",
            a: "Yes, we provide nutritious and balanced meals and snacks throughout the day, prepared daily in our on-site kitchen. We carefully cater to all dietary requirements and allergies to ensure every child eats safely."
        }
    ];

    return (
        <div className="bg-[#FFFAF5] py-32 relative overflow-hidden font-montserrat">
            {/* Decorative Stat Cards Row */}
            <div className="max-w-7xl mx-auto px-6 mb-32 hidden md:block">
                <div className="flex justify-between items-center gap-6">
                    <div className="border-dashed border-2 border-[#FF4081]/30 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/50 w-full h-40">
                        <div className="w-16 h-16 rounded-full bg-[#FF4081] flex items-center justify-center mb-2 shadow-lg shadow-[#FF4081]/20">
                            <span className="text-white text-2xl">📚</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-4xl text-[#0D3697]">15+</span>
                            <span className="text-[#FF4081] font-bold text-sm leading-tight text-center">Years of<br />experience</span>
                        </div>
                    </div>
                    <div className="border-dashed border-2 border-[#00BCD4]/30 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/50 w-full h-40">
                        <div className="w-16 h-16 rounded-full bg-[#00BCD4] flex items-center justify-center mb-2 shadow-lg shadow-[#00BCD4]/20">
                            <span className="text-white text-2xl">🎓</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-4xl text-[#0D3697]">8k+</span>
                            <span className="text-[#00BCD4] font-bold text-sm leading-tight text-center">Students<br />each year</span>
                        </div>
                    </div>
                    <div className="border-dashed border-2 border-[#8BC34A]/30 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/50 w-full h-40">
                        <div className="w-16 h-16 rounded-full bg-[#8BC34A] flex items-center justify-center mb-2 shadow-lg shadow-[#8BC34A]/20">
                            <span className="text-white text-2xl">👩‍🏫</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-4xl text-[#0D3697]">50+</span>
                            <span className="text-[#8BC34A] font-bold text-sm leading-tight text-center">Qualified<br />Teachers</span>
                        </div>
                    </div>
                    <div className="border-dashed border-2 border-[#FFEB3B]/50 rounded-3xl p-6 flex flex-col items-center justify-center bg-white/50 w-full h-40">
                        <div className="w-16 h-16 rounded-full bg-[#FFEB3B] flex items-center justify-center mb-2 shadow-lg shadow-[#FFEB3B]/20">
                            <span className="text-gray-800 text-2xl">🏆</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="font-extrabold text-4xl text-[#0D3697]">18+</span>
                            <span className="text-[#FFC107] font-bold text-sm leading-tight text-center">Award<br />Winning</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                {/* Left: FAQ Section */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-[#FF4081] font-bold text-xl uppercase tracking-wider">FAQ</h3>
                        <div className="w-12 h-0.5 bg-[#FF4081]"></div>
                    </div>

                    <h2 className="text-[#0D3697] font-extrabold text-5xl md:text-6xl mb-12 leading-tight">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`rounded-2xl border transition-all duration-300 ${openIndex === i
                                        ? "border-[#FF4081] bg-[#FF4081] shadow-lg shadow-[#FF4081]/20"
                                        : "border-gray-200 bg-white hover:border-[#FF4081]/50"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className={`font-bold text-lg ${openIndex === i ? "text-white" : "text-[#0D3697]"}`}>
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? "bg-white text-[#FF4081]" : "bg-[#FF4081] text-white"
                                        }`}>
                                        {openIndex === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-gray-100 bg-white bg-opacity-10 mt-2 text-sm md:text-base leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Decorative Image */}
                <div className="relative h-[600px] w-full hidden md:block">
                    {/* Abstract blob background */}
                    <div className="absolute inset-0 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-[#FF4081] rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#8BC34A] rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-4000"></div>

                    {/* The image (using a gallery placeholder, clip-path circle) */}
                    <div className="absolute inset-0 m-12 overflow-hidden" style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}>
                        <img src="/gallery/pg1.jpg" alt="Child playing" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
