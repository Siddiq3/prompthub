'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Prompt } from '@/src/types';
import { getPromptUrl } from '@/src/utils/prompts';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TrendingCarouselProps {
  prompts: Prompt[];
}

export default function TrendingCarousel({ prompts }: TrendingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (prompts.length === 0) return null;

  const visibleCount = Math.min(6, prompts.length);
  const maxIndex = Math.max(0, prompts.length - visibleCount);
  const prevIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
  const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;

  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
          <button
            onClick={() => setCurrentIndex(prevIndex)}
            aria-label="Previous prompt"
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg shadow-slate-200 transition hover:bg-white"
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(currentIndex * 100) / visibleCount}%)` }}
            >
              {prompts.map((prompt) => (
                <Link
                  key={prompt.slug}
                  href={getPromptUrl(prompt.slug)}
                  className="relative min-w-[16.6667%] flex-shrink-0 overflow-hidden"
                >
                  <div className="relative h-80 sm:h-96">
                    <Image
                      src={prompt.previewImage}
                      alt={prompt.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-x-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">
                    {prompt.category || 'Prompt'}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentIndex(nextIndex)}
            aria-label="Next prompt"
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg shadow-slate-200 transition hover:bg-white"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: prompts.length }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(Math.min(idx, maxIndex))}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-10 bg-slate-900' : 'w-4 bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
