'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInScale } from './motion/variants';

export function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = numericValue / (duration / 16);
    const timer = window.setInterval(() => {
      start += step;
      if (start >= numericValue) {
        setDisplay(numericValue);
        window.clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/5 rounded-2xl p-6"
    >
      <p className="text-3xl font-bold text-white">{display}{suffix}</p>
      <p className="text-sm uppercase tracking-widest text-white/50 mt-1">{label}</p>
    </motion.div>
  );
}
