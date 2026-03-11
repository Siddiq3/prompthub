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
      className={`rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/80 px-5 py-5 text-center ${heights[variant] || heights.banner} ${className}`}
      aria-label="Advertisement placeholder"
      role="complementary"
    >
      {/* Replace this placeholder with publisher ad code after AdSense approval. */}
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-[1.35rem] border border-slate-200 bg-white px-4 py-6 shadow-soft">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Sponsored Placement
        </span>
        <p className="max-w-xl text-sm font-semibold leading-7 text-brand-ink">{label}</p>
        <p className="max-w-2xl text-xs leading-6 text-slate-500">{note}</p>
      </div>
    </div>
  );
}

export default AdSlot;
