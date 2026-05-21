"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categoryEmojis } from "../lib/taxonomy";

export default function CategoryCards({ categories = [] }) {
  if (!categories || categories.length === 0) return null;

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
    <section className="bg-[#0B0E1A] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-clash font-bold text-[#F0EBE3] mb-3">
            Browse by Category
          </h2>
          <p className="text-lg text-[#9CA3B8] max-w-2xl">
            Explore prompts organized by subject, style, and mood
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {categories.slice(0, 9).map((category, idx) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link href={`/category/${category.slug}`} className="group">
                <motion.div
                  className="relative rounded-2xl overflow-hidden bg-[#131729] border border-[rgba(255,255,255,0.08)] h-64 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ borderColor: "rgba(124,58,237,0.5)", y: -4 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/30 via-[#1C2240] to-[#0B0E1A]" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div>
                      <div className="inline-block p-3 rounded-xl bg-[#1C2240] mb-4 group-hover:bg-[#7C3AED]/20 transition-colors">
                        <span className="text-2xl">
                          {categoryEmojis[category.name] || "📸"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-clash font-bold text-xl text-[#F0EBE3] group-hover:text-[#7C3AED] transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-[#9CA3B8]">
                        {category.count} prompts
                      </p>
                    </div>
                  </div>

                  {/* Hover arrow indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#7C3AED] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                    <span className="text-white text-sm">→</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/categories" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[rgba(255,255,255,0.16)] hover:bg-[#1C2240] text-[#F0EBE3] font-medium transition">
            View All Categories
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
