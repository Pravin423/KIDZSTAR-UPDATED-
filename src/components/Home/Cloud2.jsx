'use client';
import Image from 'next/image'
import React from 'react'


const Cloud = () => {

    return (

        <div className="w-screen overflow-hidden">
            <Image 
                src="/cloud4.png" 
                alt="Cloud" 
                width={1920} 
                height={300} 
                className="w-full h-auto min-w-full object-stretch"
            />
        </div>


    )
}

export default Cloud
