import React from 'react';
import { Mail, Facebook, Instagram, Twitter, Star } from 'lucide-react';

function Footer() {
  return (
    <div className='w-full bg-[#1e1e1e] text-white py-12'>
      <div className='max-w-7xl mx-auto px-4'>
       

        {/* Features Section */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center'>
          {['WORLDWIDE DELIVERY', 'SATISFIED OR REFUNDED', 'TOP-NOTCH SUPPORT', 'SECURE PAYMENTS'].map((feature, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='bg-white p-3 rounded-full mb-3'>
                <Star className='w-6 h-6 text-black' />
              </div>
              <p className='text-sm'>{feature}</p>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className='flex md:flex-row flex-col items-center justify-between'>
          {/* <div>
            <h3 className='font-bold mb-4'>NEWSLETTER</h3>
            <p className='mb-4'>Sign up to our newsletter to receive exclusive offers.</p>
            <div className='flex'>
              <input
                type="email"
                placeholder="E-mail"
                className='flex-grow bg-transparent border border-gray-600 py-2 px-4 focus:outline-none'
              />
              <button className='bg-black text-white py-2 px-6 ml-2 hover:bg-gray-800'>
                SUBSCRIBE
              </button>
            </div>
          </div> */}
          <div className='md:flex hidden flex-col'>
            <h3 className='font-bold mb-4'>FOOTER MENU</h3>
            <ul className=''>
              {["home","collection","exclusive","socials"].map((item, index) => (
                <li key={index} className='mb-2'>
                  <a href="#" className='hover:underline'>{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className='max-w-[250px]'>
            <h3 className='font-bold mb-4 '>ABOUT</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet doloremque rerum laborum optio quidem voluptatum ad rem, illo repellendus cupiditate perspiciatis dicta aperiam similique nesciunt. Alias aspernatur aperiam itaque amet.</p>
          </div>
        </div>

        {/* Social Links and Country Selector */}
        <div className='flex justify-between items-center mt-12 pt-8 border-t border-gray-700'>
          <div className='flex space-x-4'>
            <Facebook className='w-6 h-6' />
            <Instagram className='w-6 h-6' />
            <Twitter className='w-6 h-6' />
           
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Footer;