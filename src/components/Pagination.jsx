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
    <div className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white/90 p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-600">
        Showing <span className="font-semibold text-primary-dark">{from}</span>-
        <span className="font-semibold text-primary-dark">{to}</span> of{" "}
        <span className="font-semibold text-primary-dark">{totalItems}</span> {itemLabel}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 text-sm text-slate-600">
          <span>Per page</span>
          <select
            className="rounded-lg border border-primary/20 bg-white px-2 py-1 text-sm text-primary-dark outline-none transition focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/40"
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

        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-white text-primary-dark transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
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
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-semibold transition ${
                  item === currentPage
                    ? "bg-blue-900 text-white"
                    : "border border-primary/20 bg-white text-primary-dark hover:bg-blue-50"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-white text-primary-dark transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
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
