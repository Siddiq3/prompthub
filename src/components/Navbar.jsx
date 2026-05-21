"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaBookmark, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ⌘K keyboard shortcut
  React.useEffect(() => {
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white font-clash font-bold text-lg">
                P
              </div>
              <span className="font-clash font-bold text-lg text-white hidden sm:block">PhotoPrompts</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/prompts" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
                Prompts
              </Link>
              <Link href="/categories" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
                Categories
              </Link>
              <Link href="/trending" className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition">
                Trending
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 text-sm transition"
              >
                <FaSearch className="w-4 h-4" />
                <span>Search</span>
                <span className="ml-2 text-slate-500 text-xs">⌘K</span>
              </button>

              <Link href="/saved" className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition" title="Saved Prompts">
                <FaBookmark className="w-5 h-5" />
              </Link>

              <Link href="/prompts" className="hidden sm:block px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-sm font-semibold transition">
                Browse
              </Link>

              {/* Mobile search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition"
              >
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-800 bg-slate-900 py-3 px-4">
              <Link
                href="/prompts"
                className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prompts
              </Link>
              <Link
                href="/categories"
                className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/trending"
                className="block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href="/prompts"
                className="block mt-2 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-sm font-semibold text-center transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Prompts
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

