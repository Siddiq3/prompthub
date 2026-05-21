'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiCopy, FiHeart } from 'react-icons/fi';
import { Prompt } from '@/src/types';
import { getPromptUrl, copyToClipboard } from '@/src/utils/prompts';

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
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'success'>('idle');
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

  const handleCopy = async () => {
    setCopyState('copying');
    const success = await copyToClipboard(prompt.prompt);
    if (success) {
      setCopyState('success');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } else {
      setCopyState('idle');
    }
  };

  if (!mounted) return null;

  const modelColor = MODEL_COLORS[prompt.model] || { bg: '#6B7280', text: 'white' };
  const aspectClass = ASPECT_RATIO_MAP[prompt.aspectRatio] || 'aspect-[3/4]';

  if (variant === 'list') {
    return (
      <div className="flex gap-4 p-4 rounded-[12px] bg-[#131729] border border-white/[0.08] hover:border-[rgba(124,58,237,0.5)] transition-all duration-300">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
          <Image src={prompt.previewImage} alt={prompt.title} fill className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <Link href={getPromptUrl(prompt.slug)}>
            <h3 className="text-sm font-semibold text-[#F0EBE3] truncate hover:text-[#7C3AED] transition-colors cursor-pointer">
              {prompt.title}
            </h3>
          </Link>
          <p className="text-[12px] text-[#9CA3B8] line-clamp-2 mt-2 italic">{prompt.prompt}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[10px] rounded-full bg-[#1C2240] px-2 py-1 text-white/70">{prompt.category}</span>
            <span className="text-[10px] rounded-full px-2 py-1 font-semibold" style={{ backgroundColor: modelColor.bg, color: modelColor.text }}>
              {prompt.model}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end justify-between">
          <button
            type="button"
            onClick={handleSave}
            className="p-2 rounded-full bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
          >
            {isSaved ? <FiHeart className="w-5 h-5 fill-red-500 text-red-500" /> : <FiHeart className="w-5 h-5 text-white" />}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`h-7 rounded px-3 text-[11px] font-semibold transition ${
              copyState === 'success' ? 'bg-green-600 text-white' : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
            }`}
          >
            {copyState === 'success' ? '✓' : copyState === 'copying' ? 'Copying' : 'Copy'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-[12px] bg-[#131729] border border-white/[0.08] transition-all duration-300 hover:border-[rgba(124,58,237,0.5)]"
    >
      <div className={`relative overflow-hidden bg-slate-900 ${aspectClass}`}>
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
          className="absolute top-3 right-3 z-20 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
          aria-label={isSaved ? 'Remove saved prompt' : 'Save prompt'}
        >
          {isSaved ? <FiHeart className="w-5 h-5 fill-red-500 text-red-500" /> : <FiHeart className="w-5 h-5 text-white" />}
        </button>

        <Link
          href={getPromptUrl(prompt.slug)}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${prompt.title}`}
        >
          <span className="sr-only">View details for {prompt.title}</span>
        </Link>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/60">
          <span className="opacity-0 text-white font-medium transition duration-300 group-hover:opacity-100">
            View prompt →
          </span>
        </div>
      </div>

      <div className="p-4 pb-0">
        <Link href={getPromptUrl(prompt.slug)}>
          <h3 className="text-[14px] font-semibold text-[#F0EBE3] truncate hover:text-[#7C3AED] transition-colors cursor-pointer">
            {prompt.title}
          </h3>
        </Link>

        <p className="text-[11px] text-white/60 mt-2">{prompt.category}</p>

        <p className="text-[12px] text-[#9CA3B8] italic line-clamp-2 mt-3">
          {prompt.prompt}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] rounded-full bg-[#1C2240] px-2 py-1 text-white/70">
              #{tag}
            </span>
          ))}
          {prompt.tags.length > 3 && (
            <span className="text-[10px] rounded-full bg-[#1C2240] px-2 py-1 text-white/70">
              +{prompt.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-4 py-3 flex items-center justify-between">
        <span className="text-[11px] text-white/60">{prompt.copies || 0} copies</span>
        <button
          type="button"
          onClick={handleCopy}
          className={`h-7 inline-flex items-center gap-1.5 rounded px-3 text-[11px] font-semibold transition ${
            copyState === 'success' ? 'bg-green-600 text-white' : 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
          }`}
        >
          <FiCopy className="w-3.5 h-3.5" />
          <span>{copyState === 'success' ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </motion.div>
  );
}
