import React from "react";
import Logo from "../assets/logo.png";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-indigo-950 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src={Logo} alt="Logo" className="h-12 w-auto mr-2" />
              <span className="text-xl font-bold text-white">FindHere</span>
            </div>
            <p className="text-sm">
              Discover amazing places through Google reviews and authentic user
              photos from our community of explorers.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/top-rated" className="hover:text-white">
                  Top Rated Places
                </Link>
              </li>
              <li>
                <Link to="/new-locations" className="hover:text-white">
                  New Locations
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/popular-cities" className="hover:text-white">
                  Popular Cities
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/upload" className="hover:text-white">
                  Upload Photos
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-white">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Call-to-Action */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Join Our Community
            </h4>
            <p className="text-sm mb-4">
              Connect with fellow foodies, explorers, and locals.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                to="/signup"
                className="bg-indigo-700 hover:bg-indigo-600 text-white text-center py-2 px-4 rounded-md"
              >
                Sign Up Today →
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 text-white text-center py-2 px-4 rounded-md"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">© 2025 FindHere. All rights reserved.</p>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebook size={20} />
            </a>
          </div>

          <div className="flex gap-4 text-sm mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
