import { communityEvents } from "../data/events";

export function Events() {
  const upcoming = communityEvents.filter((e) => e.status === "upcoming");
  const past = communityEvents.filter((e) => e.status === "past");

  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-titl-forest sm:text-4xl">
          Events
        </h1>
        <p className="mt-3 max-w-readable text-lg leading-relaxed text-titl-bark">
          Village fairs, sales office open days, and residents’ meetings can all be listed
          here. Below mixes sample entries with a past sales weekend from the public William
          Davis website so you can see how past items appear.
        </p>
      </header>

      <section aria-labelledby="upcoming-heading">
        <h2 id="upcoming-heading" className="font-serif text-2xl font-semibold text-titl-forest">
          Upcoming
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-lg text-titl-bark">No upcoming events listed yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {upcoming.map((e) => (
              <li key={e.id}>
                <article className="rounded-2xl border border-titl-sage/40 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-titl-forest sm:text-2xl">{e.title}</h3>
                  <p className="mt-2 text-lg font-medium text-titl-moss">{e.dateLabel}</p>
                  <p className="mt-1 text-lg text-titl-bark">{e.location}</p>
                  <p className="mt-3 text-lg leading-relaxed text-titl-bark">{e.description}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="past-heading">
        <h2 id="past-heading" className="font-serif text-2xl font-semibold text-titl-bark">
          Past
        </h2>
        <ul className="mt-4 space-y-3">
          {past.map((e) => (
            <li key={e.id}>
              <article className="rounded-xl border border-titl-sand bg-titl-cream/80 px-5 py-4">
                <h3 className="text-lg font-semibold text-titl-forest">{e.title}</h3>
                <p className="text-base text-titl-bark/90">{e.dateLabel}</p>
                <p className="mt-1 text-base text-titl-bark/85">{e.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
