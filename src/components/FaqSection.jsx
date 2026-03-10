import { Link } from "react-router-dom";

function FaqSection({ items = [], supportEmail, trustLinks = [] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <div>
          <div className="max-w-2xl">
            <span className="section-kicker text-brand-accent">FAQ</span>
            <h2 className="mt-4 font-heading text-[2.35rem] font-semibold tracking-tight text-brand-ink sm:text-[2.8rem]">
              Answers for creators researching AI photo prompts
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-[1.02rem]">
              These quick answers help first-time visitors understand how to browse the library, copy prompts, and move into categories, collections, and detail pages with confidence.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-[1.5rem] border border-slate-200/90 bg-white/82 px-5 py-4 transition open:shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40">
                  <span>{item.question}</span>
                  <span className="text-brand-accent transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="grid gap-4">
          <div className="rounded-[1.7rem] border border-slate-200/90 bg-white/88 p-5 shadow-soft">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Need help?
            </p>
            <p className="mt-3 text-lg font-semibold text-brand-ink">{supportEmail}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Contact and policy routes are visible so users, search engines, and ad reviewers can understand how the platform operates.
            </p>
          </div>
          <div className="rounded-[1.7rem] border border-slate-200/90 bg-white/88 p-5 shadow-soft">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Important Pages
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 transition hover:border-brand-accent hover:text-brand-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-[1.7rem] border border-slate-200/90 bg-white/88 p-5 shadow-soft">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Ad Experience
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Homepage advertising is intentionally limited to reserved placements below key content sections, keeping the page readable and content-led for both visitors and approval reviews.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default FaqSection;
