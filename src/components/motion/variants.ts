import type { Variants } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] } },
} as Variants;

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
} as Variants;

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } },
} as Variants;

export const slideInLeft = (i: number) => ({
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { delay: i * 0.08, duration: 0.4 } },
});
