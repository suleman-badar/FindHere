import React, { useState } from 'react';
import api from "../api/axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../assets/logoImg.png";
import { Home, Search, MapPin, Navigation, Compass } from 'lucide-react';

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleCloseResults = () => {
    setResults([]);
    setHasSearched(false);
  };

  async function handleSearch(e) {
    if (e?.preventDefault) e.preventDefault();

    if (!searchQuery.trim()) return;

    setHasSearched(true);

    try {
      const res = await api.get("/api/search", {
        params: {
          q: searchQuery,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      setResults(res.data);
      // console.log("Result is:", res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{
        fontFamily: 'Roboto, sans-serif',
        background: '#ffffff'
      }}
    >
      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'linear-gradient(135deg, #b91c1c, #ff7043)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: 'linear-gradient(45deg, #ff7043, #b91c1c)' }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-2xl opacity-5"
          style={{ background: 'linear-gradient(90deg, #b91c1c, #ff7043)' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-2xl w-full text-center">

        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #fff6f5, #ffffff)' }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #b91c1c, #ff7043)',
                  opacity: 0.1
                }}
              />
              <MapPin className="w-16 h-16 text-[#b91c1c] relative z-10" strokeWidth={1.5} />

              <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full border-2 border-[#e9e5e5] flex items-center justify-center shadow-lg animate-bounce">
                <Navigation className="w-5 h-5 text-[#ff7043]" />
              </div>

              <div
                className="absolute -bottom-2 -left-2 w-10 h-10 bg-white rounded-full border-2 border-[#e9e5e5] flex items-center justify-center shadow-lg"
                style={{ animationDelay: '0.2s' }}
              >
                <Compass className="w-5 h-5 text-[#b91c1c]" />
              </div>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-8xl md:text-9xl font-bold mb-2"
          style={{
            background: 'linear-gradient(90deg, #b91c1c, #ff7043)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-3">
          Oops! Page not found
        </h2>

        <p className="text-[#6b7280] text-base md:text-lg max-w-md mx-auto leading-relaxed mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280] w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for places..."
              className="w-full pl-12 pr-4 py-3.5 text-sm border-2 border-[#e9e5e5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-transparent transition-all bg-[#fff6f5] hover:border-[#b91c1c]"
            />
          </div>
        </form>

        {/* Results */}
        <div className="mt-4 py-4 w-full text-left relative">
          {hasSearched && results.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 py-4 scroll-smooth">
              <IconButton
                onClick={handleCloseResults}
                size="small"
                sx={{ position: "absolute", right: 15, top: -20, color: "var(--color-muted)" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {results.map((r) => (
                <div
                  key={r.id || r._id}
                  onClick={() => navigate(`/details/${r.id || r._id}`)}
                  className="p-3 rounded-lg border shadow-sm bg-gray-50 hover:bg-gray-100 transition w-[95%] mx-auto cursor-pointer"
                >
                  <h5 className="text-sm font-medium text-gray-900">
                    {r.name}
                  </h5>

                  {r.tags?.length > 0 ? (
                    <p className="text-xs text-gray-500">{r.tags.join(", ")}</p>
                  ) : r.tagline ? (
                    <p className="text-xs text-gray-500">{r.tagline}</p>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {hasSearched && results.length === 0 && (
            <p className="text-sm text-gray-500 mt-2 ml-4">
              No results available
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href="/"
            className="w-full sm:w-auto group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #b91c1c, #ff7043)' }} />
            <div className="relative px-8 py-3.5 flex items-center justify-center space-x-2 text-white font-medium">
              <Home className="w-5 h-5" />
              <span>Go Home</span>
            </div>
          </a>
        </div>

        {/* Links + Logo */}
        <div className="text-center">
          <p className="text-[#6b7280] text-sm mb-4">
            Maybe these will help you find your way:
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {['Home', 'Listings', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-[#b91c1c] text-sm hover:text-[#9d1717] font-medium underline decoration-transparent hover:decoration-current transition-all"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <img src={Logo} className="h-16 w-auto" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}