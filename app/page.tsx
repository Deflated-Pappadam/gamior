"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { clashGrotesk } from "./lib/fonts";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full flex-col bg-white">
      <Navbar />

      <Swiper
        autoplay={true}
        loop={true}
        className="mySwiper max-h-[90vh]"
        pagination={{ clickable: true }} // pagination enabled
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide className="relative">
          <Image
            alt=""
            src={`/carousal.jpg`}
            width={1080}
            height={1080}
            className="w-full  "
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da] to-tranparent" />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            src={`/carousal2.jpg`}
            width={1080}
            height={1080}
            className="w-full  "
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da] to-tranparent" />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            src={`/carousal.jpg`}
            width={1080}
            height={1080}
            className="w-full  "
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da] to-tranparent" />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt=""
            src={`/carousal2.jpg`}
            width={1080}
            height={1080}
            className="w-full  "
          />
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da] to-tranparent" />
        </SwiperSlide>
      </Swiper>

      <div className="flex h-20 min-h-screen w-full items-center  justify-center bg-gradient-to-r from-[#0799B6] to-[#09DDDD] ">
        <h1 className={`p-16 text-[5vw] leading-none tracking-normal ${clashGrotesk.className} `}>
        Elevate Your Living Space With The Finesse Of German Craftsmanship, Accessible To All Budget Ranges.
        </h1>
      </div>
    </main>
  );
}
