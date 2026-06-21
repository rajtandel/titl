import { AnimateIn } from "../components/AnimateIn";
import { developers } from "../data/developers";

function IconExternalLink({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

export function Developers() {
  return (
    <div className="space-y-12">
      <AnimateIn>
        <header>
          <h1 className="page-title">The three developers</h1>
          <p className="page-lead">
            Thorpebury in the Limes is being delivered by three home builders. Details below are
            summarised from their public websites — confirm prices and opening times before you
            travel.
          </p>
        </header>
      </AnimateIn>

      <ol className="space-y-6">
        {developers.map((d, index) => (
          <AnimateIn key={d.id} as="li" delay={index * 100}>
            <article className="card-padded">
              <p className="text-xs font-semibold uppercase tracking-widest text-titl-accent">
                Developer {index + 1}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-titl-text sm:text-3xl">
                {d.name}
              </h2>
              <p className="mt-4 text-body-lg leading-relaxed text-titl-muted">{d.summary}</p>
              {(d.address || d.phone || d.hours) && (
                <dl className="mt-6 space-y-4 rounded-xl border border-titl-border/50 bg-titl-bg/80 px-5 py-5 text-[15px]">
                  {d.address ? (
                    <div>
                      <dt className="font-semibold text-titl-text">Address</dt>
                      <dd className="mt-1 text-titl-muted">{d.address}</dd>
                    </div>
                  ) : null}
                  {d.phone ? (
                    <div>
                      <dt className="font-semibold text-titl-text">Telephone</dt>
                      <dd className="mt-1">
                        <a className="link-accent" href={`tel:${d.phone.replace(/\s/g, "")}`}>
                          {d.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {d.hours ? (
                    <div>
                      <dt className="font-semibold text-titl-text">Opening hours</dt>
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
                  className="btn-primary gap-2 whitespace-nowrap"
                  aria-label={`Visit ${d.name} website`}
                >
                  <IconExternalLink className="shrink-0" />
                  <span>Visit site</span>
                </a>
              </div>
            </article>
          </AnimateIn>
        ))}
      </ol>
    </div>
  );
}
