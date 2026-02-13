'use client';
import Image from 'next/image'
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Cloud = () => {
  const { scrollYProgress } = useScroll();
  
  // As user scrolls through the component, clouds move from their outer positions to meet in the middle
  const leftCloudX = useTransform(scrollYProgress, [0, 1], [-200, 40]);
  const rightCloudX = useTransform(scrollYProgress, [0, 1], [200, -40]);

  return (
    <div className='flex w-full relative h-[150px] md:h-[350px] overflow-hidden'>
        <motion.div 
            style={{ x: leftCloudX }}
            className="absolute left-0 w-3/5 h-full"
        >
            <Image src="/cloud2.png" alt="Cloud" fill className="object-cover" />
        </motion.div>
        <motion.div 
            style={{ x: rightCloudX }}
            className="absolute right-0 w-3/5 h-full"
        >
            <Image src="/cloud1st.png" alt="Cloud" fill className="object-cover" />
        </motion.div>
      
    </div>
  )
}

export default Cloud
