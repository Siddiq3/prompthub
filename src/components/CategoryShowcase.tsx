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
        whileHover={{ y: -2 }}
        className="group relative flex min-h-[132px] cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
      >
        {image ? (
          <div
            className="w-24 shrink-0 bg-cover bg-center sm:w-28"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base">{emoji}</span>
              <h3 className="truncate text-lg font-bold text-slate-950 group-hover:text-[#2271b1]">{category}</h3>
            </div>
            <p className="text-sm text-slate-500">Browse all posts in this topic.</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">{count.toLocaleString()} prompts</span>
            <span className="font-semibold text-[#2271b1]">View</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
