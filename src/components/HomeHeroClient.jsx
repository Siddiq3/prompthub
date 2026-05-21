"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatedStat } from "@/src/components/AnimatedStat";
import { fadeUp, staggerContainer } from "@/src/components/motion/variants";

export default function HomeHeroClient({ totalPrompts = 204 }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const max = 10;
      el.style.setProperty("--x-offset", `${dx * max}px`);
      el.style.setProperty("--y-offset", `${dy * max}px`);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#0B0E1A] py-16 sm:py-20"
      style={{ "--x-offset": "0px", "--y-offset": "0px" }}
    >
      <div
        className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full"
        style={{ background: "rgba(124, 58, 237, 0.15)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="xl:w-[60%]"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex rounded-full bg-[#7C3AED]/20 px-3 py-1 text-sm font-semibold text-[#7C3AED]">
              204+ Premium Prompts
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 className="mt-6 font-heading text-[80px] font-bold leading-[0.95] tracking-[-0.03em] text-[#F0EBE3] sm:text-[72px]">
              Create stunning AI images —
              <span className="block text-[#EC4899]">instantly.</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mt-5 max-w-2xl text-[18px] leading-8 text-[#9CA3B8]">
              Curated prompts for Midjourney, Flux, DALL·E & Stable Diffusion. Copy, paste, create.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
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
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AnimatedStat value="204" label="Prompts" />
            <AnimatedStat value="4" label="AI Models" />
            <AnimatedStat value="50K+" label="Creators" />
          </motion.div>
        </motion.div>

        <div className="xl:w-[40%]">
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="w-80 h-80 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
