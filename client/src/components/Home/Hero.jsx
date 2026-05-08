import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { ImageWithFallback } from "../../../figma/ImageWithFallback";
import Search from "./Search";

const colors = {
  primary: "#b91c1c",
  accent: "#ff7043",
  star: "#fbbf24",
};

export default function Hero({onExploreClick, onCategoriesClick }) {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0f172a]">

      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1770827655834-94526fbcd83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
          alt="City skyline"
          className="w-full h-full object-cover scale-105"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-red-900/60 to-[#0f172a]/80" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Glow effects */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 bg-orange-400/40" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl opacity-30 bg-red-700/40" />
      </div>

      {/* 🎯 Floating UI */}
      <FloatingPin className="top-[18%] right-[12%]" delay="0s" label="4.9" />
      <FloatingPin className="top-[58%] right-[22%]" delay="1.2s" label="4.7" small />
      <FloatingPin className="top-[32%] right-[38%]" delay="2.4s" label="4.8" small />

      {/* 📦 Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-16 pb-24 max-w-7xl mx-auto">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border border-white/20 mb-8">
            <Sparkles className="w-4 h-4" style={{ color: colors.star }} />
            <span className="text-white/90 text-[13px]">
              Trusted by 2M+ explorers worldwide
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-white mb-6 text-[64px] font-bold leading-[1.02]">
            Discover
            <br />
            <span className="bg-gradient-to-r from-white via-orange-400 to-red-700 bg-clip-text text-transparent">
              Amazing Places
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-white/85 mb-3 text-[18px]">
            Find the best-rated locations based on real user experiences and trusted reviews.
          </p>

          <p className="text-white/60 mb-10 text-[14px]">
            Explore curated destinations near and far.
          </p>

          {/* 🔥 SEARCH (your logic injected here) */}
          <Search />

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
              className="px-7 py-4 rounded-full text-white bg-red-700 hover:bg-red-800 transition"
              onClick={onExploreClick}
            >
              Explore Now
              <ArrowRight className="w-4 h-4 inline ml-2" />
            </button>

            <button 
              className="px-7 py-4 rounded-full text-white border border-white/25 hover:bg-white/10"
              onClick={onCategoriesClick}
            >
              Browse Categories
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

/* Floating Pin */
function FloatingPin({ className = "", delay = "0s", label }) {
  return (
    <div
      className={`absolute z-[5] hidden lg:block ${className}`}
      style={{
        animation: "float-soft 6s ease-in-out infinite",
        animationDelay: delay,
      }}
    >
      <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-3 text-center">
        <MapPin className="w-4 h-4 text-white mx-auto" />
        <div className="text-white text-sm">{label}</div>
      </div>
    </div>
  );
}