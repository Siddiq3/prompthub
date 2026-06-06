'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Prompt } from '@/src/types';
import { getPromptUrl } from '@/src/utils/prompts';

interface PromptCardProps {
  prompt: Prompt;
  variant?: 'grid' | 'list';
  isSaved?: boolean;
  onSave?: (promptId: string, saved: boolean) => void;
  savedPrompts?: string[];
}

const MODEL_COLORS: Record<string, { bg: string; text: string }> = {
  ChatGPT: { bg: '#10A37F', text: 'white' },
  Gemini: { bg: '#4285F4', text: 'white' },
};

const ASPECT_RATIO_MAP: Record<string, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-[4/3]',
  '3:4': 'aspect-[3/4]',
  '4:5': 'aspect-[4/5]',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '3:2': 'aspect-[3/2]',
  '2:3': 'aspect-[2/3]',
  '21:9': 'aspect-[21/9]',
};

export default function PromptCard({ prompt, variant = 'grid', isSaved: externalSaved, onSave, savedPrompts }: PromptCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const initializeCard = async () => {
      // Handle saved prompts
      let saved = false;
      if (Array.isArray(savedPrompts)) {
        saved = savedPrompts.includes(prompt.id);
      } else {
        try {
          const stored = localStorage.getItem('saved_prompts');
          const savedIds = stored ? JSON.parse(stored) : [];
          saved = Array.isArray(savedIds) ? savedIds.includes(prompt.id) : false;
        } catch {
          saved = false;
        }
      }

      if (externalSaved !== undefined) {
        setIsSaved(externalSaved || saved);
      } else {
        setIsSaved(saved);
      }
    };

    initializeCard();
  }, [externalSaved, savedPrompts, prompt.id]);

  const handleSave = () => {
    const nextState = !isSaved;
    setIsSaved(nextState);

    try {
      const stored = localStorage.getItem('saved_prompts');
      let savedIds = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(savedIds)) savedIds = [];

      const updated = nextState
        ? Array.from(new Set([...savedIds, prompt.id]))
        : savedIds.filter((id) => id !== prompt.id);

      localStorage.setItem('saved_prompts', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating saved prompts:', error);
    }

    if (onSave) {
      onSave(prompt.id, nextState);
    }
  };

  const modelLabel = prompt.modelLabel || prompt.model || 'ChatGPT';
  const modelColor = MODEL_COLORS[modelLabel] || { bg: '#6B7280', text: 'white' };
  const aspectClass = ASPECT_RATIO_MAP[prompt.aspectRatio] || 'aspect-[3/4]';
  const tags = Array.isArray(prompt.tags) ? prompt.tags : [];
  const cardDescription = prompt.shortDescription || '';

  if (variant === 'list') {
    return (
      <Link href={getPromptUrl(prompt.slug)} prefetch={true} className="block">
        <div className="group flex cursor-pointer gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
            <Image src={prompt.previewImage} alt={prompt.title} fill className="object-contain" />
          </div>

          <div className="flex-1 min-w-0">
              <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors hover:text-[#2271b1]">
              {prompt.title}
            </h3>
            {cardDescription ? (
              <p className="text-[12px] text-slate-500 line-clamp-2 mt-2 italic">{cardDescription}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-[10px] rounded-full bg-slate-100 px-2 py-1 text-slate-700">{prompt.category}</span>
              <span className="text-[10px] rounded-full px-2 py-1 font-semibold" style={{ backgroundColor: modelColor.bg, color: modelColor.text }}>
                {modelLabel}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end justify-between">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSave();
              }}
              className="rounded-md bg-slate-100 p-2 text-slate-900 transition hover:bg-slate-200"
              aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
            >
              <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={getPromptUrl(prompt.slug)} prefetch={true} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.28 }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm"
      >
        <div className={`relative overflow-hidden bg-slate-100 ${aspectClass}`}>
          <div className="absolute inset-0 transition-transform duration-300 ease-[ease] group-hover:scale-105">
            <Image src={prompt.previewImage} alt={prompt.title} fill className="object-contain" />
          </div>

          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex rounded px-2 py-1 text-[10px] font-semibold"
              style={{ backgroundColor: modelColor.bg, color: modelColor.text }}
            >
              {modelLabel}
            </span>
          </div>

            <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSave();
            }}
            className="absolute top-3 right-3 z-20 rounded-md bg-white/90 p-2 text-slate-800 shadow-sm transition hover:bg-white"
            aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
          >
            <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#2271b1]">
            {prompt.category}
          </p>

          <h3 className="line-clamp-2 text-xl font-bold leading-7 text-slate-950 transition-colors group-hover:text-[#2271b1]">
            {prompt.title}
          </h3>

          {cardDescription ? (
            <p className="line-clamp-3 flex-1 text-sm leading-7 text-slate-600">
              {cardDescription}
            </p>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
