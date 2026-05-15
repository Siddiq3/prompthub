"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import SmartImage from "./SmartImage";

export default function NewArrivalsCarousel({ title, description, prompts }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Update arrow visibility
      setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container) {
          setShowLeftArrow(container.scrollLeft > 0);
          setShowRightArrow(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
          );
        }
      }, 300);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full p-2 shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {prompts.map((prompt) => (
            <Link
              key={prompt.id}
              href={`/prompt/${prompt.slug}`}
              className="group flex-shrink-0 w-64 snap-start"
            >
              <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-lg dark:hover:shadow-brand-primary/20">
                {/* Image */}
                <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800">
                  <SmartImage
                    src={prompt.previewImage}
                    alt={prompt.title}
                    title={prompt.title}
                    className="w-full h-full"
                    imageClassName="group-hover:scale-110 transition-transform duration-300"
                    aspectClassName=""
                  />
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 group-hover:text-brand-primary dark:group-hover:text-brand-primary transition-colors">
                    {prompt.title}
                  </h3>
                  {prompt.platform && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {prompt.platform}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full p-2 shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Scroll Indicator */}
      <p className="text-center text-sm text-slate-600 dark:text-slate-400">
        ← Scroll to see more →
      </p>
    </section>
  );
}
