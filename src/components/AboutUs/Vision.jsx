import React from 'react';
import Image from 'next/image';

const Vision = () => {
    return (
        <div className="relative z-20 w-full min-h-screen flex items-center bg-white text-black py-20 px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Left Side: Text */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                    <h2 className="text-4xl md:text-6xl font-bold font-alfa text-[#0D3697]">
                        OUR VISION
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed font-sans">
                        To ignite the spark of curiosity in every child, fostering a world where learning is a boundless adventure. We envision a future where every child is empowered to explore, create, and shine bright like a star in their own unique universe.
                    </p>
                    <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed font-sans">
                        We strive to create a nurturing environment that blends creative play with structured learning, ensuring that children not only get ready for school but for life.
                    </p>
                </div>

                {/* Right Side: Image */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                        <Image
                            src="/child1.png"
                            alt="Vision Child"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Vision;