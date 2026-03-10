import { FaRotateRight, FaTriangleExclamation } from "react-icons/fa6";

function ErrorState({ title = "Unable to load prompts", message, onRetry }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-8 text-center shadow-soft backdrop-blur">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-ink">
        <FaTriangleExclamation />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-brand-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40"
        >
          <FaRotateRight />
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
