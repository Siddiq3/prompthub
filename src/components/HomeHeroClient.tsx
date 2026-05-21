'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';

interface HomeHeroClientProps {
  totalPrompts: number;
  totalModels: number;
}

const sampleImages = [
  'https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p001.webp',
  'https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p002.webp',
  'https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p003.webp',
];

export default function HomeHeroClient({ totalPrompts, totalModels }: HomeHeroClientProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (event.clientY - rect.top - rect.height / 2) / rect.height;
      const maxOffset = 10;
      el.style.setProperty('--x-offset', `${dx * maxOffset}px`);
      el.style.setProperty('--y-offset', `${dy * maxOffset}px`);
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#0B0E1A] py-16 sm:py-20"
      style={{ '--x-offset': '0px', '--y-offset': '0px' } as any}
    >
      <div
        className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full"
        style={{ background: 'rgba(124, 58, 237, 0.15)', filter: 'blur(80px)' }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center">
        <div className="xl:w-[60%]">
          <span className="inline-flex rounded-full bg-[#7C3AED]/20 px-3 py-1 text-sm font-semibold text-[#7C3AED]">
            204+ Premium Prompts
          </span>

          <h1 className="mt-6 font-heading text-[80px] font-bold leading-[0.95] tracking-[-0.03em] text-[#F0EBE3] sm:text-[72px]">
            Create stunning AI images —
            <span className="block text-[#EC4899]">instantly.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-[18px] leading-8 text-[#9CA3B8]">
            Curated prompts for Midjourney, Flux, DALL·E & Stable Diffusion. Copy, paste, create.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/prompts"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#7C3AED] px-7 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/20 transition hover:bg-[#6D28D9]"
            >
              Browse Prompts →
            </Link>
            <Link
              href="/categories"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/5 px-6 text-base font-semibold text-white transition hover:border-[#7C3AED] hover:bg-white/10"
            >
              View Categories
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[18px] border border-white/[0.08] bg-white/5 px-5 py-6 text-white">
              <div className="text-[40px] font-bold text-[#F0EBE3]">204</div>
              <div className="mt-2 text-sm uppercase tracking-[0.24em] text-[#9CA3B8]">Prompts</div>
            </div>
            <div className="rounded-[18px] border border-white/[0.08] bg-white/5 px-5 py-6 text-white">
              <div className="text-[40px] font-bold text-[#F0EBE3]">4</div>
              <div className="mt-2 text-sm uppercase tracking-[0.24em] text-[#9CA3B8]">AI Models</div>
            </div>
            <div className="rounded-[18px] border border-white/[0.08] bg-white/5 px-5 py-6 text-white">
              <div className="text-[40px] font-bold text-[#F0EBE3]">50K+</div>
              <div className="mt-2 text-sm uppercase tracking-[0.24em] text-[#9CA3B8]">Creators</div>
            </div>
          </div>
        </div>

        <div className="xl:w-[40%]">
          <div className="relative mx-auto h-[420px] w-full max-w-[360px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="absolute -left-8 top-8 h-56 w-40 overflow-hidden rounded-[20px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/40"
              style={{ transform: 'rotate(-2deg) translate(var(--x-offset), var(--y-offset))' }}
            >
              <img src={sampleImages[0]} alt="Midjourney preview" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 to-transparent" />
              <span className="absolute left-3 bottom-3 rounded-full bg-[#2D1B69]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A78BFA]">
                Midjourney
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="absolute left-10 top-24 h-64 w-48 overflow-hidden rounded-[20px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/40"
              style={{ transform: 'rotate(1deg) translate(calc(var(--x-offset) / 1.2), calc(var(--y-offset) / 1.2))' }}
            >
              <img src={sampleImages[1]} alt="Flux preview" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 to-transparent" />
              <span className="absolute left-3 bottom-3 rounded-full bg-[#0D3D2E]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#34D399]">
                Flux
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="absolute right-0 top-14 h-48 w-36 overflow-hidden rounded-[20px] border border-white/10 bg-slate-950 shadow-2xl shadow-black/40"
              style={{ transform: 'rotate(-1deg) translate(calc(var(--x-offset) / 1.4), calc(var(--y-offset) / 1.4))' }}
            >
              <img src={sampleImages[2]} alt="DALL·E preview" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 to-transparent" />
              <span className="absolute left-3 bottom-3 rounded-full bg-[#1E3A5F]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#60A5FA]">
                DALL·E
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string | number; label: string }) {
  return (
    <div className="rounded-[18px] border border-white/[0.08] bg-white/5 px-5 py-5 text-white shadow-sm">
      <div className="text-[40px] font-black text-[#F0EBE3]">{number}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.24em] text-[#9CA3B8]">{label}</div>
    </div>
  );
}
