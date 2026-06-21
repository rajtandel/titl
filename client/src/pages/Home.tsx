import { Link } from "react-router-dom";
import { AnimateIn } from "../components/AnimateIn";
import { HeroBanner } from "../components/HeroBanner";
import { useAuth } from "../context/AuthContext";
import { developers } from "../data/developers";

export function Home() {
  const { user, ready } = useAuth();

  return (
    <div className="space-y-16 sm:space-y-24">
      <section aria-label="Thorpebury in the Limes">
        <HeroBanner />
        <div className="mt-10 text-center">
          <AnimateIn delay={200}>
            <span className="hero-badge">Thurmaston · Leicestershire</span>
          </AnimateIn>
          <AnimateIn delay={280}>
            <h1 className="page-title mt-6">Thorpebury in the Limes</h1>
          </AnimateIn>
          <AnimateIn delay={360}>
            <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-titl-muted sm:text-[21px]">
              Who is building where, trusted local contacts, and dates to remember — in one welcoming
              place. Day-to-day chat stays on WhatsApp.
            </p>
          </AnimateIn>
          <AnimateIn delay={440}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/developers" className="btn-primary min-w-[220px]">
                Developers
              </Link>
              <Link to="/contacts" className="btn-secondary min-w-[220px]">
                Trades &amp; services
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <AnimateIn>
        {!ready ? (
          <p className="text-center text-titl-muted">Checking your session…</p>
        ) : user ? (
          <p className="text-center text-body-lg text-titl-muted">
            Signed in as <span className="font-semibold text-titl-text">{user.name}</span>.
          </p>
        ) : (
          <p className="text-center text-body-lg text-titl-muted">
            <Link to="/register" className="link-accent">
              Register
            </Link>{" "}
            for an account, or{" "}
            <Link to="/login" className="link-accent">
              log in
            </Link>
            .
          </p>
        )}
      </AnimateIn>

      <section aria-labelledby="dev-heading" className="section-divider">
        <AnimateIn>
          <h2 id="dev-heading" className="section-title text-center">
            Builders on the estate
          </h2>
          <p className="mx-auto mt-3 max-w-readable text-center text-body-lg text-titl-muted">
            Three developers are active at Thorpebury in the Limes.
          </p>
        </AnimateIn>
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {developers.map((d, i) => (
            <AnimateIn key={d.id} as="li" delay={i * 80}>
              <article className="card card-interactive flex h-full flex-col p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-titl-accent/10 font-display text-lg font-semibold text-titl-accent">
                  {d.shortName.charAt(0)}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-titl-text">
                  {d.shortName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-titl-muted">{d.role}</p>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-accent mt-5 inline-block text-sm font-semibold"
                >
                  Learn more →
                </a>
              </article>
            </AnimateIn>
          ))}
        </ul>
        <AnimateIn>
          <p className="mt-8 text-center text-sm text-titl-muted">
            <Link to="/developers" className="link-accent">
              Full developer page
            </Link>
          </p>
        </AnimateIn>
      </section>

      <section
        className="grid gap-8 section-divider sm:grid-cols-2"
        aria-labelledby="quick-heading"
      >
        <AnimateIn>
          <div>
            <h2 id="quick-heading" className="section-title">
              WhatsApp groups
            </h2>
            <p className="mt-4 text-body-lg leading-relaxed text-titl-muted">
              Most neighbours use WhatsApp for recommendations, urgent help, and pre-loved sales.
              This site gathers slower-moving information in one place.
            </p>
          </div>
        </AnimateIn>
        <AnimateIn delay={100}>
          <div className="rounded-2xl border border-titl-border/50 bg-titl-surface/80 p-6 shadow-card backdrop-blur-sm sm:p-8">
            <h3 className="font-display text-lg font-semibold text-titl-text">Coming later</h3>
            <p className="mt-3 text-body-lg leading-relaxed text-titl-muted">
              Posts, photos, and community events — shared here for everyone to see.
            </p>
          </div>
        </AnimateIn>
      </section>

      <section className="grid gap-5 section-divider sm:grid-cols-2">
        <AnimateIn delay={0}>
          <Link
            to="/events"
            className="card card-interactive group flex min-h-[140px] items-center justify-center gap-3 p-8 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-titl-warm/15 text-2xl transition-transform duration-300 group-hover:scale-110">
              📅
            </span>
            <span className="font-display text-xl font-semibold text-titl-text">Events</span>
          </Link>
        </AnimateIn>
        <AnimateIn delay={80}>
          <Link
            to="/contacts"
            className="card card-interactive group flex min-h-[140px] items-center justify-center gap-3 p-8 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-titl-accent/15 text-2xl transition-transform duration-300 group-hover:scale-110">
              🤝
            </span>
            <span className="font-display text-xl font-semibold text-titl-text">Contacts</span>
          </Link>
        </AnimateIn>
      </section>
    </div>
  );
}
