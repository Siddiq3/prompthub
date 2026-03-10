function AdSlot({
  label = "Ad space",
  note = "Reserved for a future AdSense unit after approval. Keep the homepage content-first and avoid stacking ads too closely together.",
  variant = "banner",
  className = ""
}) {
  const heights = {
    banner: "min-h-[120px]",
    inline: "min-h-[160px]",
    rectangle: "min-h-[250px]"
  };

  return (
    <div
      className={`rounded-[1.9rem] border border-dashed border-slate-300/90 bg-white/62 px-5 py-5 text-center shadow-soft ${heights[variant] || heights.banner} ${className}`}
      aria-label="Advertisement placeholder"
      role="complementary"
    >
      {/* Replace this placeholder with publisher ad code after AdSense approval. */}
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(247,244,238,0.92),rgba(255,255,255,0.98))] px-4 py-6">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Sponsored Placement
        </span>
        <p className="max-w-xl text-sm leading-7 text-slate-600">{label}</p>
        <p className="max-w-2xl text-xs leading-6 text-slate-500">{note}</p>
      </div>
    </div>
  );
}

export default AdSlot;
