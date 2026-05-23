'use client';

import { motion } from 'framer-motion';
import PromptCard from '@/src/components/PromptCard';
import { Prompt } from '@/src/types';

interface PromptGridProps {
  prompts: Prompt[];
  variant?: 'grid' | 'masonry' | 'list';
  isLoading?: boolean;
}

export default function PromptGrid({
  prompts,
  variant = 'grid',
  isLoading = false,
}: PromptGridProps) {
  const displayPrompts = prompts;

  if (isLoading) {
    return <LoadingGrid />;
  }

  if (displayPrompts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-400 text-lg">No prompts found.</p>
      </div>
    );
  }

  const gridClasses = {
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max',
    masonry: 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6',
    list: 'space-y-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={gridClasses[variant]}
    >
      {displayPrompts.map((prompt, index) => (
        <motion.div
          key={prompt.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: Math.min(index * 0.05, 0.3),
          }}
          className={variant === 'masonry' ? 'break-inside-avoid mb-6' : ''}
        >
          <PromptCard prompt={prompt} variant={variant === 'list' ? 'list' : 'grid'} />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ===== LOADING GRID =====
function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
          className="bg-slate-100 rounded-2xl aspect-square animate-pulse"
        />
      ))}
    </div>
  );
}
