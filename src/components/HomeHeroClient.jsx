"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import StatsCounter from "./StatsCounter";

export default function HomeHeroClient({ totalPrompts = 204 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const mosaicRef = useRef(null);

  const sampleImages = [
    "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p001.webp",
    "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p002.webp",
    "https://cdn.jsdelivr.net/gh/Siddiq3/promtdata@latest/previews/p003.webp",
  ];

  useEffect(() => {
    const el = mosaicRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const max = 10; // px

      el.style.setProperty("--mx", `${-dx * max}px`);
      el.style.setProperty("--my", `${-dy * max}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-12" style={{ background: "#0B0E1A" }}>
      {/* Violet radial glow top-left */}
      <div className="pointer-events-none absolute -left-36 -top-20 h-72 w-72 rounded-full" style={{ background: "rgba(124,58,237,0.15)", filter: 'blur(60px)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[60%_40%] items-start">
          {/* Left column */}
          <div className="text-left">
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-[#7c3aed]/20 text-[#7c3aed] px-3 py-1 text-xs font-semibold">204+ Premium Prompts</span>
            </div>

            <h1 className="mt-6 font-heading font-bold text-[80px] leading-[0.95] text-[#F0EBE3]">
              Create stunning AI images —
              <span className="block text-[#EC4899]">instantly.</span>
            </h1>

            <p className="mt-4 max-w-xl text-[18px] text-[#9CA3B8]">
              Curated prompts for Midjourney, Flux, DALL·E & Stable Diffusion. Copy, paste, create.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/prompts" className="inline-flex h-12 items-center justify-center rounded-full bg-[#7c3aed] px-6 py-3 text-white text-lg font-semibold shadow-lg hover:bg-[#6d28d9] transition">
                Browse Prompts <span className="ml-3">→</span>
              </Link>

              <Link href="/categories" className="inline-flex h-12 items-center justify-center rounded-full border border-white/[0.06] px-5 py-3 text-[#F0EBE3] text-lg font-medium hover:bg-white/3 transition">
                View Categories
              </Link>
            </div>

            <div className="mt-8 w-full max-w-xl">
              <StatsCounter />
            </div>
          </div>

          {/* Right column - mosaic */}
          <div className="relative" ref={mosaicRef} style={{ ['--mx']: '0px', ['--my']: '0px' }}>
            <div className="relative h-full w-full" style={{ transform: 'translateZ(0)' }}>
              <div className="absolute right-0 top-0 h-[320px] w-[260px]" style={{ transform: 'translate(var(--mx), var(--my))' }}>
                <div className="relative h-full w-full">
                  <div className="absolute -left-6 -top-6 h-44 w-32 rounded-[16px] overflow-hidden shadow-lg" style={{ transform: 'rotate(-2deg)' }}>
                    <img src={sampleImages[0]} alt="preview-1" className="h-full w-full object-cover" />
                    <span className="absolute left-2 bottom-2 rounded-md bg-[#2d1b69] px-2 py-1 text-xs text-[#a78bfa]">Midjourney</span>
                  </div>

                  <div className="absolute left-10 top-12 h-48 w-36 rounded-[16px] overflow-hidden shadow-2xl" style={{ transform: 'rotate(1deg)' }}>
                    <img src={sampleImages[1]} alt="preview-2" className="h-full w-full object-cover" />
                    <span className="absolute left-2 bottom-2 rounded-md bg-[#0d3d2e] px-2 py-1 text-xs text-[#34d399]">Flux</span>
                  </div>

                  <div className="absolute left-24 top-4 h-40 w-28 rounded-[16px] overflow-hidden shadow-lg" style={{ transform: 'rotate(-1deg)' }}>
                    <img src={sampleImages[2]} alt="preview-3" className="h-full w-full object-cover" />
                    <span className="absolute left-2 bottom-2 rounded-md bg-[#1e3a5f] px-2 py-1 text-xs text-[#60a5fa]">DALL·E</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
