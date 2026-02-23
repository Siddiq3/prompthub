const heights = ["h-36", "h-48", "h-56", "h-44", "h-52", "h-40"];

function LoadingCard({ index }) {
  return (
    <div className="fade-in-up overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-soft dark:border-white/10 dark:bg-white/[0.03]">
      <div className={`skeleton-shimmer w-full rounded-xl ${heights[index % heights.length]}`} />
      <div className="skeleton-shimmer mt-4 h-4 w-2/3 rounded" />
      <div className="skeleton-shimmer mt-2 h-3 w-1/2 rounded" />
      <div className="mt-4 flex gap-2">
        <div className="skeleton-shimmer h-7 w-20 rounded-xl" />
        <div className="skeleton-shimmer h-7 w-16 rounded-xl" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="skeleton-shimmer h-9 rounded-xl" />
        <div className="skeleton-shimmer h-9 rounded-xl" />
      </div>
    </div>
  );
}

function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <LoadingCard index={index} />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
