import { type ReactNode, type JSX } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
    </svg>
  );
}

function IconContacts({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
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
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
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
    "flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-[15px] transition-colors",
    isActive
      ? "bg-titl-divider font-medium text-titl-text"
      : "text-titl-muted hover:bg-titl-divider/60 hover:text-titl-text",
  ].join(" ");
}

function bottomNavLinkClass({ isActive }: { isActive: boolean }) {
  return [
    "flex min-h-[52px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-1 text-[10px] font-medium tracking-tight transition-colors",
    isActive ? "text-titl-text" : "text-titl-subtle",
  ].join(" ");
}

export function Layout({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();

  const authHeader = !ready ? (
    <span className="text-sm text-titl-subtle">Loading…</span>
  ) : user ? (
    <div className="flex items-center gap-3">
      <span
        className="hidden min-w-0 max-w-[10rem] truncate text-sm text-titl-muted sm:inline lg:max-w-[14rem]"
        title={user.name}
      >
        {user.name}
      </span>
      <button
        type="button"
        onClick={() => {
          void logout();
        }}
        className="text-sm font-medium text-titl-accent hover:underline"
      >
        Log out
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link to="/login" className="text-sm font-medium text-titl-muted hover:text-titl-text">
        Log in
      </Link>
      <Link to="/register" className="btn-primary !min-h-[36px] !px-4 !text-sm">
        Register
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-titl-bg pb-[5.5rem] lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-titl-surface focus:px-4 focus:py-3 focus:text-titl-text focus:shadow-card"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-titl-border/60 bg-titl-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-12 max-w-[1600px] items-center justify-between gap-4 px-4 lg:h-14 lg:px-8">
          <Link
            to="/"
            className="text-[21px] font-semibold tracking-tight text-titl-text transition-opacity hover:opacity-80"
          >
            TiTL
          </Link>

          <p className="hidden flex-1 text-center text-xs text-titl-subtle lg:block">
            Thorpebury in the Limes
          </p>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3">
            <ThemeToggle />
            {authHeader}
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1">
        <aside
          className="sticky top-12 hidden h-[calc(100vh-3rem)] w-[220px] shrink-0 flex-col lg:top-14 lg:flex lg:h-[calc(100vh-3.5rem)] lg:w-[240px]"
          aria-label="Main navigation"
        >
          <nav className="flex flex-col gap-0.5 px-4 py-8">
            {navItems.map(({ to, end, label, Icon }) => (
              <NavLink key={to} to={to} end={end} className={sidebarLinkClass}>
                <Icon className="shrink-0 opacity-80" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 flex-1">
            <main
              id="main"
              className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12 xl:pr-8"
            >
              <div className="mx-auto w-full max-w-content">{children}</div>
            </main>

            <aside
              className="sticky top-12 hidden h-[calc(100vh-3rem)] w-[240px] shrink-0 px-6 py-12 lg:top-14 lg:h-[calc(100vh-3.5rem)] xl:block"
              aria-label="Quick links"
            >
              <div className="space-y-8 text-sm">
                <div>
                  <p className="font-semibold text-titl-text">Explore</p>
                  <ul className="mt-3 space-y-2 text-titl-muted">
                    <li>
                      <Link to="/contacts" className="link-accent">
                        Local trades
                      </Link>
                    </li>
                    <li>
                      <Link to="/developers" className="link-accent">
                        Developers
                      </Link>
                    </li>
                    <li>
                      <Link to="/events" className="link-accent">
                        Events
                      </Link>
                    </li>
                  </ul>
                </div>
                <p className="leading-relaxed text-titl-subtle">
                  Urgent messages stay on WhatsApp. This site holds slower-moving community
                  information.
                </p>
              </div>
            </aside>
          </div>

          <footer className="border-t border-titl-border/60 bg-titl-bg py-10 text-center text-xs text-titl-subtle">
            <p className="mx-auto max-w-readable px-4 leading-relaxed">
              Unofficial community site for neighbours. Always verify trader insurance and
              references.
            </p>
            <p className="mt-4">
              Copyright © {new Date().getFullYear()} TiTL — Thorpebury in the Limes
            </p>
          </footer>
        </div>
      </div>

      <nav
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        aria-label="Bottom navigation"
      >
        <div className="pointer-events-auto border-t border-titl-border/80 bg-titl-surface/90 px-2 pt-1 shadow-nav backdrop-blur-xl pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          <div className="mx-auto flex max-w-lg items-stretch justify-between">
            {navItems.map(({ to, end, label, bottomLabel, Icon }) => (
              <NavLink key={to} to={to} end={end} className={bottomNavLinkClass}>
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <Icon className={isActive ? "text-titl-text" : "text-titl-subtle"} />
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
                  {ready && user ? (
                    <span
                      className={[
                        "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                        isActive ? "bg-titl-text text-titl-bg" : "bg-titl-divider text-titl-muted",
                      ].join(" ")}
                    >
                      {user.name.trim().charAt(0).toUpperCase() || "?"}
                    </span>
                  ) : (
                    <IconUser className={isActive ? "text-titl-text" : "text-titl-subtle"} />
                  )}
                  <span className="max-w-full truncate">{ready && user ? "You" : "Sign in"}</span>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
