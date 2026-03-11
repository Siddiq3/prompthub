import { Link } from "react-router-dom";

function FaqSection({ items = [], supportEmail, trustLinks = [] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-shell surface-subtle p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <div>
          <div className="max-w-2xl">
            <span className="section-kicker text-brand-accent">FAQ</span>
            <h2 className="mt-3 text-balance font-heading text-[2rem] font-semibold tracking-tight text-brand-ink sm:text-[2.45rem]">
              Common questions about browsing the library
            </h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-slate-600 sm:text-[1.02rem]">
              These answers are here to help first-time visitors understand how the site is organized and where to go next once they find a prompt they like.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {items.map((item) => (
              <details
                key={item.question}
                className="group ui-card px-5 py-4 transition-all duration-180 ease-smooth open:shadow-panel"
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
          <div className="ui-card p-5">
            <p className="ui-meta">Need help?</p>
            <p className="mt-3 text-lg font-semibold text-brand-ink">{supportEmail}</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              If you need help, feedback, or a correction, this is the fastest way to reach the site.
            </p>
          </div>
          <div className="ui-card p-5">
            <p className="ui-meta">Important Pages</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="ui-tag"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="ui-card p-5">
            <p className="ui-meta">Ad Experience</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Ad placements are kept in reserved spots so the main content stays readable and the homepage still feels like a real editorial page.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default FaqSection;
