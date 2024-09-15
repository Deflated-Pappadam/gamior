"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import ItemCollection from "./components/ItemCollection";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";

import { clashGrotesk } from "./lib/fonts";
import "./styles.css";
import Carousal from "./components/Carousal";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full flex-col bg-white">
      <Navbar />

      <section id="home-carousal">
        <Carousal />
      </section>

      <section
        id="exclusive-collections"
        className="flex min-h-screen w-full flex-col items-center justify-center bg-[#efefef]"
      >
        <ItemCollection />
      </section>
    </main>
  );
}
