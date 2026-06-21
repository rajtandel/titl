import { communityEvents } from "../data/events";
import { AnimateIn } from "../components/AnimateIn";

export function Events() {
  const upcoming = communityEvents.filter((e) => e.status === "upcoming");
  const past = communityEvents.filter((e) => e.status === "past");

  return (
    <div className="space-y-14">
      <AnimateIn>
        <header>
          <h1 className="page-title">Events</h1>
          <p className="page-lead">
            Village fairs, sales office open days, and residents&apos; meetings listed for the
            community.
          </p>
        </header>
      </AnimateIn>

      <section aria-labelledby="upcoming-heading">
        <AnimateIn>
          <h2 id="upcoming-heading" className="section-title">
            Upcoming
          </h2>
        </AnimateIn>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-body-lg text-titl-muted">No upcoming events listed yet.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {upcoming.map((e, i) => (
              <AnimateIn key={e.id} as="li" delay={i * 80}>
                <article className="card-padded">
                  <div className="flex flex-wrap items-start gap-3">
                    <span className="inline-flex rounded-full bg-titl-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-titl-accent">
                      Upcoming
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-titl-text sm:text-2xl">
                    {e.title}
                  </h3>
                  <p className="mt-2 font-semibold text-titl-warm">{e.dateLabel}</p>
                  <p className="mt-1 text-titl-muted">{e.location}</p>
                  <p className="mt-4 text-body-lg leading-relaxed text-titl-muted">
                    {e.description}
                  </p>
                </article>
              </AnimateIn>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <AnimateIn>
          <h2 id="past-heading" className="font-display text-xl font-semibold text-titl-muted">
            Past
          </h2>
        </AnimateIn>
        <ul className="mt-4 space-y-3">
          {past.map((e, i) => (
            <AnimateIn key={e.id} as="li" delay={i * 60}>
              <article className="rounded-xl border border-titl-border/40 bg-titl-divider/30 px-5 py-4 transition-colors hover:bg-titl-divider/50">
                <h3 className="font-semibold text-titl-text">{e.title}</h3>
                <p className="text-sm text-titl-muted">{e.dateLabel}</p>
                <p className="mt-1 text-sm text-titl-muted">{e.description}</p>
              </article>
            </AnimateIn>
          ))}
        </ul>
      </section>
    </div>
  );
}
