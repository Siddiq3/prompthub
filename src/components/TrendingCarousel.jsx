"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ArrowRight } from "lucide-react";

/**
 * HIGH-DOPAMINE TRENDING CAROUSEL
 * 
 * Psychology triggers:
 * - Auto-rotation: Novelty every 4 seconds
 * - Manual swipe: User control
 * - Pulsing badges: Draws attention
 * - Progress dots: Visual progress feedback
 * 
 * Result: Continuous engagement loop without user clicking
 */

export default function TrendingCarousel({ prompts = [], title = "🔥 Trending This Week" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused || prompts.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % prompts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, prompts.length]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + prompts.length) % prompts.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % prompts.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  if (prompts.length === 0) return null;

  const visiblePrompts = [
    prompts[(currentIndex - 1 + prompts.length) % prompts.length],
    prompts[currentIndex],
    prompts[(currentIndex + 1) % prompts.length]
  ];

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
            {title}
          </h2>
          <p className="text-sm text-slate-600 flex items-center justify-center gap-2">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🔄
            </motion.span>
            Updated hourly • Rotates every 4 seconds
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡
            </motion.span>
          </p>
        </motion.div>

        {/* ===== CAROUSEL CONTAINER ===== */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-1 shadow-sm">
            <div className="relative h-96 sm:h-[500px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 120
                  }}
                  className="absolute inset-0"
                >
                  <FeaturedCard prompt={prompts[currentIndex]} />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <NavigationArrow
                onClick={handlePrevious}
                direction="left"
                className="left-4"
              />
              <NavigationArrow
                onClick={handleNext}
                direction="right"
                className="right-4"
              />
            </div>
          </div>

          {/* ===== PROGRESS INDICATORS ===== */}
          <div className="mt-6 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2 flex-1 justify-center">
              {prompts.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex
                      ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Counter */}
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-4 text-sm text-slate-400 font-semibold"
            >
              {currentIndex + 1} / {prompts.length}
            </motion.div>
          </div>

          {/* ===== ENGAGEMENT SIGNALS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            <EngagementMetric
              icon="👤"
              label="Saved"
              value={prompts[currentIndex]?.saves || "1.2K"}
            />
            <EngagementMetric
              icon="💚"
              label="Used by creators"
              value="15.2K"
            />
            <EngagementMetric
              icon="⚡"
              label="Trending"
              value="340%"
            />
          </motion.div>
        </div>

        {/* ===== FEATURED PROMPT HIGHLIGHT ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-slate-100 border border-slate-200 rounded-xl"
        >
          <p className="text-sm text-purple-700 font-semibold mb-2">💡 Pro Tip</p>
          <p className="text-slate-900">
            This prompt is trending {" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              340% more this week
            </span>
            . Copy it now before the trend passes!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Featured Card - Main carousel display
 */
function FeaturedCard({ prompt }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background image with zoom */}
      <motion.div
        animate={{ scale: [1, 1.05] }}
        transition={{ duration: 3 }}
        className="absolute inset-0"
      >
        <div className="relative h-full w-full">
          <Image
            src={prompt.previewImage}
            alt={prompt.title}
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Title */}
          <h3 className="text-3xl sm:text-4xl font-black text-white line-clamp-2">
            {prompt.title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 line-clamp-2 text-sm sm:text-base">
            {prompt.prompt.substring(0, 120)}...
          </p>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            <Badge text={prompt.model || "ChatGPT"} color="blue" />
            {prompt.category && <Badge text={prompt.category} color="purple" />}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Badge text="🔥 Trending" color="orange" />
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`/prompt/${prompt.slug}`}
              prefetch={true}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              aria-label={`Open ${prompt.title}`}
            >
              <span className="hidden sm:inline">Open Prompt</span>
              <span className="sm:hidden">Open</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Navigation Arrow Button
 */
function NavigationArrow({ onClick, direction, className }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute top-1/2 -translate-y-1/2 z-20 ${className} p-3 bg-white/90 hover:bg-white transition-all duration-300 border border-slate-200 rounded-full text-slate-900 opacity-0 group-hover:opacity-100`}
    >
      {direction === "left" ? (
        <FiChevronLeft className="w-6 h-6" />
      ) : (
        <FiChevronRight className="w-6 h-6" />
      )}
    </motion.button>
  );
}

/**
 * Badge Component
 */
function Badge({ text, color = "blue" }) {
  const colorClasses = {
    blue: "bg-blue-600/30 border-blue-500/50 text-blue-300",
    purple: "bg-purple-600/30 border-purple-500/50 text-purple-300",
    orange: "bg-orange-600/30 border-orange-500/50 text-orange-300"
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${colorClasses[color]}`}
    >
      {text}
    </span>
  );
}

/**
 * Engagement Metric Display
 */
function EngagementMetric({ icon, label, value }) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="text-center"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <motion.p
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-lg font-bold text-white"
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
