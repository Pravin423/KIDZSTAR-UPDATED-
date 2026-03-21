import { motion } from "framer-motion";

export default function Activities() {
    const cards = [
        {
            title: "Learning through play",
            desc: "We encourage our Early Childhood students to explore, investigate and play through activities chosen by them and supervised by adults.",
            img: "/teacher1.jpg",
            stat: "Cognitive Skills",
            themeColor: "#FF4081",
            themeGradAlt: "#d81b60",
            shadowHex: "255, 64, 129"
        },
        {
            title: "Outdoor Activities",
            desc: "Our campuses both feature large gardens with climbing frames, sandpits and a wide range of toys and equipment for children to play and enjoy together.",
            img: "/teacher2.jpg",
            stat: "Physical Development",
            themeColor: "#00BCD4",
            themeGradAlt: "#0097a7",
            shadowHex: "0, 188, 212"
        },
        {
            title: "Social Communication",
            desc: "We also meet families in advance of a child starting to find out as much as possible to make their transition into our school a happy and easy experience.",
            img: "/teacher3.jpg",
            stat: "Emotional Bonding",
            themeColor: "#E6AF2E",
            themeGradAlt: "#c69623",
            shadowHex: "230, 175, 46"
        }
    ];

    return (
        <div className="act-wrapper py-24 md:py-32 relative overflow-hidden">
            <div className="ambient-glow" />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="text-center mb-16 md:mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center gap-4 bg-white px-6 py-2 rounded-full shadow-sm border border-[#0D3697]/10"
                    >
                        <div className="w-2 h-2 rounded-full bg-[#FF4081] animate-pulse"></div>
                        <h3 className="text-[#0D3697] font-bold text-sm md:text-md uppercase tracking-[0.2em] font-montserrat">Our Focus</h3>
                        <div className="w-2 h-2 rounded-full bg-[#E6AF2E] animate-pulse"></div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#0D3697] font-extrabold text-4xl md:text-5xl lg:text-6xl font-montserrat leading-tight max-w-4xl mx-auto"
                    >
                        An engaging, happy and <br />
                        <span className="text-[#00BCD4]">stimulating</span> environment
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-10 md:gap-14">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="product-card group h-full flex flex-col"
                            style={{ '--card-shadow': `rgba(${card.shadowHex}, 0.15)` }}
                        >
                            <div className="image-container bg-[#fcfcfc] shrink-0">
                                <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex flex-col flex-1 px-4 mt-6">
                                <h1 className="text-[1.8rem] md:text-[2rem] font-extrabold tracking-tight leading-tight font-montserrat text-[#0D3697] group-hover:scale-[1.03] origin-left transition-transform duration-300">
                                    {card.title}
                                </h1>
                                
                                <p className="text-[1.15rem] font-extrabold py-4" style={{ color: card.themeColor }}>
                                    {card.stat}
                                </p>
                                
                                <p className="text-[1.05rem] font-medium leading-relaxed text-gray-500 pb-8 flex-1">
                                    {card.desc}
                                </p>
                                
                                <button 
                                    className="mt-auto px-8 py-4 text-[0.95rem] font-extrabold tracking-[1.5px] text-white rounded-[40px] transition-all duration-300 w-full md:w-max hover:-translate-y-1 hover:brightness-110 active:translate-y-px"
                                    style={{
                                        background: `linear-gradient(145deg, ${card.themeColor}, ${card.themeGradAlt})`,
                                        boxShadow: `0 8px 20px rgba(${card.shadowHex}, 0.35), inset 0 2px 6px rgba(255, 255, 255, 0.4)`
                                    }}
                                >LEARN MORE</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .act-wrapper {
                    background-color: #fbfcff;
                    font-family: 'Montserrat', sans-serif;
                }

                .ambient-glow {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                    background: radial-gradient(circle at 20% 25%, rgba(255, 64, 129, 0.06), transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 188, 212, 0.05), transparent 50%), radial-gradient(circle at 50% 100%, rgba(230, 175, 46, 0.05), transparent 60%);
                }
                
                .product-card {
                    border-radius: 3rem;
                    padding: 1rem 1rem 2.5rem 1rem;
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.8);
                    box-shadow: 0 30px 60px var(--card-shadow), 0 20px 40px rgba(13, 54, 151, 0.03), inset 0 2px 0 #ffffff;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
                }

                .product-card:hover {
                    transform: translateY(-10px);
                }

                .image-container {
                    position: relative;
                    border-radius: 2.5rem;
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    overflow: hidden;
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
                }

                .image-container img {
                    transition: transform 0.6s ease;
                }

                .product-card:hover .image-container img {
                    transform: scale(1.05);
                }

                @media (max-width: 768px) {
                    .product-card {
                        border-radius: 2rem;
                        padding: 0.8rem 0.8rem 1.5rem 0.8rem;
                    }
                    .image-container {
                        border-radius: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
