export const metadata = {
  title: "Page Not Found - PhotoPromptsHub",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="mb-4 text-5xl font-bold text-brand-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-accent"
      >
        Back to Home
      </a>
    </div>
  );
}
