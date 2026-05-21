"use client";

import { useEffect, useRef } from "react";

export default function HomeHeroClient({ totalPrompts = 204 }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();

      const dx =
        (e.clientX - rect.left - rect.width / 2) / rect.width;

      const dy =
        (e.clientY - rect.top - rect.height / 2) / rect.height;

      const max = 10;

      el.style.setProperty("--x-offset", `${dx * max}px`);
      el.style.setProperty("--y-offset", `${dy * max}px`);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return null;
}