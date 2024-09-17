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
      shape: "rounded-[20px] md:rounded-tr-[142px] md:rounded-bl-[195px]"
    },
    {
      src: "/item.jpg",
      alt: "Dining area with round table and chairs",
      shape: "rounded-[20px] md:rounded-tl-[115px] md:rounded-br-[163px]"
    },
    {
      src: "/item.jpg",
      alt: "Close-up of blue chairs and rug",
      shape: "rounded-[20px] md:rounded-tr-[178px] md:rounded-bl-[89px]"
    },
    {
      src: "/item.jpg",
      alt: "Bedroom interior with bed and circular wall art",
      shape: "rounded-[20px] md:rounded-tl-[152px] md:rounded-br-[134px]"
    },
    {
      src: "/item.jpg",
      alt: "Close-up of table corner with blue item",
      shape: "rounded-[20px] md:rounded-[180px]"
    },
    {
      src: "/item.jpg",
      alt: "Bedroom interior with bed and circular wall art",
      shape: "rounded-[20px] md:rounded-tl-[140px] md:rounded-br-[110px]"
    },
    {
      src: "/item.jpg",
      alt: "Living room with a cozy sofa and lamp",
      shape: "rounded-[20px] md:rounded-tr-[105px] md:rounded-bl-[120px]"
    },
    {
      src: "/item.jpg",
      alt: "Modern kitchen with sleek countertops",
      shape: "rounded-[20px] md:rounded-tl-[170px] md:rounded-br-[150px]"
    },
    {
      src: "/item.jpg",
      alt: "Outdoor patio with seating and plants",
      shape: "rounded-[20px] md:rounded-tr-[128px] md:rounded-bl-[97px]"
    }
  ];

  if (!hydrated) {
    return null; // Ensure component only renders on the client-side
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#efefef] py-12">
      <style>{masonryCss}</style>
      <h2 className="cabin-light mb-2 text-[16px] uppercase tracking-wider text-[#1c1c1c]">
        Exclusive
      </h2>
      <h1 className="cabin-medium mb-8 text-[26px] uppercase tracking-widest text-[#1c1c1c]">
        Onam Packages
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid w-full max-w-[90%] px-4 md:max-w-[80%]"
        columnClassName="my-masonry-grid_column"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${item.shape} transition-all duration-700 hover:scale-[90%] hover:rounded-sm`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={500}
              height={500}
              layout="responsive"
              className="h-auto w-full"
            />
          </div>
        ))}
      </Masonry>

      <h2 className="cabin-light mb-2 max-w-[90%] text-center text-xs uppercase tracking-wider text-[#1c1c1c] md:max-w-[60%] md:text-[16px]">
        From sleek minimalism to regal extravagance, we offer diverse expressions of
        aesthetics and design, each capturing a unique essence and personal taste.
      </h2>
    </div>
  );
};

export default ItemCollection;
