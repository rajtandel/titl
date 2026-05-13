import { type ReactNode, type JSX } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconDevelopers({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v0" />
      <path d="M9 12v0" />
      <path d="M9 15v0" />
      <path d="M9 18v0" />
    </svg>
  );
}

function IconContacts({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconEvents({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function IconUser({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
    </svg>
  );
}

type NavIcon = ({ className }: { className?: string }) => JSX.Element;

type NavItem = {
  to: "/" | "/developers" | "/contacts" | "/events";
  end: boolean;
  label: string;
  bottomLabel?: string;
  Icon: NavIcon;
};

const navItems: NavItem[] = [
  { to: "/", end: true, label: "Home", Icon: IconHome },
  { to: "/developers", end: false, label: "Developers", Icon: IconDevelopers },
  { to: "/contacts", end: false, label: "Contacts", Icon: IconContacts },
  { to: "/events", end: false, label: "View events", bottomLabel: "Events", Icon: IconEvents },
];

function sidebarLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
    isActive
      ? "bg-titl-forest text-white shadow-sm"
      : "text-titl-bark hover:bg-titl-sand/90",
  ].join(" ");
}

function bottomNavLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-xs font-semibold transition-colors",
    isActive ? "text-titl-forest" : "text-titl-bark/80",
  ].join(" ");
}

export function Layout({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();

  const authHeader = !ready ? (
    <span className="text-sm text-titl-bark/60">Loading…</span>
  ) : user ? (
    <div className="flex items-center gap-2">
      <span
        className="hidden min-w-0 max-w-[10rem] truncate text-sm text-titl-bark sm:inline lg:max-w-[14rem]"
        title={user.name}
      >
        {user.name}
      </span>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-titl-forest text-sm font-bold text-white lg:hidden"
        aria-hidden
      >
        {user.name.trim().charAt(0).toUpperCase() || "?"}
      </span>
      <button
        type="button"
        onClick={() => {
          void logout();
        }}
        className="inline-flex rounded-full border border-titl-sand bg-white px-3 py-2 text-sm font-semibold text-titl-forest shadow-sm sm:px-4"
      >
        Log out
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className="rounded-full border border-titl-sand bg-white px-3 py-2 text-sm font-semibold text-titl-forest shadow-sm min-h-[40px] flex items-center"
      >
        Log in
      </Link>
      <Link
        to="/register"
        className="rounded-full bg-titl-forest px-3 py-2 text-sm font-semibold text-white shadow-sm min-h-[40px] flex items-center"
      >
        Register
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-titl-cream pb-[5.75rem] lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-titl-forest focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-titl-sand bg-titl-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 lg:px-6">
          <Link
            to="/"
            className="flex min-h-[48px] min-w-0 flex-shrink-0 flex-col justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titl-moss"
          >
            <span className="text-lg font-bold tracking-tight text-titl-forest sm:text-xl">
              TiTL
            </span>
            <span className="truncate text-xs font-normal text-titl-bark/75 sm:text-sm">
              Thorpebury in the Limes
            </span>
          </Link>

          <div
            className="mx-4 hidden max-w-md flex-1 lg:block"
            role="search"
            aria-label="Site search (coming soon)"
          >
            <div className="rounded-full border border-titl-sand bg-white px-4 py-2.5 text-sm text-titl-bark/45 shadow-inner">
              Search TiTL…
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center justify-end gap-2">{authHeader}</div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1">
        <aside
          className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-[260px] shrink-0 flex-col border-r border-titl-sand bg-white lg:flex"
          aria-label="Main navigation"
        >
          <nav className="flex flex-col gap-0.5 p-4 pt-6">
            {navItems.map(({ to, end, label, Icon }) => (
              <NavLink key={to} to={to} end={end} className={sidebarLinkClass}>
                <Icon className="shrink-0 opacity-90" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 flex-1">
            <main
              id="main"
              className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:pr-6"
            >
              <div className="mx-auto w-full max-w-3xl xl:max-w-4xl">{children}</div>
            </main>

            <aside
              className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-[280px] shrink-0 border-l border-titl-sand bg-titl-cream/50 p-5 xl:block"
              aria-label="Community"
            >
              <div className="space-y-4">
                <div className="rounded-2xl border border-titl-sand bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-titl-forest">Thurmaston · Leics</p>
                  <p className="mt-2 text-sm leading-relaxed text-titl-bark/90">
                    Local contacts, builders, and dates in one place. Urgent chat stays on
                    WhatsApp.
                  </p>
                  <Link
                    to="/contacts"
                    className="mt-3 inline-flex text-sm font-semibold text-titl-moss underline-offset-2 hover:underline"
                  >
                    Browse trades →
                  </Link>
                </div>
                <div className="rounded-2xl border border-titl-sand bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-titl-forest">Developers</p>
                  <p className="mt-2 text-sm text-titl-bark/85">Who is building on the estate.</p>
                  <Link
                    to="/developers"
                    className="mt-3 inline-flex text-sm font-semibold text-titl-moss underline-offset-2 hover:underline"
                  >
                    View builders →
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <footer className="border-t border-titl-sand bg-titl-sand/40 py-8 text-center text-base text-titl-bark">
            <p className="mx-auto max-w-readable px-4">
              Unofficial community site for neighbours. WhatsApp remains the place for urgent
              messages and marketplace posts. Always verify trader insurance and references.
            </p>
            <p className="mt-3 text-sm text-titl-bark/80">
              © {new Date().getFullYear()} TiTL — Thorpebury in the Limes
            </p>
          </footer>
        </div>
      </div>

      <nav
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        aria-label="Bottom navigation"
      >
        <div className="pointer-events-auto mx-3 mb-3 flex items-stretch justify-between gap-1 rounded-[1.75rem] border border-titl-sand/90 bg-white/95 px-1.5 py-1.5 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md pb-[max(0.35rem,env(safe-area-inset-bottom))]">
          {navItems.map(({ to, end, label, bottomLabel, Icon }) => (
            <NavLink key={to} to={to} end={end} className={bottomNavLinkClass}>
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <span
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                      isActive ? "bg-titl-sand text-titl-forest" : "text-titl-bark/70",
                    ].join(" ")}
                  >
                    <Icon className="shrink-0" />
                  </span>
                  <span className="max-w-full truncate">{bottomLabel ?? label}</span>
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className={bottomNavLinkClass}
            aria-label={ready && user ? "Account" : "Sign in"}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-titl-sand text-titl-forest" : "text-titl-bark/70",
                  ].join(" ")}
                >
                  {ready && user ? (
                    <span className="text-xs font-bold text-titl-forest">
                      {user.name.trim().charAt(0).toUpperCase() || "?"}
                    </span>
                  ) : (
                    <IconUser className="shrink-0" />
                  )}
                </span>
                <span className="max-w-full truncate">{ready && user ? "You" : "Sign in"}</span>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
