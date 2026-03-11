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
    <div className="section-shell flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm leading-7 text-slate-600 dark:text-slate-300">
        Showing <span className="font-semibold text-brand-ink">{from}</span>-
        <span className="font-semibold text-brand-ink">{to}</span> of{" "}
        <span className="font-semibold text-brand-ink">{totalItems}</span> {itemLabel}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onItemsPerPageChange ? (
          <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Per page</span>
            <select
              className="ui-select h-10 rounded-pill px-3 py-2"
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
            className="ui-icon-button h-10 w-10 disabled:pointer-events-none disabled:opacity-50"
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
                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-pill px-3 text-sm font-semibold transition-all duration-180 ease-smooth ${
                  item === currentPage
                    ? "border border-indigo-100 bg-indigo-50 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-200"
                    : "border border-slate-200 bg-white text-brand-ink hover:border-brand-accent/30 hover:text-brand-accent dark:border-slate-700 dark:bg-slate-900/82 dark:text-slate-100"
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
            className="ui-icon-button h-10 w-10 disabled:pointer-events-none disabled:opacity-50"
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
