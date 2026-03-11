import { Link } from "react-router-dom";

function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${item.to}`} className="flex items-center gap-2.5">
              {index > 0 && <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">/</span>}
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="inline-flex items-center rounded-pill border border-indigo-100 bg-indigo-50 px-3 py-1.5 font-medium text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-200"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="inline-flex items-center rounded-pill border border-slate-200 bg-white px-3 py-1.5 text-slate-600 transition-all duration-180 ease-smooth hover:border-brand-accent/30 hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25 dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-200"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
