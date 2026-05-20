'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PromptCategory } from '@/src/types';
import { getCategoryUrl, createSlug } from '@/src/utils/prompts';

interface CategoryShowcaseProps {
  category: PromptCategory;
  count: number;
  image?: string;
}

// Category to emoji mapping
const CATEGORY_EMOJI: Record<PromptCategory, string> = {
  Portrait: '👤',
  Landscape: '🏔️',
  Product: '📦',
  Abstract: '🎨',
  Architecture: '🏛️',
  Nature: '🌿',
  Fashion: '👗',
  'Still Life': '🍎',
  Animals: '🦁',
  Fantasy: '✨',
  'Sci-Fi': '🛸',
  Illustration: '🖼️',
  Photography: '📷',
  Cinematic: '🎬',
  Other: '🎯',
};

export default function CategoryShowcase({ category, count, image }: CategoryShowcaseProps) {
  const emoji = CATEGORY_EMOJI[category];
  const slug = createSlug(category);

  return (
    <Link href={getCategoryUrl(category)}>
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur border border-slate-700/50 hover:border-slate-600 transition-all h-48 cursor-pointer group"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Icon */}
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 10 }}
            className="text-5xl"
          >
            {emoji}
          </motion.div>

          {/* Text */}
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition">
              {category}
            </h3>
            <p className="text-sm text-slate-400">{count.toLocaleString()} prompts</p>
          </div>

          {/* Arrow indicator */}
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="text-slate-500 group-hover:text-blue-400 transition text-lg"
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
