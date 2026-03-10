function NewsletterCard() {
  return (
    <section className="relative overflow-hidden rounded-[2.35rem] border border-slate-200 bg-[linear-gradient(135deg,#132238,#1b3147_58%,#244561)] p-6 text-white shadow-lift sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute right-[-4rem] top-[-3rem] h-40 w-40 rounded-full bg-brand-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-3rem] left-[-2rem] h-32 w-32 rounded-full bg-white/8 blur-3xl" />
      <span className="section-kicker text-brand-gold">
        Growth Ready
      </span>
      <div className="relative mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-heading text-[2.35rem] font-semibold tracking-tight sm:text-[2.8rem]">
            Get future prompt drops in your inbox
          </h2>
          <p className="mt-4 text-sm leading-8 text-slate-200 sm:text-[1.02rem]">
            Email updates are planned for future prompt drops, editorial collections, and fresh AI photo prompt roundups. The signup UI is ready now and can be connected later without changing the homepage structure.
          </p>
        </div>
        <form className="flex w-full max-w-xl flex-col gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email for future updates"
            className="h-12 flex-1 rounded-full border border-white/12 bg-white/10 px-5 text-sm text-white placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40"
          />
          <button
            type="button"
            className="h-12 rounded-full bg-brand-gold px-6 text-sm font-semibold text-brand-ink transition hover:translate-y-[-1px] hover:bg-brand-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40"
          >
            Notify Me Soon
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsletterCard;
