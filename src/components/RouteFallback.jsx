import LoadingSkeleton from "./LoadingSkeleton";

function RouteFallback() {
  return (
    <section className="space-y-4">
      <div className="h-40 rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-soft">
        <div className="skeleton-shimmer h-6 w-1/3 rounded-lg" />
        <div className="mt-4 skeleton-shimmer h-4 w-2/3 rounded-lg" />
        <div className="mt-2 skeleton-shimmer h-4 w-1/2 rounded-lg" />
      </div>
      <div className="h-14 rounded-2xl border border-primary/10 bg-white/90 p-3 shadow-soft">
        <div className="skeleton-shimmer h-full w-full rounded-lg" />
      </div>
      <LoadingSkeleton count={6} />
    </section>
  );
}

export default RouteFallback;
