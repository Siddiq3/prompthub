import { FaRotateRight, FaTriangleExclamation } from "react-icons/fa6";

function ErrorState({ title = "Unable to load prompts", message, onRetry }) {
  return (
    <div className="rounded-xl border border-primary/12 bg-white/90 p-8 text-center shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-dark">
        <FaTriangleExclamation />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-primary-dark">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light/60"
        >
          <FaRotateRight />
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
