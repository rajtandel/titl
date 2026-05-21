import { developers } from "../data/developers";

export function Developers() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="page-title">The three developers.</h1>
        <p className="page-lead">
          Thorpebury in the Limes is being delivered by three home builders. Details below are
          summarised from their public websites — confirm prices and opening times before you
          travel.
        </p>
      </header>

      <ol className="space-y-6">
        {developers.map((d, index) => (
          <li key={d.id}>
            <article className="card-padded">
              <p className="text-xs font-medium uppercase tracking-wider text-titl-subtle">
                Developer {index + 1}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-titl-text sm:text-3xl">
                {d.name}
              </h2>
              <p className="mt-4 text-body-lg leading-relaxed text-titl-muted">{d.summary}</p>
              {(d.address || d.phone || d.hours) && (
                <dl className="mt-6 space-y-4 rounded-xl bg-titl-bg px-5 py-5 text-[15px]">
                  {d.address ? (
                    <div>
                      <dt className="font-medium text-titl-text">Address</dt>
                      <dd className="mt-1 text-titl-muted">{d.address}</dd>
                    </div>
                  ) : null}
                  {d.phone ? (
                    <div>
                      <dt className="font-medium text-titl-text">Telephone</dt>
                      <dd className="mt-1">
                        <a
                          className="link-accent"
                          href={`tel:${d.phone.replace(/\s/g, "")}`}
                        >
                          {d.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {d.hours ? (
                    <div>
                      <dt className="font-medium text-titl-text">Opening hours</dt>
                      <dd className="mt-1 text-titl-muted">{d.hours}</dd>
                    </div>
                  ) : null}
                </dl>
              )}
              <div className="mt-8">
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
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
