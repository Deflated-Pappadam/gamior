"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const menuItems = [
    { label: 'HOME', hasSubmenu: false, link: '/' },
    { label: 'COLLECTIONS', hasSubmenu: true, link: '/collections' },
    { label: 'CATALOGUE', hasSubmenu: false, link: '/#trending' },
    { label: 'ABOUT US', hasSubmenu: false, link: '/#aboutus' },
    { label: 'CONTACT', hasSubmenu: false, link: '/#footer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 40) {
        setScrolled(true);
        setShowAnnouncement(false);
      } else {
        setScrolled(false);
        setShowAnnouncement(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000]">
      {/* Announcement Bar */}
      <div 
        className={`
          transition-all duration-300 ease-in-out 
          ${showAnnouncement ? 'h-10 opacity-100' : 'h-0 opacity-0 overflow-hidden'}
          bg-black
        `}
      >
        <div className="flex h-full items-center justify-center">
          <h1 className="uppercase tracking-widest text-white md:text-sm text-xs cabin-light">
            Christmas Sales are now live ⚡
          </h1>
        </div>
      </div>

      {/* Main Navbar */}
      <div 
        className={`
          transition-all duration-300 ease-in-out
          w-full bg-white
          ${scrolled ? 'shadow-md' : ''}
        `}
      >
        <div className="flex w-full items-center justify-between px-4 md:px-16 py-4">
          <a href="/" className="transition-opacity duration-200 hover:opacity-80">
            <Image src="/logo.png" width={100} height={50} alt="Logo" priority />
          </a>

          {/* Desktop Menu */}
          <div className="hidden items-center justify-between gap-8 text-[14px] md:flex">
            {menuItems.map((item) => (
              <MenuItem key={item.label} label={item.label} link={item.link} />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden text-black focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-white transition-transform duration-300 ease-in-out z-[1001]
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Image src="/logo.png" width={100} height={50} alt="Logo" priority />
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="text-black focus:outline-none p-2"
            aria-label="Close menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {menuItems.map((item) => (
            <a 
              key={item.label}
              href={item.link}
              onClick={() => setIsMenuOpen(false)}
              className="py-4 border-b flex justify-between items-center text-black hover:bg-gray-50 px-2 transition-colors duration-200"
            >
              <span>{item.label}</span>
              {item.hasSubmenu && <ChevronRight size={20} />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ label, link }: { label: string; link: string }) => (
  <a 
    href={link} 
    className="group relative inline-block hover:cursor-pointer"
  >
    <div className="font-sans uppercase tracking-wider text-[#1c1c1c] transition-all duration-200 hover:text-gray-600">
      {label}
    </div>
    <span className="absolute left-0 top-6 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
  </a>
);

export default Navbar;