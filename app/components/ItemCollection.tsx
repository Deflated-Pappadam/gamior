"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

// Optional: Move this CSS to a separate file or a global stylesheet
const masonryCss = `
.my-masonry-grid {
  display: flex;
  margin-left: -30px; /* gutter size offset */
  width: auto;
}
.my-masonry-grid_column {
  padding-left: 30px; /* gutter size */
  background-clip: padding-box;
}
.my-masonry-grid_column > div {
  margin-bottom: 30px;
}

/* Smooth scrolling for mobile */
.mobile-scroll {
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}
.mobile-scroll::-webkit-scrollbar { /* WebKit */
  width: 0;
  height: 0;
}
`;

const ItemCollection = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const items = [
    {
      src: "/item.jpg",
      alt: "Side table with blue rabbit sculpture",
      shape: "rounded-[20px] md:rounded-tr-[142px] md:rounded-bl-[195px]",
      name: "Blue Rabbit Side Table",
      cost: "299.99"
    },
    {
      src: "/item.jpg",
      alt: "Dining area with round table and chairs",
      shape: "rounded-[20px] md:rounded-tl-[115px] md:rounded-br-[163px]",
      name: "Modern Round Dining Set",
      cost: "799.99"
    },
    {
      src: "/item.jpg",
      alt: "Close-up of blue chairs and rug",
      shape: "rounded-[20px] md:rounded-tr-[178px] md:rounded-bl-[89px]",
      name: "Blue Accent Chair",
      cost: "249.99"
    },
    {
      src: "/item.jpg",
      alt: "Bedroom interior with bed and circular wall art",
      shape: "rounded-[20px] md:rounded-tl-[152px] md:rounded-br-[134px]",
      name: "Circular Wall Art Bedroom Set",
      cost: "1,299.99"
    },
    {
      src: "/item.jpg",
      alt: "Close-up of table corner with blue item",
      shape: "rounded-[20px] md:rounded-[180px]",
      name: "Blue Accent Table Decor",
      cost: "59.99"
    },
    {
      src: "/item.jpg",
      alt: "Bedroom interior with bed and circular wall art",
      shape: "rounded-[20px] md:rounded-tl-[140px] md:rounded-br-[110px]",
      name: "Minimalist Bedroom Set",
      cost: "1,499.99"
    },
    {
      src: "/item.jpg",
      alt: "Living room with a cozy sofa and lamp",
      shape: "rounded-[20px] md:rounded-tr-[105px] md:rounded-bl-[120px]",
      name: "Cozy Living Room Sofa Set",
      cost: "1,799.99"
    },
    {
      src: "/item.jpg",
      alt: "Modern kitchen with sleek countertops",
      shape: "rounded-[20px] md:rounded-tl-[170px] md:rounded-br-[150px]",
      name: "Sleek Modern Kitchen Suite",
      cost: "3,999.99"
    },
    {
      src: "/item.jpg",
      alt: "Outdoor patio with seating and plants",
      shape: "rounded-[20px] md:rounded-tr-[128px] md:rounded-bl-[97px]",
      name: "Outdoor Patio Oasis Set",
      cost: "2,499.99"
    }
  ];

  if (!hydrated) {
    return null; 
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#efefef] py-12 ">
      <style>{masonryCss}</style>
      <h2 className="cabin-light  text-[16px] uppercase tracking-wider text-[#1c1c1c]">
        Exclusive
      </h2>
      <h1 className="cabin-medium mb-8 text-[26px] uppercase tracking-widest text-[#1c1c1c]">
        Onam Packages
      </h1>
     <div className="w-full h-full md:flex hidden justify-center items-center">
     <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid w-full max-w-[90%] px-4 md:max-w-[80%] hidden overflow-hidden"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.shape} transition-all duration-700 hover:scale-[90%] hover:rounded-sm group`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={500}
              layout="responsive"
              className="h-auto w-full brightness-[0.75] group-hover:brightness-[0.5] transition-all  duration-[2000ms]"
            />
            <div className=" absolute top-0 w-full h-full flex flex-col justify-center items-center bg-black bg-transparent text-white text-center cabin-light uppercase p-2">
                <h3 className="text-xl font-light tracking-widest ">{item.name}</h3>
                <p className="text-base tracking-wider">&#x20b9; {item.cost}</p>
              </div>
          </div>
        ))}
      </Masonry>
     </div>
     <div className="w-full h-full flex md:hidden justify-start items-center mobile-scroll ">
      <div className="flex space-x-4 p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.shape} transition-all duration-700 hover:scale-[90%] rounded-[0px] flex-shrink-0`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={300}
              height={300}
              layout="fixed"
              className="h-[250px] w-[250px] object-cover"
            />
            <div className="  bg-black bg-transparent text-black text-center cabin-light uppercase p-2">
                <h3 className="text-base font-light tracking-widest ">{item.name}</h3>
                <p className="text-sm tracking-wider">&#x20b9; {item.cost}</p>
              </div>
          </div>
        ))}
        <div className="invisible min-w-[20px] ">.</div>
      </div>
     </div>

      <h2 className="cabin-light mb-2 max-w-[90%] text-center text-xs uppercase tracking-wider text-[#1c1c1c] md:max-w-[60%] md:text-[16px] md:p-5">
        From sleek minimalism to regal extravagance, we offer diverse expressions of
        aesthetics and  design, each capturing a unique essence and personal taste.
      </h2>
    </div>
  );
};

export default ItemCollection;