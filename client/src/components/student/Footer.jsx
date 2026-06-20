import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">

        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" className="w-28 lg:w-32" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Empowering students with industry-ready skills. Join our community and start learning today.
          </p>
        </div>

        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-white mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
          </ul>
        </div>

        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center gap-2 pt-4">
            {/* ✅ FIXED: Added 'id' and 'name' attributes to resolve the browser warning */}
            <input 
              id="newsletter-email"
              name="subscriberEmail"
              className="border border-gray-500/30 bg-gray-800 text-white placeholder-gray-500 outline-none w-64 h-9 rounded px-3 text-sm focus:border-blue-500 transition" 
              type="email" 
              placeholder="Enter your email" 
            />
            <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all w-24 h-9 text-white rounded font-medium">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60 font-light">
        Copyright 2026 © bytecoder. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;