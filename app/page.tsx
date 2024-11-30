"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import ItemCollection from "./components/ItemCollection";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-creative";
import "./styles.css";
import Carousal from "./components/Carousal";
import { CounterSection } from "./components/TrustedSection";
import Collection from "./components/Collection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full flex-col bg-[#efefef]">
      <Navbar />

      <section id="home-carousal">
        <Carousal />
      </section>

      <section
        id="exclusive-collections"
        className="flex  w-full flex-col items-center justify-center bg-[#efefef]"
      >
        <ItemCollection />
      </section>
      <section
        id="TrustedSection"
        className="flex w-full flex-col items-center justify-center bg-[#efefef]"
      >
        <CounterSection />
      </section>
      <section id="collection" className="">
        <Collection />
      </section>

      <Footer/>
    </main>
  );
}
