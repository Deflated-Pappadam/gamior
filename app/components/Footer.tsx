import React from "react";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <div className="mx-auto w-full border-0 border-t-[1px] border-gray-300 px-4  py-8 text-black md:py-12 cabin-light">
    <div className="w-[70%] mx-auto">
    <div className=" grid w-full grid-cols-1 gap-8 md:grid-cols-3">
        {/* Offline Store Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase">Physical Stores</h3>
          <a href="" className="border-b border-black text-sm">Locate Store</a>
        </div>

        {/* Get To Know Us Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase">About Gamior</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                News
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Care Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium uppercase">Support</h3>
          <div className="space-y-2 text-sm">
            <p>Hours: 9 AM - 8 PM (Mon - Sun)</p>
            <p>
              Support:{" "}
              <a href="tel:+919876543210" className="hover:underline">
                +91 9876543210
              </a>
            </p>
            <p>
              Instagram:{" "}
              <a href="https://instagram.com/gamior_germaninterio" className="hover:underline">
                @gamior_germaninterio
              </a>
            </p>
          </div>
        </div>
      </div>

     
      {/* Social Links */}
      <div className="mt-8 flex space-x-4">
        <a href="https://instagram.com/gamior_germaninterio" className="hover:opacity-80">
          <Instagram className="h-5 w-5" />
        </a>
        <a href="#" className="hover:opacity-80">
          <Facebook className="h-5 w-5" />
        </a>
        <a href="#" className="hover:opacity-80">
          <Youtube className="h-5 w-5" />
        </a>
        <a href="#" className="hover:opacity-80">
          <Twitter className="h-5 w-5" />
        </a>
        <a href="#" className="hover:opacity-80">
          <Linkedin className="h-5 w-5" />
        </a>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm">
        <p>© 2024 GAMIOR</p>
        <p className="pt-2">Crafted by<a href="mailto:deflatedpappadam@gmail.com" className="hover:text-blue-400 transition-all">`Deflated Pappadam</a> `</p>
      </div>
    </div>
    </div>
  );
};

export default Footer;