'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { FiFilter } from 'react-icons/fi';
import PromptCard from '@/src/components/PromptCard';
import type { Prompt, PromptCategory } from '@/src/types';

const MODEL_FILTERS = ['All', 'Midjourney', 'Flux', 'DALL-E', 'Stable Diffusion'] as const;
const GENDER_FILTERS = ['All', 'Men', 'Women'] as const;
const ASPECT_FILTERS = ['All', '1:1', '4:5', '3:4', '2:3'] as const;
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'most-copied', label: 'Most Copied' },
  { value: 'a-z', label: 'A-Z' },
] as const;

type ModelFilter = (typeof MODEL_FILTERS)[number];
type GenderFilter = (typeof GENDER_FILTERS)[number];
type AspectFilter = (typeof ASPECT_FILTERS)[number];
type SortOption = (typeof SORT_OPTIONS)[number]['value'];

interface CategoryPromptBrowserProps {
  category: PromptCategory;
  prompts: Prompt[];
}

function matchesGender(prompt: Prompt, selectedGender: GenderFilter) {
  if (selectedGender === 'All') {
    return true;
  }

  const tags = prompt.tags.map((tag) => tag.toLowerCase());
  if (selectedGender === 'Men') {
    return tags.some((tag) => ['men', 'man', 'male', 'boy', 'boys', 'mens'].includes(tag));
  }

  if (selectedGender === 'Women') {
    return tags.some((tag) => ['women', 'woman', 'female', 'girl', 'girls', 'womens'].includes(tag));
  }

  return true;
}

function formatCountLabel(count: number, category: string) {
  return `${count} prompt${count === 1 ? '' : 's'} · ${category}`;
}

export default function CategoryPromptBrowser({ category, prompts }: CategoryPromptBrowserProps) {
  const [selectedModel, setSelectedModel] = useState<ModelFilter>('All');
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('All');
  const [selectedAspect, setSelectedAspect] = useState<AspectFilter>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [visibleCount, setVisibleCount] = useState(12);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesModel = selectedModel === 'All' || prompt.model === selectedModel;
      const matchesAspect = selectedAspect === 'All' || prompt.aspectRatio === selectedAspect;
      const matchesGenderRule = matchesGender(prompt, selectedGender);
      return matchesModel && matchesAspect && matchesGenderRule;
    });
  }, [prompts, selectedModel, selectedAspect, selectedGender]);

  const sortedPrompts = useMemo(() => {
    return [...filteredPrompts].sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === 'most-copied') {
        return (b.copies || 0) - (a.copies || 0);
      }

      return a.title.localeCompare(b.title);
    });
  }, [filteredPrompts, sortBy]);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedModel, selectedGender, selectedAspect, sortBy]);

  const visiblePrompts = sortedPrompts.slice(0, visibleCount);
  const activeFilters = [selectedModel, selectedGender, selectedAspect].filter((filter) => filter !== 'All').length;
  const totalCount = prompts.length;
  const filteredCount = filteredPrompts.length;
  const hasMore = visibleCount < filteredCount;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="text-slate-500 hover:text-slate-900 transition">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-900 font-semibold">{category}</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-[56px] leading-[0.96] tracking-[-0.03em] font-black text-slate-900 sm:text-[64px] md:text-[72px]" style={{ fontFamily: 'Clash Display, ui-sans-serif, system-ui' }}>
              {category}
            </h1>
            <p className="mt-4 text-sm text-slate-500">{formatCountLabel(totalCount, category)}</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
              {filteredCount === totalCount
                ? `Showing ${filteredCount} prompts`
                : `Showing ${filteredCount} of ${totalCount} prompts`}
            </div>
            <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
              <span className="text-slate-500">Sorted by</span>
              <span className="font-semibold text-slate-900">
                {SORT_OPTIONS.find((option) => option.value === sortBy)?.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 md:hidden"
                onClick={() => setMobileFiltersOpen((open) => !open)}
              >
                <FiFilter className="h-4 w-4" />
                Filters
                {activeFilters > 0 ? (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-violet-500 px-2 text-[11px] font-semibold text-white">
                    {activeFilters}
                  </span>
                ) : null}
              </button>

              <div className="hidden md:flex flex-wrap items-center gap-2">
                <FilterGroup label="Model">
                  {MODEL_FILTERS.map((value) => (
                    <FilterPill
                      key={value}
                      active={selectedModel === value}
                      onClick={() => setSelectedModel(value)}
                    >
                      {value}
                    </FilterPill>
                  ))}
                </FilterGroup>

                <FilterGroup label="Gender">
                  {GENDER_FILTERS.map((value) => (
                    <FilterPill
                      key={value}
                      active={selectedGender === value}
                      onClick={() => setSelectedGender(value)}
                    >
                      {value}
                    </FilterPill>
                  ))}
                </FilterGroup>

                <FilterGroup label="Aspect ratio">
                  {ASPECT_FILTERS.map((value) => (
                    <FilterPill
                      key={value}
                      active={selectedAspect === value}
                      onClick={() => setSelectedAspect(value)}
                    >
                      {value}
                    </FilterPill>
                  ))}
                </FilterGroup>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
                <span>Filters active</span>
                <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-700">
                  {activeFilters}
                </span>
              </div>

              <label htmlFor="category-sort" className="sr-only">
                Sort prompts
              </label>
              <select
                id="category-sort"
                className="h-11 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700 md:hidden">
            {activeFilters === 0 ? (
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                All filters
              </span>
            ) : (
              <>
                {selectedModel !== 'All' ? (
                  <span className="inline-flex items-center rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">
                    {selectedModel}
                  </span>
                ) : null}
                {selectedGender !== 'All' ? (
                  <span className="inline-flex items-center rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">
                    {selectedGender}
                  </span>
                ) : null}
                {selectedAspect !== 'All' ? (
                  <span className="inline-flex items-center rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white">
                    {selectedAspect}
                  </span>
                ) : null}
              </>
            )}

            <span className="ml-auto inline-flex h-6 items-center rounded-full bg-white/10 px-3 text-xs font-semibold text-white">
              {activeFilters} active
            </span>
          </div>

          {mobileFiltersOpen ? (
            <div className="mt-4 grid gap-3 md:hidden">
              <FilterGroup label="Model">
                {MODEL_FILTERS.map((value) => (
                  <FilterPill
                    key={value}
                    active={selectedModel === value}
                    onClick={() => setSelectedModel(value)}
                  >
                    {value}
                  </FilterPill>
                ))}
              </FilterGroup>

              <FilterGroup label="Gender">
                {GENDER_FILTERS.map((value) => (
                  <FilterPill
                    key={value}
                    active={selectedGender === value}
                    onClick={() => setSelectedGender(value)}
                  >
                    {value}
                  </FilterPill>
                ))}
              </FilterGroup>

              <FilterGroup label="Aspect ratio">
                {ASPECT_FILTERS.map((value) => (
                  <FilterPill
                    key={value}
                    active={selectedAspect === value}
                    onClick={() => setSelectedAspect(value)}
                  >
                    {value}
                  </FilterPill>
                ))}
              </FilterGroup>
            </div>
          ) : null}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredCount === 0 ? (
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-12 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-100 to-slate-200 text-violet-700">
              <svg viewBox="0 0 80 80" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="12" y="18" width="56" height="44" rx="10" />
                <path d="M20 28h40" />
                <path d="M20 38h24" />
                <path d="M20 48h18" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">No prompts match these filters</h2>
            <p className="mt-3 text-sm text-slate-600">
              Try changing the model, gender, or aspect ratio filters to see more fashion prompt ideas.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                  onClick={() => setVisibleCount((count) => Math.min(count + 12, filteredCount))}
                >
                  Load more
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl bg-slate-100 p-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
      <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-full border px-3 py-2 text-sm font-medium transition ${
        active
          ? 'border-transparent bg-violet-500 text-white shadow-[0_8px_24px_-18px_rgba(124,58,237,0.7)]'
          : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}
