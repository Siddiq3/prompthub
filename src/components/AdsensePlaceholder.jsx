function AdsensePlaceholder({ label = "AdSense Placeholder" }) {
  return (
    <div className="rounded-2xl border border-dashed border-primary/25 bg-white/82 px-4 py-6 text-center text-sm font-medium text-primary-dark/80 shadow-soft backdrop-blur">
      {label}
    </div>
  );
}

export default AdsensePlaceholder;
