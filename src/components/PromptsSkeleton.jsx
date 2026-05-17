// Skeleton loading state for prompts grid
export function PromptsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Sidebar Skeleton */}
      <aside className="lg:col-span-1">
        <div className="sticky top-20 space-y-4">
          {/* Search skeleton */}
          <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
          
          {/* Filter sections skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-24" />
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-4 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-32" />
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="lg:col-span-3">
        {/* Results info skeleton */}
        <div className="mb-6 h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-40" />

        {/* Ad slot skeleton */}
        <div className="mb-6 h-24 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />

        {/* Prompts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 animate-pulse"
            >
              {/* Image skeleton */}
              <div className="aspect-video bg-slate-300 dark:bg-slate-700" />

              {/* Card content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
