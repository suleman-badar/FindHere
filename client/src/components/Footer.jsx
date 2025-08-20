import React from "react";
import Logo from "../assets/logo.png"

import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-950 text-white">
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Join Communities You Love
        </h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto">
          Connect with fellow foodies, explorers, and locals. Share experiences,
          discover hidden gems. Your next adventure is just a community away.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-2">25K+</h3>
            <p className="text-xl mb-4">Active Members</p>
            <p className="text-sm">
              A vibrant community where ideas spark, collabs happen, and
              connections turn into opportunities. Learn, share, and vibe with
              people who get you.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-2">1M+</h3>
            <p className="text-xl mb-4">Photos Shared</p>
            <p className="text-sm">
              From stunning landscapes to everyday moments — explore a million
              stories captured and shared by our community.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-lg text-center">
            <h3 className="text-3xl font-bold mb-2">150+</h3>
            <p className="text-xl mb-4">Cities Covered</p>
            <p className="text-sm">
              Connecting people and places across 150+ cities, delivering
              trusted information wherever you go.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Link
            to="/signup"
            className="bg-[#082567] text-white px-6 py-2 rounded-md hover:bg-[#0A2C73]"
          >
            Sign Up Today →
          </Link>
          <Link
            to="/about"
            className="bg-white/10 text-white px-6 py-2 rounded-md hover:bg-white/20"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center mb-4">
                <img src={Logo} alt="Logo"
                  style={{
                    height: 70,
                    width: "auto",

                  }}></img>
                <span className="text-xl font-bold">FindHere</span>
              </div>
              <p className="text-sm text-gray-300">
                Discover amazing places through Google reviews and authentic
                user photos from our community of location explorers.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/top-rated" className="hover:text-gray-300">
                    Top Rated Places
                  </Link>
                </li>
                <li>
                  <Link to="/new-locations" className="hover:text-gray-300">
                    New Locations
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-gray-300">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/popular-cities" className="hover:text-gray-300">
                    Popular Cities
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/upload" className="hover:text-gray-300">
                    Upload Photos
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-gray-300">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/guidelines" className="hover:text-gray-300">
                    Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-gray-300">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-300 mb-4 md:mb-0">
                © 2025 FindHere. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  <FaFacebook size={20} />
                </a>
              </div>
              <div className="flex gap-4 text-sm text-gray-300 mt-4 md:mt-0">
                <Link to="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
                <span>|</span>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
