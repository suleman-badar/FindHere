import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
  Film,
  Trees,
  Hotel,
  Music,
  Dumbbell,
} from "lucide-react";

export default function Category() {
  const scrollContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: "restaurants", name: "Restaurants", icon: UtensilsCrossed },
    { id: "coffee", name: "Coffee & Cafes", icon: Coffee },
    { id: "shopping", name: "Shopping", icon: ShoppingBag },
    { id: "entertainment", name: "Entertainment", icon: Film },
    { id: "outdoors", name: "Outdoors & Parks", icon: Trees },
    { id: "hotels", name: "Hotels & Stay", icon: Hotel },
    { id: "nightlife", name: "Nightlife", icon: Music },
    { id: "fitness", name: "Fitness & Wellness", icon: Dumbbell },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ESC key unselect handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCategory(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      className="w-full py-16 px-6"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-[#b91c1c] mb-2">
            Explore By Category
          </h2>
          <p className="text-xs md:text-sm text-[#6b7280] max-w-2xl mx-auto">
            Discover amazing places near you, from hidden gems to popular spots
          </p>
        </div>

        {/* Container */}
        <div className="relative">

          {/* Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fff6f5] to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fff6f5] to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-[#e9e5e5] rounded-full flex items-center justify-center text-[#6b7280] hover:text-[#b91c1c] hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-[#e9e5e5] rounded-full flex items-center justify-center text-[#6b7280] hover:text-[#b91c1c] hidden md:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Scroll Row */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-16  py-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0 cursor-pointer group"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div
                    className={`relative w-40 h-48 bg-white rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? "border-[#b91c1c] shadow-lg"
                        : "border-[#e9e5e5] shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-red-300"
                    }`}
                    style={{
                      background: isSelected ? "#fff6f5" : "#ffffff",
                    }}
                  >
                    {/* Active Bar */}
                    {isSelected && (
                      <div
                        className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                        style={{
                          background: "linear-gradient(180deg, #9d1717, #b91c1c)",
                        }}
                      />
                    )}

                    {/* ACTIVE BADGE */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#b91c1c] text-white text-[10px] px-2 py-0.5 rounded-full">
                        Active
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-col items-center justify-center h-full p-5">

                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                          isSelected
                            ? "bg-[#b91c1c] scale-110"
                            : "bg-[#fff6f5] group-hover:scale-110"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isSelected ? "text-white" : "text-[#6b7280]"
                          }`}
                        />
                      </div>

                      {/* Name */}
                      <h5
                        className={`text-center text-xs md:text-sm font-medium transition-colors ${
                          isSelected
                            ? "text-[#b91c1c]"
                            : "text-[#0f172a] group-hover:text-[#b91c1c]"
                        }`}
                      >
                        {category.name}
                      </h5>
                    </div>

                    {/* Glow */}
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                        isSelected ? "opacity-100" : ""
                      }`}
                      style={{
                        boxShadow: "0 0 18px rgba(185, 28, 28, 0.15)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}