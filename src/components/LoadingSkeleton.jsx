const heights = ["h-36", "h-48", "h-56", "h-44", "h-52", "h-40"];

function LoadingCard({ index }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4">
      <div className={`w-full rounded-xl bg-primary/10 ${heights[index % heights.length]} animate-pulse`} />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-primary/10" />
      <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-primary/10" />
      <div className="mt-4 flex gap-2">
        <div className="h-7 w-20 animate-pulse rounded-xl bg-primary/10" />
        <div className="h-7 w-16 animate-pulse rounded-xl bg-primary/10" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="h-9 animate-pulse rounded-xl bg-primary/10" />
        <div className="h-9 animate-pulse rounded-xl bg-primary/10" />
      </div>
    </div>
  );
}

function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-5 break-inside-avoid">
          <LoadingCard index={index} />
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;
