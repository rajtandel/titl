import { communityEvents } from "../data/events";

export function Events() {
  const upcoming = communityEvents.filter((e) => e.status === "upcoming");
  const past = communityEvents.filter((e) => e.status === "past");

  return (
    <div className="space-y-14">
      <header>
        <h1 className="page-title">Events.</h1>
        <p className="page-lead">
          Village fairs, sales office open days, and residents&apos; meetings listed for the
          community.
        </p>
      </header>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="section-title">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-body-lg text-titl-muted">No upcoming events listed yet.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {upcoming.map((e) => (
              <li key={e.id}>
                <article className="card-padded">
                  <h3 className="text-xl font-semibold text-titl-text sm:text-2xl">{e.title}</h3>
                  <p className="mt-2 font-medium text-titl-accent">{e.dateLabel}</p>
                  <p className="mt-1 text-titl-muted">{e.location}</p>
                  <p className="mt-4 text-body-lg leading-relaxed text-titl-muted">
                    {e.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading" className="text-xl font-semibold text-titl-muted">
          Past
        </h2>
        <ul className="mt-4 space-y-3">
          {past.map((e) => (
            <li key={e.id}>
              <article className="rounded-xl bg-titl-divider/40 px-5 py-4">
                <h3 className="font-semibold text-titl-text">{e.title}</h3>
                <p className="text-sm text-titl-muted">{e.dateLabel}</p>
                <p className="mt-1 text-sm text-titl-muted">{e.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
