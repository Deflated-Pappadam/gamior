"use client";
import React from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCreative
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
import Image from "next/image";

function Carousal() {
  return (
    <Swiper
      autoplay={true}
      loop={true}
      speed={1000}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ["-20%", 0, -1],
          opacity: 0.5
        },
        next: {
          shadow: true,
          translate: ["20%", 0, -1],
          opacity: 0.5,
          scale: 0.9
        }
      }}
      className="mySwiper max-h-[86vh]"
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, Navigation, EffectCreative]}
    >
      <SwiperSlide className="relative">
        <Image
          alt=""
          src={`/carousal.jpg`}
          width={1080}
          height={1080}
          className="w-full  "
        />
        <div className="to-tranparent absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da]" />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt=""
          src={`/carousal2.jpg`}
          width={1080}
          height={1080}
          className="w-full  "
        />
        <div className="to-tranparent absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da]" />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt=""
          src={`/carousal.jpg`}
          width={1080}
          height={1080}
          className="w-full  "
        />
        <div className="to-tranparent absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da]" />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          alt=""
          src={`/carousal2.jpg`}
          width={1080}
          height={1080}
          className="w-full  "
        />
        <div className="to-tranparent absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[#131313da]" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Carousal;
