import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import qs from "qs";

import { MapPin, Search as SearchIcon } from "lucide-react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import FiltersDrawer from "./FiltersDrawer";

export default function Search() {
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const navigate = useNavigate();

  //  SAME LOGIC
  async function handleSubmit(e) {
    if (e?.preventDefault) e.preventDefault();
    setHasSearched(true);

    try {
      const res = await api.get("/api/search", {
        params: {
          q: value,
          location,
          ...filters,
        },
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });

      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  const handleApplyFilters = (selectedFilters, shouldSearch = true) => {
    setFilters(selectedFilters);
    if (shouldSearch) handleSubmit();
  };

  const handleCloseResults = useCallback(() => {
    setResults([]);
    setHasSearched(false);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleCloseResults();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleCloseResults]);

  return (
    <div className="relative w-full">

      {/*  NEW DESIGN SEARCH BAR */}
      <form
        onSubmit={handleSubmit}
        className="relative mb-6 rounded-2xl backdrop-blur-2xl border border-white/25 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 md:flex-[1.6]">
            <SearchIcon className="w-5 h-5 text-white/70" />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search restaurants, cafes, hotels…"
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="m-2 px-6 py-3 rounded-xl text-white bg-red-700 hover:bg-red-800 transition"
          >
            <SearchIcon className="w-4 h-4 inline mr-2" />
            Search
          </button>

          {/* Filters Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="m-2 px-4 py-3 rounded-xl text-white border border-white/30 hover:bg-white/10"
          >
            Filters
          </button>
        </div>
      </form>

      {/* 🔥 RESULTS (UNCHANGED LOGIC, NEW STYLE) */}
      {hasSearched && (
        <div className="relative">
          {results.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2 py-4 bg-white rounded-xl">
              
              <IconButton
                onClick={handleCloseResults}
                size="small"
                sx={{ position: "absolute", right: 10, top: 10 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {results.map((r) => (
                <div
                  key={r.id || r._id}
                  onClick={() => navigate(`/details/${r.id || r._id}`)}
                  className="p-3 rounded-lg border shadow-sm bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                >
                  <h5 className="text-sm font-medium text-gray-900">
                    {r.name}
                  </h5>

                  {r.tags?.length > 0 ? (
                    <p className="text-xs text-gray-500">
                      {r.tags.join(", ")}
                    </p>
                  ) : r.tagline ? (
                    <p className="text-xs text-gray-500">{r.tagline}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/70 mt-2">No results found</p>
          )}
        </div>
      )}

      {/* 🔥 FILTER DRAWER (UNCHANGED) */}
      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={handleApplyFilters}
        search={handleSubmit}
      />
    </div>
  );
}