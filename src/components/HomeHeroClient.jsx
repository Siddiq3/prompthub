"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

export default function HomeHeroClient() {
  const handleSearch = (query) => {
    if (query.trim()) {
      window.location.href = `/prompts?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = "/prompts";
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-8 text-center">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
              AI Photo Prompts <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Discover 100+ professionally crafted prompts for Midjourney, DALL·E, Flux, and Stable Diffusion.
              <br className="hidden sm:block" />
              Copy. Use. Create.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar
              onSubmit={handleSearch}
              buttonLabel="Search"
              placeholder="Search by style, subject, or AI model..."
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Link
              href="/prompts"
              className="px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-primary/90 transition-colors"
            >
              Browse All Prompts
            </Link>
            <Link
              href="/categories"
              className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Explore Categories
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Trusted by creative professionals
            </p>
            <div className="flex justify-center gap-8 flex-wrap text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">100+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Prompts</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">5</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">AI Platforms</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Free</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">To Use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
