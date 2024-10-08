
import React, { useState, useEffect } from 'react';
import Image from "next/image";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";

import { clashGrotesk } from '../lib/fonts';


const useCounter = (end: number, duration = 2000) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        setCount(Math.floor(end * percentage));
        if (percentage < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }, [end, duration]);
  
    return count;
  };
  
 export const CounterSection = () => {
    const furnitureBrands = useCounter(100);
    const lightingBrands = useCounter(80);
    const furnishingBrands = useCounter(120);
  
    return (
      <section className="flex  gap-8 w-full justify-around py-16 bg-[#efefef] text-black">
        <div className="text-center">
          <h2 className={`${clashGrotesk.className} md:text-6xl text-3xl font-semibold`}>{furnitureBrands}+</h2>
          <p className="mt-2 md:text-lg text-sm">FURNITURE BRANDS</p>
        </div>
        <div className="text-center">
          <h2 className={`${clashGrotesk.className} md:text-6xl text-3xl font-semibold`}>{lightingBrands}+</h2>
          <p className="mt-2 md:text-lg text-sm">LIGHTING BRANDS</p>
        </div>
        <div className="text-center">
          <h2 className={`${clashGrotesk.className} md:text-6xl text-3xl font-semibold`}>{furnishingBrands}+</h2>
          <p className="mt-2 md:text-lg text-sm">FURNISHING BRANDS</p>
        </div>
      </section>
    );
  };