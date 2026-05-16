"use client";

import Link from "next/link";
import React, { useState } from "react";
import SmartImage from "./SmartImage";
import { FiCopy, FiCheck } from "react-icons/fi";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(prompt.prompt || prompt.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Link href={`/prompt/${prompt.slug}`}>
      <div className="group h-full rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl dark:hover:shadow-blue-500/20 bg-white dark:bg-slate-800 cursor-pointer">
        {/* Image Container with 16:9 aspect ratio */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
          <SmartImage
            src={prompt.previewImage}
            alt={prompt.title}
            title={prompt.title}
            className="w-full h-full"
            imageClassName="group-hover:scale-110 transition-transform duration-500 object-cover"
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

          {/* Copy Button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all transform scale-90 group-hover:scale-100"
            >
              {copied ? (
                <>
                  <FiCheck className="w-5 h-5" /> Copied!
                </>
              ) : (
                <>
                  <FiCopy className="w-5 h-5" /> Copy Prompt
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {prompt.title}
          </h3>

          {/* Description or snippet */}
          {prompt.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {prompt.description}
            </p>
          )}

          {/* Footer with metadata */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-500">
              {prompt.views || "Recently updated"}
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
