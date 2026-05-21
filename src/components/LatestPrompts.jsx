"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PromptCard from "./PromptCard";

export default function LatestPrompts({ prompts = [], onSave, onCopy, savedPrompts = [] }) {
  if (!prompts || prompts.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#0B0E1A] px-4 py-16 sm:px-6 lg:px-8 border-t border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <h2 className="text-4xl font-clash font-bold text-[#F0EBE3] mb-3">
              Latest Prompts
            </h2>
            <p className="text-lg text-[#9CA3B8]">
              Fresh additions to our library
            </p>
          </div>
          <Link href="/prompts" className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.16)] hover:bg-[#1C2240] text-[#F0EBE3] font-medium transition">
            View All
            <span>→</span>
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {prompts.slice(0, 6).map((prompt) => (
            <motion.div key={prompt.id} variants={itemVariants}>
              <PromptCard 
                prompt={prompt} 
                onSave={onSave}
                onCopy={onCopy}
                savedPrompts={savedPrompts}
                priority={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center sm:hidden"
        >
          <Link href="/prompts" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.16)] hover:bg-[#1C2240] text-[#F0EBE3] font-medium transition">
            View All Prompts
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
