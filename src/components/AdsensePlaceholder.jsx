function AdsensePlaceholder({ label = "AdSense Placeholder" }) {
  return (
    <div className="rounded-xl border border-dashed border-primary/25 bg-white/88 px-4 py-6 text-center text-sm font-medium text-primary-dark/80 shadow-soft backdrop-blur dark:border-white/15 dark:bg-white/[0.03] dark:text-slate-300">
      {label}
    </div>
  );
}

export default AdsensePlaceholder;
