import Image from 'next/image'
import React from 'react'

function Navbar() {
  return (
    <div className="flex w-full justify-between text-black items-center  py-5 px-16 bg-[#FFFFFF4D] z-10 ">
      <Image src="/logo.png" width={150} height={50} alt="" />
      <div className="flex gap-4 2 text-sm justify-between items-center">
        <div className="w-fit h-fit border-black border-2 rounded-full px-4 py-2 hover:border-[#0799B6] transition-all">Home</div>
        <div className="w-fit h-fit border-black border-2 rounded-full px-4 py-2 hover:border-[#0799B6] transition-all">Offers</div>
        <div className="w-fit h-fit border-black border-2 rounded-full px-4 py-2 hover:border-[#0799B6] transition-all">About</div>
        <div className="w-fit h-fit  rounded-full px-8 py-3 text-white hover:border-[#0799B6] transition-all bg-gradient-to-r from-[#0799B6] to-[#09DDDD]">Contact</div>
      </div>
    </div>
  )
}
 
export default Navbar