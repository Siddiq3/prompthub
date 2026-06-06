import Link from "next/link";
import SmartImage from "./SmartImage";

export default function NewArrivalsGrid({ title, description, prompts }) {
  return (
    <section className="space-y-12">
      <div>
        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      {/* Responsive Grid - 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {prompts.map((prompt) => (
          <NewArrivalCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-8">
        <Link
          href="/prompts?sort=latest"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 group"
        >
          View All New Arrivals
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}

function NewArrivalCard({ prompt }) {
  return (
    <Link href={`/prompt/${prompt.slug}`}>
      <div className="group h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-500/20 bg-white dark:bg-slate-800 hover:scale-105 transform">
        {/* Image with 3:2 aspect ratio */}
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
          <SmartImage
            src={prompt.previewImage}
            alt={prompt.title}
            title={prompt.title}
            className="w-full h-full"
            imageClassName="group-hover:scale-105 transition-transform duration-500 object-contain"
            aspectClassName=""
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* New badge */}
          <div className="absolute top-2 right-2 z-20">
            <span className="inline-block px-2 py-1 bg-red-500 dark:bg-red-600 text-white text-xs font-bold rounded">
              NEW
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Category tag */}
          {prompt.category && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                {prompt.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {prompt.title}
          </h3>

          {/* Platform badge */}
          {prompt.platform && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {prompt.platform}
              </span>
              <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                →
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
