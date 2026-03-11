function NewsletterCard() {
  return (
    <section className="section-shell relative overflow-hidden bg-[linear-gradient(180deg,#ffffff,rgba(238,242,255,0.92))] p-6 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl" />
      <span className="section-kicker text-brand-accent">
        Growth Ready
      </span>
      <div className="relative mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.45rem]">
            Get future prompt drops in your inbox
          </h2>
          <p className="mt-4 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
            Email updates are planned for future prompt drops, editorial collections, and fresh AI photo prompt roundups. The signup UI is ready now and can be connected later without changing the homepage structure.
          </p>
        </div>
        <form className="ui-card flex w-full max-w-xl flex-col gap-3 p-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email for future updates"
            className="h-12 flex-1 rounded-pill border border-slate-200 bg-slate-50 px-5 text-sm text-brand-ink placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/25"
          />
          <button
            type="button"
            className="ui-button-primary h-12 px-6"
          >
            Notify Me Soon
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsletterCard;
