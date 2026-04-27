import React, { useState } from "react";
import Logo from "../assets/logoImg.png";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Mail, Send } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 2500);
  };

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
      }}
    >
      <div
        className="container mx-auto px-6 py-14 max-w-7xl"
        style={{ borderColor: "var(--color-border)" }}
      >
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left justify-items-center md:justify-items-start">
          
          {/* BRAND */}
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img src={Logo} className="h-16 w-auto mr-2 fill-[var(--color-primary)]" />
            </div>

            <p className="text-sm text-[var(--color-muted)] max-w-xs">
              Discover amazing places through real reviews, photos, and experiences from our community.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
              <li><Link className="hover:text-[var(--color-primary)]" to="/top-rated">Top Rated</Link></li>
              <li><Link className="hover:text-[var(--color-primary)]" to="/new-locations">New Places</Link></li>
              <li><Link className="hover:text-[var(--color-primary)]" to="/categories">Categories</Link></li>
              <li><Link className="hover:text-[var(--color-primary)]" to="/popular-cities">Cities</Link></li>
            </ul>
          </div>

          {/* COMMUNITY */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
              Community
            </h4>
            <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
              <li><Link className="hover:text-[var(--color-primary)]" to="/upload">Upload Photos</Link></li>
              <li><Link className="hover:text-[var(--color-primary)]" to="/dashboard">Dashboard</Link></li>
              <li><Link className="hover:text-[var(--color-primary)]" to="/guidelines">Guidelines</Link></li>
              <li><Link className="hover:text-[var(--color-primary)]" to="/support">Support</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
              Stay Updated
            </h4>

            <p className="text-sm text-[var(--color-muted)] mb-4">
              Get latest updates from FindHere.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="space-y-3 flex flex-col items-center md:items-start"
            >
              <div className="flex items-center border border-[var(--color-border)] rounded-md overflow-hidden w-full max-w-sm">
                <span className="px-3 text-[var(--color-muted)]">
                  <Mail size={16} />
                </span>

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-2 text-sm outline-none bg-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full max-w-sm py-2 rounded-md text-white flex items-center justify-center gap-2"
                style={{
                  background: "var(--gradient-primary)",
                }}
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        className="border-t mt-10 p-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        {/* COPYRIGHT */}
        <p className="text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} FindHere. All rights reserved.
        </p>

        {/* SOCIALS */}
        <div className="flex gap-5 justify-center md:justify-start">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook className="hover:text-[var(--color-primary)]" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter className="hover:text-[var(--color-primary)]" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram className="hover:text-[var(--color-primary)]" />
          </a>
        </div>

        {/* LEGAL */}
        <div className="flex gap-4 text-sm justify-center md:justify-start text-[var(--color-muted)]">
          <Link className="hover:text-[var(--color-primary)]" to="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-[var(--color-primary)]" to="/terms">
            Terms
          </Link>
          <Link className="hover:text-[var(--color-primary)]" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;