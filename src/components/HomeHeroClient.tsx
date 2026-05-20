'use client';

import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

interface HomeHeroClientProps {
  totalPrompts: number;
  totalModels: number;
}

export default function HomeHeroClient({ totalPrompts, totalModels }: HomeHeroClientProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 min-h-[600px] flex items-center">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-grid-pattern"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight">
              AI Image Prompts
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              Get {totalPrompts}+ premium prompts optimized for {totalModels} AI models. Create stunning visuals in
              seconds.
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                const query = new FormData(e.currentTarget).get('query');
                window.location.href = `/search?q=${query}`;
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  name="query"
                  placeholder="Search {totalPrompts}+ prompts..."
                  className="w-full px-6 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700/50 rounded-lg transition"
                >
                  <FiSearch className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-6 pt-8"
          >
            <StatCard number={totalPrompts} label="Prompts" />
            <StatCard number={totalModels} label="AI Models" />
            <StatCard number="50K+" label="Active Users" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/prompts"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              Explore Prompts →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ===== STAT CARD =====
function StatCard({ number, label }: { number: string | number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl font-black text-blue-400 mb-2"
      >
        {number}
      </motion.div>
      <div className="text-sm text-slate-400">{label}</div>
    </motion.div>
  );
}
