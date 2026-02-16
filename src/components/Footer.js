import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between items-end bg-[#000E30] bg-[url('/dd.png')] bg-repeat-space bg-cover h-[804px] bg-center ">

        {/* Earth (bottom left) */}
        <Image
          src="/earthhalf.png"   // your earth image
          alt="earth"
          width={576}
          height={567}
          className="object-contain   "
        />

        <Image src="/yellowsvg.png"  className='mr-[20px] '  width={695}  height={471}  />

      </div>
      

    </div>
  )
}

export default Footer
