"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

/**
 * HIGH-DOPAMINE HERO SECTION
 * 
 * Psychology triggers:
 * - Scarcity: "201+ Prompts" = limited resource
 * - Social proof: "Trusted by creators"
 * - Novelty: Rotating badges
 * - FOMO: Trending percentages
 */

export default function DopamineHeroSection({ totalPrompts = 0, totalAiTools = 0 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  const trendingBadges = [
    { text: "#ViralPhotography", trend: "340%" },
    { text: "#CinematicPortrait", trend: "285%" },
    { text: "#TrendingNow", trend: "412%" }
  ];

  // Auto-rotate badges every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBadgeIndex((prev) => (prev + 1) % trendingBadges.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/prompts?q=${encodeURIComponent(searchQuery)}`;
    } else {
      window.location.href = "/prompts";
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0" />

      {/* Premium animated blur elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />

      {/* Main hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="space-y-12 text-center">
          {/* ===== HEADLINE SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight">
              AI Photo Prompts
              <br />
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Made Simple
              </motion.span>
            </h1>

            {/* Dynamic stats headline */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white">
                Discover{" "}
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                >
                  {totalPrompts}+
                </motion.span>{" "}
                Prompts Ready to Copy
              </p>
            </motion.div>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Copy. Customize. Create stunning AI visuals instantly with professionally crafted prompts for Midjourney, DALL·E, Flux & more.
            </p>

            {/* Trending badges carousel */}
            <div className="flex justify-center gap-4 flex-wrap">
              {/* Static trusted badge */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur"
              >
                <span className="text-sm font-semibold text-slate-300">
                  👤 50K+ Creators Using
                </span>
              </motion.div>

              {/* Auto-rotating trending badge */}
              <motion.div
                key={currentBadgeIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="px-4 py-2 bg-gradient-to-r from-orange-600/30 to-red-600/30 border border-orange-500/50 rounded-full backdrop-blur"
              >
                <span className="text-sm font-semibold text-orange-300">
                  🔥 {trendingBadges[currentBadgeIndex].text} ↑ {trendingBadges[currentBadgeIndex].trend}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* ===== SEARCH BAR SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative group">
              {/* Glow background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Search input */}
              <div className="relative bg-slate-800/80 backdrop-blur border border-white/20 rounded-2xl p-1 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4">
                  <FiSearch className="w-6 h-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Try: 'cinematic portrait', 'product photography'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg"
                  />
                  <kbd className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 bg-slate-700/50 rounded-lg border border-slate-600">
                    <span>⌘</span>
                    <span>K</span>
                  </kbd>
                </div>

                {/* Gradient shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent rounded-2xl"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ opacity: 0.1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* ===== CTA BUTTONS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={handleSearch}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg overflow-hidden group"
            >
              <span className="relative z-10">Browse All Prompts</span>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: 0.2 }}
              />
            </motion.button>

            {/* Secondary CTA */}
            <motion.a
              href="/categories"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(15, 23, 42, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-slate-600 text-white rounded-xl font-bold text-lg hover:border-slate-500 transition-all duration-300 text-center"
            >
              Explore Categories
            </motion.a>
          </motion.div>

          {/* ===== STATS SECTION ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-12 border-t border-slate-700"
          >
            <p className="text-sm text-slate-400 mb-8 font-semibold uppercase tracking-wide">
              🚀 Trusted by creative professionals worldwide
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              {/* Prompts stat */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                >
                  {totalPrompts}+
                </motion.div>
                <p className="text-sm text-slate-400 mt-2">Prompts</p>
              </motion.div>

              {/* AI Tools stat */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                >
                  {totalAiTools}
                </motion.div>
                <p className="text-sm text-slate-400 mt-2">AI Tools</p>
              </motion.div>

              {/* Forever free stat */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                >
                  Free
                </motion.div>
                <p className="text-sm text-slate-400 mt-2">Forever</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
