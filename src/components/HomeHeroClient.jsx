"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import StatsCounter from "./StatsCounter";

export default function HomeHeroClient({ totalPrompts = 0, totalAiTools = 0 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      window.location.href = `/prompts?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = "/prompts";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Mock sample images for mosaic background
  const sampleImages = [
    "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p001.webp",
    "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p002.webp",
    "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p003.webp",
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Animated gradient background with mosaic images */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 z-0" />

      {/* Decorative blur elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <div className="space-y-12 text-center">
          {/* Headline with gradient accent */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight">
              AI Photo Prompts <br className="hidden sm:block" />
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                Made Simple
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover {totalPrompts}+ professionally crafted prompts for every AI art tool.
              <br className="hidden sm:block" />
              Copy. Customize. Create stunning visuals instantly.
            </p>
          </div>

          {/* Large search bar with keyboard shortcut hint */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-1">
                <div className="flex items-center gap-3 px-6 py-4">
                  <FiSearch className="w-6 h-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by style, mood, or AI model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-w-0 w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base sm:text-lg"
                  />
                  <kbd className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <span>⌘</span>
                    <span>K</span>
                  </kbd>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleSearch()}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
            >
              Browse All Prompts
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 -z-10" />
            </button>
            <Link
              href="/categories"
              className="group px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold text-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 hover:border-slate-400 dark:hover:border-slate-500"
            >
              Explore Categories
              <span className="block text-xs text-slate-600 dark:text-slate-400 mt-1">
                Browse by AI tool
              </span>
            </Link>
          </div>

          {/* Animated stats */}
          <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 font-semibold">
              Trusted by creative professionals worldwide
            </p>
            <StatsCounter 
              totalPrompts={totalPrompts}
              totalAiTools={totalAiTools}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
