'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Prompt } from '@/src/types';
import { getPromptUrl, getBadgeIcon } from '@/src/utils/prompts';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TrendingCarouselProps {
  prompts: Prompt[];
}

export default function TrendingCarousel({ prompts }: TrendingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    if (!autoplay || prompts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % prompts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoplay, prompts.length]);

  if (prompts.length === 0) return null;

  const currentPrompt = prompts[currentIndex];
  const nextIndex = (currentIndex + 1) % prompts.length;
  const prevIndex = (currentIndex - 1 + prompts.length) % prompts.length;

  const handlePrev = () => {
    setCurrentIndex(prevIndex);
    setAutoplay(false);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
    setAutoplay(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">🔥 Trending</h2>
        <p className="text-lg text-slate-400">Most loved and shared prompts right now</p>
      </div>

      {/* Main Carousel Container */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-900"
            >
              {/* Hero Image */}
              <Image
                src={currentPrompt.previewImage}
                alt={currentPrompt.title}
                fill
                className="object-cover"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                {/* Badges */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 flex-wrap"
                >
                  {currentPrompt.badges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="px-4 py-2 bg-red-600/90 backdrop-blur rounded-full text-white text-sm font-bold flex items-center gap-2"
                    >
                      <span className="text-lg">{getBadgeIcon(badge.type)}</span>
                      {badge.label}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Title & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-4xl sm:text-5xl font-black text-white">{currentPrompt.title}</h3>

                  <p className="text-lg text-slate-200 max-w-xl">{currentPrompt.prompt}</p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link href={getPromptUrl(currentPrompt.slug)}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all"
                      >
                        View Prompt →
                      </motion.button>
                    </Link>

                    <div className="flex gap-4 items-center text-white text-sm">
                      <div>
                        <div className="font-bold">{currentPrompt.model}</div>
                        <div className="text-slate-400 text-xs">Model</div>
                      </div>
                      <div>
                        <div className="font-bold">{currentPrompt.category}</div>
                        <div className="text-slate-400 text-xs">Category</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 text-white transition"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 text-white transition"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Thumbnail Strip */}
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
          {prompts.map((prompt, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setAutoplay(false);
              }}
              whileHover={{ scale: 1.05 }}
              className={`relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                idx === currentIndex ? 'ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={prompt.previewImage}
                alt={prompt.title}
                fill
                className="object-cover"
              />

              {idx === currentIndex && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute inset-0 border-2 border-blue-500 rounded-lg"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {prompts.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setAutoplay(false);
              }}
              animate={{
                width: idx === currentIndex ? 32 : 8,
                backgroundColor: idx === currentIndex ? '#3B82F6' : '#64748B',
              }}
              className="h-2 rounded-full transition-all"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
