'use client';

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-slate-200 overflow-hidden">
      <div className="bg-slate-300 aspect-square" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-300 rounded w-3/4" />
        <div className="h-3 bg-slate-300 rounded w-1/2" />
        <div className="h-3 bg-slate-300 rounded w-full" />
        <div className="h-3 bg-slate-300 rounded w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHeader() {
  return (
    <div className="animate-pulse space-y-4 mb-8">
      <div className="h-10 bg-slate-300 rounded w-1/3" />
      <div className="h-4 bg-slate-300 rounded w-2/3" />
    </div>
  );
}

export function SkeletonCategoryCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-slate-200">
      <div className="bg-slate-300 h-48 w-full" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-slate-300 rounded w-2/3" />
        <div className="h-3 bg-slate-300 rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonCategoryGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCategoryCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHeroSection() {
  return (
    <div className="animate-pulse max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-6">
      <div className="h-12 bg-slate-300 rounded w-2/3" />
      <div className="h-6 bg-slate-300 rounded w-1/2" />
      <div className="flex gap-4 mt-8">
        <div className="h-12 bg-slate-300 rounded w-40" />
        <div className="h-12 bg-slate-300 rounded w-40" />
      </div>
    </div>
  );
}

export function SkeletonTrendingCarousel() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-slate-300 rounded w-1/4" />
        <div className="h-80 bg-slate-300 rounded-3xl" />
        <div className="flex gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 w-24 bg-slate-300 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonPromptDetailPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
        {/* Left: Image */}
        <div className="relative lg:sticky lg:top-16 h-80 sm:h-96 lg:h-[calc(100vh-64px)] bg-slate-200 animate-pulse" />

        {/* Right: Content */}
        <div className="flex flex-col lg:overflow-y-auto lg:h-[calc(100vh-64px)]">
          {/* Header */}
          <div className="border-b border-slate-200 px-6 lg:px-8 py-8 animate-pulse space-y-4">
            <div className="h-4 bg-slate-300 rounded w-1/2" />
            <div className="h-8 bg-slate-300 rounded w-2/3" />
            <div className="h-4 bg-slate-300 rounded w-1/3" />
          </div>

          {/* Actions */}
          <div className="flex-1 px-6 lg:px-8 py-8 space-y-6 animate-pulse">
            <div className="space-y-3">
              <div className="h-12 bg-slate-300 rounded-full" />
              <div className="h-12 bg-slate-300 rounded-full" />
              <div className="h-12 bg-slate-300 rounded-full" />
            </div>
            <div className="h-48 bg-slate-300 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
