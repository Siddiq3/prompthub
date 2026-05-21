import { useEffect, useRef, useState } from "react";

function useCountUp(target, when) {
  const [value, setValue] = useState(0);
  const raf = useRef();

  useEffect(() => {
    if (!when) return;
    let start = null;
    const duration = 1200;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, when]);

  return value;
}

export default function StatsCounter() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  const prompts = useCountUp(204, visible);
  const models = useCountUp(4, visible);
  const creators = useCountUp(50000, visible);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 sm:gap-8">
      <div className="flex items-center gap-4">
        <div className="text-3xl sm:text-5xl font-extrabold text-[#F0EBE3]">
          {prompts.toLocaleString()}
        </div>
        <div>
          <div className="text-sm text-[#9CA3B8]">Prompts</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-3xl sm:text-5xl font-extrabold text-[#F0EBE3]">
          {models}
        </div>
        <div>
          <div className="text-sm text-[#9CA3B8]">AI Models</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-3xl sm:text-5xl font-extrabold text-[#F0EBE3]">
          {creators >= 1000 ? `${Math.floor(creators / 1000)}K+` : creators}
        </div>
        <div>
          <div className="text-sm text-[#9CA3B8]">Creators</div>
        </div>
      </div>
    </div>
  );
}
