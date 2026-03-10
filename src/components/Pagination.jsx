import { useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const buildPageItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions = [12, 24, 36],
  itemLabel = "prompts"
}) {
  const pageItems = useMemo(
    () => buildPageItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  if (totalItems <= 0) {
    return null;
  }

  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white/92 p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-600">
        Showing <span className="font-semibold text-brand-ink">{from}</span>-
        <span className="font-semibold text-brand-ink">{to}</span> of{" "}
        <span className="font-semibold text-brand-ink">{totalItems}</span> {itemLabel}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onItemsPerPageChange ? (
          <label className="inline-flex items-center gap-2 text-sm text-slate-600">
          <span>Per page</span>
          <select
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-brand-ink outline-none transition focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/30"
            value={itemsPerPage}
            onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
            aria-label="Items per page"
          >
            {pageSizeOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          </label>
        ) : null}

        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-ink transition hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>

          {pageItems.map((item, index) =>
            item === "..." ? (
              <span key={`ellipsis-${index}`} className="px-1 text-sm text-slate-400">
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? "page" : undefined}
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold transition ${
                  item === currentPage
                    ? "bg-brand-ink text-white"
                    : "border border-slate-200 bg-white text-brand-ink hover:border-brand-accent hover:text-brand-accent"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-ink transition hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
