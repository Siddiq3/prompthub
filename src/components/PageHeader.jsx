function PageHeader({ eyebrow, title, description, meta, actions }) {
  return (
    <header className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
      {eyebrow && (
        <span className="section-kicker text-brand-accent">
          {eyebrow}
        </span>
      )}
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-balance font-heading text-[2.5rem] font-semibold tracking-tight text-brand-ink sm:text-[3.2rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-[1.02rem]">{description}</p>
        </div>
        {actions && <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
      </div>
      {meta?.length ? (
        <div className="mt-7 flex flex-wrap gap-2.5">
          {meta.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200/90 bg-white/84 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export default PageHeader;
