"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBookmark, FaSearch } from "react-icons/fa";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ⌘K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.08)] bg-[#0B0E1A]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white font-clash font-bold text-lg">
                P
              </div>
              <span className="font-clash font-bold text-lg text-[#F0EBE3] hidden sm:block">PhotoPrompts</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/prompts" className="px-3 py-2 text-sm text-[#9CA3B8] hover:text-[#F0EBE3] transition">
                Prompts
              </Link>
              <Link href="/categories" className="px-3 py-2 text-sm text-[#9CA3B8] hover:text-[#F0EBE3] transition">
                Categories
              </Link>
              <Link href="/trending" className="px-3 py-2 text-sm text-[#9CA3B8] hover:text-[#F0EBE3] transition">
                Trending
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C2240] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] text-[#9CA3B8] hover:text-[#F0EBE3] text-sm transition"
              >
                <FaSearch className="w-4 h-4" />
                <span>Search</span>
                <span className="ml-2 text-[#5B6380] text-xs">⌘K</span>
              </button>

              <Link href="/saved" className="p-2 rounded-lg hover:bg-[#1C2240] text-[#9CA3B8] hover:text-[#F0EBE3] transition" title="Saved Prompts">
                <FaBookmark className="w-5 h-5" />
              </Link>

              <Link href="/submit" className="px-4 py-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition">
                Submit
              </Link>

              {/* Mobile search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-[#1C2240] text-[#9CA3B8] hover:text-[#F0EBE3] transition"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
