import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { developers } from "../data/developers";

export function Home() {
  const { user, ready } = useAuth();

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-titl-forest via-titl-moss to-titl-sage px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12">
        <p className="text-lg font-medium text-white/90">Thurmaston · Leicestershire</p>
        <h1 className="mt-2 font-serif text-display font-semibold tracking-tight">
          Welcome to Thorpebury in the Limes
        </h1>
        <p className="mt-4 max-w-readable text-lg leading-relaxed text-white/95">
          TiTL is a calm, easy-to-read website for our growing community: who is building
          where, useful local contacts, and dates to remember. Day-to-day chat stays on
          WhatsApp — especially for emergencies and buying or selling items.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to="/developers"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-6 text-lg font-semibold text-titl-forest shadow-sm"
          >
            View the three developers
          </Link>
          <Link
            to="/contacts"
            className="inline-flex min-h-[52px] items-center justify-center rounded-xl border-2 border-white/80 px-6 text-lg font-semibold text-white"
          >
            Local trades &amp; services
          </Link>
        </div>
      </section>

      {!ready ? (
        <p className="rounded-xl border border-titl-sand bg-white px-4 py-4 text-lg text-titl-bark/80 shadow-sm">
          Checking your session…
        </p>
      ) : user ? (
        <p className="rounded-xl border border-titl-sage/40 bg-white px-4 py-4 text-lg text-titl-bark shadow-sm">
          You are signed in as <strong>{user.name}</strong>. More personalised features will
          arrive in a later version (posts, photos, and events).
        </p>
      ) : (
        <p className="rounded-xl border border-titl-sand bg-white px-4 py-4 text-lg text-titl-bark shadow-sm">
          <Link to="/register" className="font-semibold text-titl-moss underline-offset-4 hover:underline">
            Register
          </Link>{" "}
          for an account, or{" "}
          <Link to="/login" className="font-semibold text-titl-moss underline-offset-4 hover:underline">
            log in
          </Link>{" "}
          if you have already registered on this phone or computer.
        </p>
      )}

      <section aria-labelledby="dev-heading">
        <h2 id="dev-heading" className="font-serif text-2xl font-semibold text-titl-forest sm:text-3xl">
          Builders on the estate
        </h2>
        <p className="mt-2 max-w-readable text-lg text-titl-bark">
          Three developers are active at Thorpebury in the Limes. Tap a name for the official
          sales site and opening hours.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {developers.map((d) => (
            <li key={d.id}>
              <article className="flex h-full flex-col rounded-2xl border border-titl-sand bg-white p-5 shadow-sm">
                <h3 className="text-xl font-semibold text-titl-forest">{d.shortName}</h3>
                <p className="mt-2 flex-1 text-base text-titl-bark">{d.role}</p>
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-titl-forest px-4 text-base font-semibold text-white"
                >
                  Official website
                </a>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base text-titl-bark/85">
          <Link to="/developers" className="font-semibold text-titl-moss underline-offset-4 hover:underline">
            Full developer page
          </Link>{" "}
          with addresses and phone numbers where we have them.
        </p>
      </section>

      <section
        className="grid gap-6 rounded-2xl border border-titl-sand bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
        aria-labelledby="quick-heading"
      >
        <div>
          <h2 id="quick-heading" className="font-serif text-2xl font-semibold text-titl-forest">
            WhatsApp groups
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-titl-bark">
            Most neighbours use WhatsApp: the main group for recommendations, an emergency
            group for urgent help, and separate groups for pre-loved sales. This website does
            not replace those channels — it gathers slower-moving information in one place.
          </p>
        </div>
        <div className="rounded-xl bg-titl-cream p-5">
          <h3 className="text-lg font-semibold text-titl-forest">Coming later</h3>
          <p className="mt-2 text-lg leading-relaxed text-titl-bark">
            In a future version you will be able to post photos and short updates, a little
            like Nextdoor, and publish community events for others to see.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 sm:flex-row">
        <Link
          to="/events"
          className="flex-1 rounded-2xl border-2 border-titl-moss/30 bg-titl-cream px-6 py-8 text-center text-xl font-semibold text-titl-forest min-h-[56px] flex items-center justify-center"
        >
          Upcoming events
        </Link>
        <Link
          to="/contacts"
          className="flex-1 rounded-2xl border-2 border-titl-moss/30 bg-titl-cream px-6 py-8 text-center text-xl font-semibold text-titl-forest min-h-[56px] flex items-center justify-center"
        >
          Trusted contacts
        </Link>
      </section>
    </div>
  );
}
