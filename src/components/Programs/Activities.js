import { motion } from "framer-motion";

export default function Activities() {
    const cards = [
        {
            title: "Learning through play",
            desc: "We encourage our Early Childhood students to explore, investigate and play through activities chosen by them and activities initiated by an adult.",
            img: "/gallery/pg2.jpg", // placeholder from existing gallery
            color: "text-[#FF4081]"
        },
        {
            title: "Outdoor Activities",
            desc: "Our campuses both feature large gardens with climbing frames, sandpits and a wide range of toys and equipment for children to play and enjoy together.",
            img: "/gallery/pg3.jpg",
            color: "text-[#00BCD4]"
        },
        {
            title: "Social Communication",
            desc: "We also meet families in advance of a child starting to find out as much as possible make their transition into our school a happy and easy experience.",
            img: "/gallery/pg4.jpg",
            color: "text-[#8BC34A]"
        }
    ];

    return (
        <div className="bg-white py-32 relative overflow-hidden">
            {/* Decorative */}
            <img src="/cloud.png" alt="" className="absolute top-10 right-[15%] w-16 opacity-40 rotate-12" />
            <img src="/cloud.png" alt="" className="absolute top-20 left-[15%] w-20 opacity-30 -rotate-6" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20 space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <h3 className="text-[#FF4081] font-bold text-xl uppercase tracking-wider">Activities</h3>
                        <div className="w-12 h-0.5 bg-[#FF4081]"></div>
                    </div>
                    <h2 className="text-[#0D3697] font-extrabold text-5xl md:text-6xl font-montserrat leading-tight max-w-4xl mx-auto">
                        An engaging, happy and stimulating environment
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-10 flex-1 flex flex-col gap-4">
                                <h3 className={`font-extrabold text-2xl font-montserrat ${card.color}`}>
                                    {card.title}
                                </h3>
                                <p className="text-gray-500 text-lg leading-relaxed flex-1">
                                    {card.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
