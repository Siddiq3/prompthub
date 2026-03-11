function PageHeader({ eyebrow, title, description, meta, actions }) {
  return (
    <header className="section-shell surface-subtle p-6 sm:p-7 lg:p-8">
      {eyebrow && (
        <span className="section-kicker text-brand-accent">
          {eyebrow}
        </span>
      )}
      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-3xl">
          <h1 className="text-balance font-heading text-[1.95rem] font-semibold tracking-tight text-brand-ink sm:text-[2.5rem] lg:text-[2.9rem]">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
            {description}
          </p>
        </div>
        {actions ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">{actions}</div>
        ) : null}
      </div>
      {meta?.length ? (
        <div className="mt-6 flex flex-wrap gap-2.5">
          {meta.map((item) => (
            <span key={item} className="ui-pill">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </header>
  );
}

export default PageHeader;
