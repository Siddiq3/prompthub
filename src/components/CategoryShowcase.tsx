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
        whileHover={{ y: -6, scale: 1.02 }}
        className="relative overflow-hidden rounded-[20px] bg-white transition-all duration-300 cursor-pointer group border border-slate-200 shadow-sm hover:border-[#7c3aed] hover:shadow-[0_20px_60px_-30px_rgba(124,58,237,0.15)]"
        style={{ minHeight: '220px' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image || ''})` }}
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-slate-950/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-[#7c3aed]/10 opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Content overlay */}
        <div className="relative z-10 h-full p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
                <span className="text-lg">{emoji}</span>
                <span>{category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-900 px-3 py-1 text-sm font-semibold">{count.toLocaleString()} prompts</span>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none group-hover" style={{ boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.0)' }} />
      </motion.div>
    </Link>
  );
}
