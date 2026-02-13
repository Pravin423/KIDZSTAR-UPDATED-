import React from "react";
import Image from "next/image";

const Details = () => {
    return (
        <div className="w-full h-[950px] bg-[#ACD8FA] flex items-center justify-center">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">

                <div className="flex justify-center">
                    <Image
                        src="/bino.png"
                        alt="kid"
                        width={200}
                        height={200}
                        className="object-contain"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src="/child1.png"
                        alt="kid"
                        width={272}
                        height={242}
                        className="object-contain"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src="/child2.png"
                        alt="kid"
                        width={272}
                        height={242}
                        className="object-contain"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src="/child3.png"
                        alt="kid"
                        width={272}
                        height={242}
                        className="object-contain"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src="/child4.png"
                        alt="kid"
                        width={272}
                        height={242}
                        className="object-contain"
                    />
                </div>


            </div>

        </div>
    );
};

export default Details
