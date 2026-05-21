'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { ArrowRight } from 'lucide-react';
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
  Midjourney: { bg: '#7C3AED', text: 'white' },
  Flux: { bg: '#10B981', text: 'white' },
  'DALL-E': { bg: '#3B82F6', text: 'white' },
  'Stable Diffusion': { bg: '#F97316', text: 'white' },
  'Adobe Firefly': { bg: '#8B5CF6', text: 'white' },
  Ideogram: { bg: '#EC4899', text: 'white' },
  Leonardo: { bg: '#06B6D4', text: 'white' },
  Replicate: { bg: '#14B8A6', text: 'white' },
};

const ASPECT_RATIO_MAP: Record<string, string> = {
  '1:1': 'aspect-square',
  '4:3': 'aspect-video',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-video',
  '9:16': 'aspect-[9/16]',
  '3:2': 'aspect-[3/2]',
  '2:3': 'aspect-[2/3]',
  '21:9': 'aspect-[21/9]',
};

export default function PromptCard({ prompt, variant = 'grid', isSaved: externalSaved, onSave, savedPrompts }: PromptCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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
  }, [prompt.id, externalSaved, savedPrompts]);

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

  if (!mounted) return null;

  const modelColor = MODEL_COLORS[prompt.model] || { bg: '#6B7280', text: 'white' };
  const aspectClass = ASPECT_RATIO_MAP[prompt.aspectRatio] || 'aspect-[3/4]';
  const tags = Array.isArray(prompt.tags) ? prompt.tags : [];

  if (variant === 'list') {
    return (
      <div className="group flex gap-4 p-4 rounded-[12px] bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
          <Image src={prompt.previewImage} alt={prompt.title} fill className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <Link href={getPromptUrl(prompt.slug)} prefetch={true} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            <h3 className="text-sm font-semibold text-slate-900 truncate hover:text-[#7C3AED] transition-colors">
              {prompt.title}
            </h3>
          </Link>
          <p className="text-[12px] text-slate-500 line-clamp-2 mt-2 italic">{prompt.prompt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[10px] rounded-full bg-slate-100 px-2 py-1 text-slate-700">{prompt.category}</span>
            <span className="text-[10px] rounded-full px-2 py-1 font-semibold" style={{ backgroundColor: modelColor.bg, color: modelColor.text }}>
              {prompt.model}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="p-2 rounded-full bg-slate-100 text-slate-900 transition hover:bg-slate-200"
            aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
          >
            <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} />
          </button>
          <Link
            href={getPromptUrl(prompt.slug)}
            prefetch={true}
            aria-label={`Open ${prompt.title}`}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-3 py-2 text-[11px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="hidden sm:inline">Open Prompt</span>
            <span className="sm:hidden">Open</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[12px] bg-white border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className={`relative overflow-hidden bg-slate-100 ${aspectClass}`}>
        <div className="absolute inset-0 transition-transform duration-300 ease-[ease] group-hover:scale-105">
          <Image src={prompt.previewImage} alt={prompt.title} fill className="object-cover" />
        </div>

        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-flex rounded px-2 py-1 text-[10px] font-semibold"
            style={{ backgroundColor: modelColor.bg, color: modelColor.text }}
          >
            {prompt.model}
          </span>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="absolute top-3 right-3 z-20 rounded-full bg-slate-100 p-2 text-slate-900 transition hover:bg-slate-200"
          aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
        >
          <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-900'}`} />
        </button>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-50/0 transition duration-300 group-hover:bg-slate-100/70">
          <span className="opacity-0 text-slate-900 font-medium transition duration-300 group-hover:opacity-100">
            View prompt →
          </span>
        </div>
      </div>

      <div className="p-4 pb-0 flex flex-col gap-3 h-full">
        <Link href={getPromptUrl(prompt.slug)} prefetch={true} className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <h3 className="text-[14px] font-semibold text-slate-900 truncate hover:text-[#7C3AED] transition-colors cursor-pointer">
            {prompt.title}
          </h3>
        </Link>

        <p className="text-[11px] text-slate-500 mt-2">{prompt.category}</p>

        <p className="text-[12px] text-slate-600 italic line-clamp-2 mt-3 flex-1">
          {prompt.prompt}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] rounded-full bg-slate-100 px-2 py-1 text-slate-700">
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] rounded-full bg-slate-100 px-2 py-1 text-slate-700">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 bg-slate-50">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">{prompt.copies || 0} copies</span>
          <Link
            href={getPromptUrl(prompt.slug)}
            prefetch={true}
            aria-label={`Open ${prompt.title}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2 text-[12px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="hidden sm:inline">Open Prompt</span>
            <span className="sm:hidden">Open</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
