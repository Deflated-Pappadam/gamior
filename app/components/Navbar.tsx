import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div>
      <div className="flex h-[4vh] w-full items-center  justify-center bg-[#1D1D1D] ">
        <h1 className="uppercase tracking-wide text-white">Onam Offers Available rn</h1>
      </div>
      <div className="z-10 flex w-full items-center justify-between  bg-[#FFFFFF4D] px-16 py-5 text-black ">
        <Image src="/logo.png" width={100} height={50} alt="" />
        <div className="hidden items-center justify-between gap-8 text-[14px] md:flex">
          <div className="group relative inline-block hover:cursor-pointer">
            <div className=" font-sans uppercase tracking-wider text-[#1c1c1c] transition-all">
              Home
            </div>
            <span className="absolute left-0 top-6 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </div>
          <div className="group relative inline-block hover:cursor-pointer">
            <div className=" font-sans uppercase tracking-wider text-[#1c1c1c] transition-all">
              Collections
            </div>
            <span className="absolute left-0 top-6 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </div>
          <div className="group relative inline-block hover:cursor-pointer">
            <div className=" font-sans uppercase tracking-wider text-[#1c1c1c] transition-all">
              Catalogue
            </div>
            <span className="absolute left-0 top-6 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </div>
          <div className="group relative inline-block hover:cursor-pointer">
            <div className=" font-sans uppercase tracking-wider text-[#1c1c1c] transition-all">
              About Us
            </div>
            <span className="absolute left-0 top-6 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </div>
          <div className="group relative inline-block hover:cursor-pointer">
            <div className=" font-sans uppercase tracking-wider text-[#1c1c1c] transition-all">
              Contact
            </div>
            <span className="absolute left-0 top-6 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
