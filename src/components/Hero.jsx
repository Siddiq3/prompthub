"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// CountUpStat component with IntersectionObserver and easeOutExpo
function CountUpStat({ targetValue, format = "number" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const prefersReducedMotion = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  };

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const reducedMotion = prefersReducedMotion();
    const duration = reducedMotion ? 0 : 1500;
    const startTime = Date.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = Math.floor(eased * targetValue);
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isVisible, targetValue]);

  const getFormattedValue = () => {
    if (displayValue >= 50000) {
      return `${(displayValue / 1000).toFixed(0)}K+`;
    }
    return displayValue.toLocaleString();
  };

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="font-clash text-3xl font-bold text-[#F0EBE3]"
    >
      {getFormattedValue()}
    </motion.span>
  );
}

function Hero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalPrompts,
  categoriesCount,
  modelsCount,
  popularCategories = []
}) {
  return (
    <section className="bg-gradient-to-b from-[#0B0E1A] to-[#131729] px-4 py-16 sm:px-6 lg:px-8 xl:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 xl:grid-cols-[1.2fr_1fr] xl:items-start">
          {/* Left Column: Hero Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-sm font-medium text-[#7C3AED] mb-6">
              AI Prompt Discovery
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-clash font-bold text-[#F0EBE3] leading-[1.1] mb-6">
              Find photo prompts <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#EC4899]">without the noise</span>
            </h1>

            <p className="text-lg text-[#9CA3B8] mb-8 max-w-xl leading-relaxed">
              Start with a category, narrow things down only when you need to, and open full prompt pages when ready to copy and create.
            </p>

            <div className="mb-8 max-w-xl">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                onSubmit={onSearchSubmit}
                buttonLabel="Search"
                placeholder="Search portrait, wedding, studio, ChatGPT..."
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
              <div>
                <CountUpStat targetValue={totalPrompts} />
                <p className="text-sm text-[#5B6380] mt-2">Photo prompts</p>
              </div>
              <div>
                <CountUpStat targetValue={categoriesCount} />
                <p className="text-sm text-[#5B6380] mt-2">Categories</p>
              </div>
              <div>
                <CountUpStat targetValue={modelsCount} />
                <p className="text-sm text-[#5B6380] mt-2">AI models</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <Link href="/categories" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium transition">
                Browse Categories
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/prompts" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.16)] hover:bg-[#1C2240] text-[#F0EBE3] font-medium transition">
                View All Prompts
              </Link>
            </div>

            {/* Popular Categories */}
            {popularCategories.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-sm font-medium text-[#5B6380] mb-4">Popular categories</p>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.slice(0, 5).map((category) => (
                    <Link
                      key={category.slug}
                      href={category.href}
                      className="px-4 py-2 rounded-full bg-[#1C2240] border border-[rgba(255,255,255,0.08)] hover:border-[#7C3AED] text-sm text-[#9CA3B8] hover:text-[#F0EBE3] transition"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Featured Prompt Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden xl:block"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#131729] border border-[rgba(255,255,255,0.08)] h-96 shadow-2xl hover:shadow-3xl transition duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20" />
              <div className="absolute inset-0 backdrop-blur-sm flex items-end">
                <div className="w-full p-6 bg-gradient-to-t from-[#0B0E1A] via-[#0B0E1A]/60 to-transparent">
                  <p className="text-xs font-medium text-[#7C3AED] mb-2">Featured Prompt</p>
                  <h3 className="text-lg font-clash font-bold text-[#F0EBE3] mb-2">Premium Editorial</h3>
                  <p className="text-sm text-[#9CA3B8]">High-end fashion photography prompt with professional lighting setup.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Hero({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  totalPrompts,
  categoriesCount,
  modelsCount,
  popularCategories = []
}) {
  return (
    <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10 xl:p-12">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)] xl:items-start">
        <div className="max-w-3xl">
          <span className="section-kicker text-brand-accent">AI Prompt Discovery</span>
          <h1 className="hero-fluid-title mt-4 max-w-[12.5ch] font-heading text-brand-ink sm:max-w-none sm:text-balance">
            Find photo prompts without digging through a cluttered feed
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-700 sm:text-[1.08rem]">
            Start with a category, narrow things down only when you need to, and open full prompt pages when you are ready to copy, save, or keep browsing.
          </p>

          <div className="mt-8 max-w-2xl">
            <SearchBar
              value={searchQuery}
              onChange={onSearchChange}
              onSubmit={onSearchSubmit}
              buttonLabel="Search prompts"
              placeholder="Search portrait, wedding, editorial, studio, ChatGPT..."
            />
          </div>

          {popularCategories.length ? (
            <div className="mt-5">
              <p className="ui-meta">Popular categories</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {popularCategories.slice(0, 5).map((category) => (
                  <Link key={category.slug} href={category.href} className="ui-tag text-sm">
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/categories" className="ui-button-primary">
              Browse categories
              <FaArrowRight className="text-xs" />
            </Link>
            <Link href="/prompts" className="ui-button-secondary">
              Open prompt archive
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="ui-card p-5 sm:p-6">
            <p className="section-kicker text-brand-accent">How To Browse</p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>1. Pick the category that best matches the subject or mood you want.</li>
              <li>2. Use search, model, aspect ratio, or tags to narrow the results if needed.</li>
              <li>3. Open any prompt page for the full text, copy tools, and more ideas in the same direction.</li>
            </ol>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="ui-panel p-4">
              <p className="ui-meta">Prompts</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink"><CountUpStat targetValue={totalPrompts} format="number" /></p>
              <p className="mt-2 text-sm text-slate-600">Prompt pages ready to browse</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Categories</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink"><CountUpStat targetValue={categoriesCount} format="number" /></p>
              <p className="mt-2 text-sm text-slate-600">Clear starting points</p>
            </div>
            <div className="ui-panel p-4">
              <p className="ui-meta">Models</p>
              <p className="mt-2 font-heading text-3xl text-brand-ink"><CountUpStat targetValue={modelsCount} format="number" /></p>
              <p className="mt-2 text-sm text-slate-600">Model collections available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
