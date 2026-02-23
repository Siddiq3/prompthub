import { FaRotateRight, FaTriangleExclamation } from "react-icons/fa6";

function ErrorState({ title = "Unable to load prompts", message, onRetry }) {
  return (
    <div className="rounded-3xl border border-primary/12 bg-white/86 p-8 text-center shadow-soft backdrop-blur">
      <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-dark">
        <FaTriangleExclamation />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-primary-dark">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-slate-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <FaRotateRight />
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;
