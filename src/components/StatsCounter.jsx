"use client";

import { useState, useEffect } from "react";

export default function StatsCounter() {
  const [counts, setCounts] = useState({ prompts: 0, tools: 0 });

  useEffect(() => {
    // Animate counters to final values
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounts({
        prompts: Math.floor(100 * progress),
        tools: Math.floor(5 * progress),
      });

      if (progress === 1) clearInterval(interval);
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 sm:gap-8">
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {counts.prompts}+
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Prompts
        </p>
      </div>
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          {counts.tools}
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          AI Tools
        </p>
      </div>
      <div className="text-center">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Free
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Forever
        </p>
      </div>
    </div>
  );
}
