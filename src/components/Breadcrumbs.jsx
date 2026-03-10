import { Link } from "react-router-dom";

function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${item.to}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isCurrent ? (
                <span aria-current="page" className="font-medium text-slate-800">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
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
