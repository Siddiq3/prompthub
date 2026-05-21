'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
// import { AnimatedStat } from '@/src/components/AnimatedStat';
import { fadeUp, staggerContainer } from '@/src/components/motion/variants';

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
  // Hero section completely hidden - return null
  return null;
}
