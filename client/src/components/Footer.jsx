import React, { useState } from "react";
import Logo from "../assets/logo.png";
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
      <div className="container mx-auto px-6 py-14 " style={{ borderColor: "var(--color-border)" }}>
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* BRAND */}
          <div>
            <div className="flex items-center mb-4">
              <img src={Logo} alt="Logo" className="h-12 w-auto mr-2" />
              <span
                className="text-xl font-bold"
                style={{ color: "var(--color-text)" }}
              >
                FindHere
              </span>
            </div>

            <p className="text-sm text-[var(--color-muted)]">
              Discover amazing places through real reviews, photos, and experiences from our community.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
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
            <ul className="space-y-2 text-sm">
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

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center border border-[var(--color-border)] rounded-md overflow-hidden">
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
                className="w-full py-2 rounded-md text-white flex items-center justify-center gap-2"
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
          className="border-t mt-10 p-6 flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        >
          {/* COPYRIGHT */}
          <p className="text-sm text-[var(--color-muted)]">
            © {new Date().getFullYear()} FindHere. All rights reserved.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank">
              <FaFacebook className="hover:text-[var(--color-primary)]" />
            </a>
            <a href="https://twitter.com" target="_blank">
              <FaTwitter className="hover:text-[var(--color-primary)]" />
            </a>
            <a href="https://instagram.com" target="_blank">
              <FaInstagram className="hover:text-[var(--color-primary)]" />
            </a>
          </div>

          {/* LEGAL */}
          <div className="flex gap-4 text-sm mt-4 md:mt-0 text-[var(--color-muted)]">
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