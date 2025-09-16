import { assets } from "../assets/assets";

export default function Footer() {
  return (
    <footer className="bg-pink-50 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 ">
        {/* Logo + Text */}
        <div className="flex items-center space-x-2">
          <img
            src={assets.logo} // replace with your logo path
            alt="ImageZ Logo"
            className="w-25 h-25"
          />
          
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm mt-4 md:mt-0">
          Copyright 2025 @ AiCodinghub – All Right Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
                     <img src={assets.facebook_icon} alt="" width={35} />
                     <img src={assets.instagram_icon} alt="" width={35} />
                     <img src={assets.twitter_icon} alt="" width={35} />
        </div>
      </div>
    </footer>
  );
}
