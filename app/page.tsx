"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";

import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCreative
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
import { clashGrotesk } from "./lib/fonts";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full flex-col bg-white">
      <Navbar />

      <Swiper
        autoplay={true}
        loop={true}
        speed={1000}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            opacity: 0
          },
          next: {
            shadow: true,
            opacity: 0,
            scale: 80
          }
        }}
        className="mySwiper max-h-[86vh]"
        pagination={{ clickable: true }} // pagination enabled
        modules={[Autoplay, Pagination, Navigation, EffectFade, EffectCreative]}
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

      <div className="flex min-h-screen  w-full flex-col items-center  justify-center bg-[#efefef] ">
        <h2 className="cabin-light text-[16px] uppercase tracking-wider text-[#1c1c1c]">
          {" "}
          Exclusive Packages
        </h2>
        <h1 className="cabin-medium text-[26px] uppercase tracking-widest text-[#1c1c1c]">
          Onam Collection
        </h1>
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 px-10">
          <div className="grid gap-4">
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-full max-w-full rounded-lg object-fill"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
                fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center bg-white rounded-md relative">
              <Image
              fill
                className="h-auto max-w-full rounded-lg"
                src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
