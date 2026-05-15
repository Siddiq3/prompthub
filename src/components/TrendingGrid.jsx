import Link from "next/link";
import SmartImage from "./SmartImage";

export default function TrendingGrid({ title, description, prompts }) {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>

      {/* Masonry Grid - 3 columns, 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
        {prompts.map((prompt, index) => (
          <div
            key={prompt.id}
            className={`group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-lg dark:hover:shadow-brand-primary/20 ${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
          >
            <Link
              href={`/prompt/${prompt.slug}`}
              className="block overflow-hidden"
            >
              {/* Image Container */}
              <div className={`relative bg-slate-100 dark:bg-slate-800 ${
                index === 0 ? "h-80 sm:h-full min-h-96" : "h-64"
              }`}>
                <SmartImage
                  src={prompt.previewImage}
                  alt={prompt.title}
                  title={prompt.title}
                  className="w-full h-full"
                  imageClassName="group-hover:scale-105 transition-transform duration-300"
                  aspectClassName=""
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <h3 className="text-white font-semibold text-lg line-clamp-2">
                  {prompt.title}
                </h3>
                {prompt.platform && (
                  <p className="text-slate-200 text-sm mt-2">
                    {prompt.platform}
                  </p>
                )}
              </div>
            </Link>

            {/* Card Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <Link
                href={`/prompt/${prompt.slug}`}
                className="text-slate-900 dark:text-white font-semibold text-sm hover:text-brand-primary dark:hover:text-brand-primary transition-colors line-clamp-1"
              >
                {prompt.title}
              </Link>
              {prompt.category && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {prompt.category}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center pt-8">
        <Link
          href="/prompts"
          className="inline-block px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          View All Trending Prompts →
        </Link>
      </div>
    </section>
  );
}
