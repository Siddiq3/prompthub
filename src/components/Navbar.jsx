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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#2271b1] text-lg font-bold text-white">
                P
              </div>
              <span className="hidden text-xl font-bold tracking-tight text-slate-950 sm:block">PhotoPromptsHub</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/prompts" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2271b1] transition">
                Prompts
              </Link>
              <Link href="/categories" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2271b1] transition">
                Categories
              </Link>
              <Link href="/latest" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2271b1] transition">
                Latest
              </Link>
              <Link href="/trending" className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#2271b1] transition">
                Trending
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-700 transition hover:border-[#2271b1] hover:bg-white hover:text-[#2271b1] md:flex"
              >
                <FaSearch className="w-4 h-4" />
                <span>Search</span>
                <span className="ml-2 text-xs text-slate-400">⌘K</span>
              </button>

              <Link href="/saved" className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 hover:text-[#2271b1]" title="Saved Prompts">
                <FaBookmark className="w-5 h-5" />
              </Link>

              <Link href="/prompts" className="hidden rounded-md bg-[#2271b1] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#135e96] sm:block">
                Browse
              </Link>

              {/* Mobile search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
              >
                <FaSearch className="w-5 h-5" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-md p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
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
            <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
              <Link
                href="/prompts"
                className="block rounded px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2271b1]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prompts
              </Link>
              <Link
                href="/categories"
                className="block rounded px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2271b1]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/latest"
                className="block rounded px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2271b1]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Latest
              </Link>
              <Link
                href="/trending"
                className="block rounded px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[#2271b1]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href="/prompts"
                className="mt-2 block rounded-md bg-[#2271b1] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#135e96]"
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
