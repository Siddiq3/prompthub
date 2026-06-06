"use client";

import Link from "next/link";
import React from "react";
import SmartImage from "./SmartImage";
import { ArrowRight } from "lucide-react";

export default function TrendingGrid({ title, description, prompts }) {
  return (
    <section className="space-y-12">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      {/* Trending Cards Grid - Enhanced with badges and hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <TrendingCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-8">
        <Link
          href="/prompts?sort=trending"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 group"
        >
          View All Trending Prompts
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}

function TrendingCard({ prompt }) {
  return (
    <div className="group h-full rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-blue-500/20">
      {/* Image Container with 16:9 aspect ratio */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        <SmartImage
          src={prompt.previewImage}
          alt={prompt.title}
          title={prompt.title}
          className="w-full h-full"
          imageClassName="group-hover:scale-105 transition-transform duration-500 object-contain"
          aspectClassName=""
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        {prompt.category && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-block px-3 py-1 bg-blue-600 dark:bg-blue-500 text-white text-xs font-semibold rounded-full">
              {prompt.category}
            </span>
          </div>
        )}

        {/* Platform Badge */}
        {prompt.platform && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-block px-3 py-1 bg-purple-600 dark:bg-purple-500 text-white text-xs font-semibold rounded-full">
              {prompt.platform}
            </span>
          </div>
        )}

        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
          <Link
            href={`/prompt/${prompt.slug}`}
            prefetch={true}
            aria-label={`Open ${prompt.title}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="hidden sm:inline">Open Prompt</span>
            <span className="sm:hidden">Open</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex h-full flex-col">
        <Link href={`/prompt/${prompt.slug}`} prefetch={true} className="group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {prompt.title}
          </h3>
        </Link>

        {prompt.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-3">
            {prompt.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <Link
            href={`/prompt/${prompt.slug}`}
            prefetch={true}
            aria-label={`Open ${prompt.title}`}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-white px-4 py-3 font-semibold transition-all duration-200 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span className="hidden sm:inline">Open Prompt</span>
            <span className="sm:hidden">Open</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{prompt.views || 'Recently updated'}</span>
          <span className="font-semibold text-blue-600 dark:text-blue-400">View →</span>
        </div>
      </div>
    </div>
  );
}
