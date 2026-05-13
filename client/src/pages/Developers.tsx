import { developers } from "../data/developers";

function accentRingClass(accent: (typeof developers)[number]["accent"]) {
  if (accent === "forest") return "ring-titl-forest";
  if (accent === "moss") return "ring-titl-moss";
  return "ring-titl-sage";
}

export function Developers() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl font-semibold text-titl-forest sm:text-4xl">
          The three developers
        </h1>
        <p className="mt-3 max-w-readable text-lg leading-relaxed text-titl-bark">
          Thorpebury in the Limes is being delivered by three national and regional home
          builders. Details below are taken from or summarised from their public websites —
          always confirm prices, offers, and opening times before you travel.
        </p>
      </header>

      <ol className="space-y-8">
        {developers.map((d, index) => (
          <li key={d.id}>
            <article
              className={`rounded-2xl border border-titl-sand bg-white p-6 shadow-md ring-2 ring-offset-2 ring-offset-titl-cream sm:p-8 ${accentRingClass(d.accent)}`}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-titl-bark/70">
                Developer {index + 1}
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-titl-forest sm:text-3xl">
                {d.name}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-titl-bark">{d.summary}</p>
              {(d.address || d.phone || d.hours) && (
                <dl className="mt-5 space-y-2 rounded-xl bg-titl-cream p-4 text-base">
                  {d.address ? (
                    <div>
                      <dt className="font-semibold text-titl-forest">Address</dt>
                      <dd>{d.address}</dd>
                    </div>
                  ) : null}
                  {d.phone ? (
                    <div>
                      <dt className="font-semibold text-titl-forest">Telephone</dt>
                      <dd>
                        <a className="text-titl-moss underline" href={`tel:${d.phone.replace(/\s/g, "")}`}>
                          {d.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {d.hours ? (
                    <div>
                      <dt className="font-semibold text-titl-forest">Opening hours</dt>
                      <dd>{d.hours}</dd>
                    </div>
                  ) : null}
                </dl>
              )}
              <div className="mt-6">
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-titl-forest px-6 text-lg font-semibold text-white sm:w-auto"
                >
                  Open {d.shortName} website
                </a>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
