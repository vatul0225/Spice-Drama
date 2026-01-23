import React from "react";
import { assets } from "../../assets/assets";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <hr className="mt-16 mx-4 sm:mx-10 lg:mx-30" />

      <footer className="bg-gray-900 text-white">
        {/* Main Footer Content */}
        <div
          className="mx-8 sm:mx-10 lg:mx-30 py-16 grid gap-12 
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Left Section */}
          <div>
            <img className="h-20 w-auto mb-4" src={assets.logo} alt="logo" />

            <p className="text-gray-300 text-sm leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis, sapiente non quod porro iure aperiam.
            </p>

            <div className="flex gap-4 mt-6">
              <FaInstagram className="text-3xl cursor-pointer hover:text-pink-400 transition" />
              <FaFacebook className="text-3xl cursor-pointer hover:text-blue-400 transition" />
              <FaLinkedin className="text-3xl cursor-pointer hover:text-blue-500 transition" />
            </div>
          </div>

          {/* Middle Section */}
          <div>
            <h1 className="text-xl font-bold mb-4">Company</h1>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="cursor-pointer hover:text-white">Home</li>
              <li className="cursor-pointer hover:text-white">About us</li>
              <li className="cursor-pointer hover:text-white">Delivery</li>
              <li className="cursor-pointer hover:text-white">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h1 className="text-xl font-bold mb-4">Get In Touch</h1>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex gap-3 items-start">
                <FaLocationDot className="text-red-500 text-lg mt-1" />
                <span>
                  Spice Drama Restaurant, Akash Nagar, Ghaziabad, 201015
                </span>
              </li>

              <li className="flex gap-3 items-center">
                <FaPhone className="text-blue-400 text-lg" />
                <span>+91 9648310225</span>
              </li>

              <li className="flex gap-3 items-center">
                <FaEnvelope className="text-amber-50 text-lg" />
                <span>atulverma@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="mx-4 sm:mx-10 lg:mx-30" />

        <p className="text-center text-gray-300 text-sm py-4 px-4">
          © 2025 spice-drama.com — All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
