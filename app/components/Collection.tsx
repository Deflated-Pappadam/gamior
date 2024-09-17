import Image from "next/image";
import React from "react";

function Collection() {
  const items = [
    { src: "/item.jpg", alt: "Side table with blue rabbit sculpture", name: "Bedroom" },
    { src: "/item.jpg", alt: "Dining area with round table and chairs", name: "Wadrobe" },
    { src: "/item.jpg", alt: "Close-up of blue chairs and rug", name: "Balcony" },
    {
      src: "/item.jpg",
      alt: "Bedroom interior with bed and circular wall art",
      name: "Bathroom"
    },
    { src: "/item.jpg", alt: "Close-up of table corner with blue item", name: "Kitchen" },
    {
      src: "/item.jpg",
      alt: "Bedroom interior with bed and circular wall art",
      name: "Dining"
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col md:flex-wrap md:flex-row items-center justify-center gap-8 md:gap-12">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative w-[90%] md:w-[25%] overflow-hidden  backdrop-brightness-50 backdrop-filter transition-all duration-700`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={500}
              layout="responsive"
              className="h-auto  brightness-75 transition-all delay-75 duration-[2000ms] hover:scale-[110%] hover:brightness-90 "
            />
            <h1 className="cabin-light absolute bottom-5 right-5 border-[1px] border-black bg-black px-4 py-2  uppercase leading-loose tracking-widest text-white transition-all duration-500 hover:bg-white hover:text-black">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
      <a href="/collections" className="w-fit cabin-light m-5 border-[1px] border-black hover:bg-black px-4  py-2 uppercase leading-loose tracking-widest hover:text-white transition-all duration-500 bg-white text-black">
        View All
      </a>
    </div>
  );
}

export default Collection;
