import Image from "next/image";
import React from "react";

function Collection() {
  const items = [
    { src: "/collections/BATHROOM.jpg", alt: "Bathroom with modern fixtures", name: "BATHROOM" },
    { src: "/collections/BED WITH SIDE TABLE 1.jpg", alt: "Bedroom with bed and side table", name: "Bedroom" },
    { src: "/collections/Console table.jpg", alt: "Console table in hallway", name: "Console Table" },
    { src: "/collections/Dining room 2.jpg", alt: "Dining room setup with chairs and table", name: "Dining Room" },
    { src: "/collections/Kitchen 3.jpg", alt: "Kitchen area with counters and appliances", name: "Kitchen" },
    { src: "/collections/LIVING ROOM 4.png", alt: "Spacious living room with sofa and decor", name: "Living Room" },
    { src: "/collections/Partition.jpg", alt: "Partition wall with modern design", name: "Partition" },
    { src: "/collections/pooja unit 1.jpg", alt: "Pooja unit for worship space", name: "Pooja Unit" },
    { src: "/collections/TV unit 4.png", alt: "TV unit setup in living room", name: "TV Unit" },
    { src: "/collections/wardrobe.jpg", alt: "Modern wardrobe with storage space", name: "Wardrobe" },
    { src: "/collections/WASH COUNTER 2.jpg", alt: "Wash counter in bathroom area", name: "Wash Counter" }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative w-[90%] md:w-[25%] aspect-square overflow-hidden backdrop-brightness-50 backdrop-filter transition-all duration-700"
          >
            <Image
              src={item.src}
              alt={item.alt}
              layout="fill" // Ensures the image fills the container
              objectFit="cover" // Crops the image to fit the square
              className="brightness-75 transition-all delay-75 duration-[2000ms] hover:scale-[110%] hover:brightness-90"
            />
            <h1 className="cabin-light absolute bottom-5 right-5 border-[1px] border-black bg-black px-4 py-2 uppercase leading-loose tracking-widest text-white transition-all duration-500 hover:bg-white hover:text-black">
              {item.name}
            </h1>
          </div>
        ))}
      </div>
      <a href="/collections" className="w-fit cabin-light m-5 border-[1px] border-black hover:bg-black px-4 py-2 uppercase leading-loose tracking-widest hover:text-white transition-all duration-500 bg-white text-black">
        View All
      </a>
    </div>
  );
}

export default Collection;
