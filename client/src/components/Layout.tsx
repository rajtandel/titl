import { type ReactNode, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-lg px-3 py-2 text-base font-medium transition-colors min-h-[48px] flex items-center justify-center sm:justify-start",
    isActive
      ? "bg-titl-forest text-white"
      : "text-titl-forest hover:bg-titl-sand/80",
  ].join(" ");

const bottomNavClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-sm font-medium min-h-[52px]",
    isActive ? "text-titl-forest bg-titl-sand/50" : "text-titl-bark",
  ].join(" ");

export function Layout({ children }: { children: ReactNode }) {
  const { user, ready, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex min-h-screen flex-col pb-[4.5rem] sm:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-titl-forest focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-titl-sand bg-titl-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link
            to="/"
            className="flex min-h-[48px] min-w-[48px] flex-col justify-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-titl-moss"
            onClick={closeMenu}
          >
            <span className="text-lg font-bold tracking-tight text-titl-forest sm:text-xl">
              TiTL
            </span>
            <span className="text-sm font-normal text-titl-bark/80">
              Thorpebury in the Limes
            </span>
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            <nav className="flex flex-wrap items-center justify-end gap-1" aria-label="Main">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/developers" className={navLinkClass}>
                Developers
              </NavLink>
              <NavLink to="/contacts" className={navLinkClass}>
                Contacts
              </NavLink>
              <NavLink to="/events" className={navLinkClass}>
                Events
              </NavLink>
            </nav>
            {!ready ? (
              <div className="ml-2 border-l border-titl-sand pl-3">
                <span className="text-sm text-titl-bark/60">Loading…</span>
              </div>
            ) : user ? (
              <div className="ml-2 flex items-center gap-2 border-l border-titl-sand pl-3">
                <span className="max-w-[10rem] truncate text-sm text-titl-bark">
                  Hello, {user.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    void logout();
                  }}
                  className="rounded-lg border border-titl-moss px-3 py-2 text-sm font-semibold text-titl-forest min-h-[48px]"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="ml-2 flex gap-2 border-l border-titl-sand pl-3">
                <NavLink
                  to="/login"
                  className="rounded-lg border border-titl-moss px-3 py-2 text-sm font-semibold text-titl-forest min-h-[48px] flex items-center"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-lg bg-titl-forest px-3 py-2 text-sm font-semibold text-white min-h-[48px] flex items-center"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-titl-sand text-titl-forest sm:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen ? (
          <div
            id="mobile-menu"
            className="border-t border-titl-sand bg-titl-cream px-4 py-3 sm:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile main">
              <NavLink to="/" end className={navLinkClass} onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink to="/developers" className={navLinkClass} onClick={closeMenu}>
                Developers
              </NavLink>
              <NavLink to="/contacts" className={navLinkClass} onClick={closeMenu}>
                Contacts
              </NavLink>
              <NavLink to="/events" className={navLinkClass} onClick={closeMenu}>
                Events
              </NavLink>
              {!ready ? (
                <p className="px-3 py-2 text-base text-titl-bark/70">Loading…</p>
              ) : user ? (
                <>
                  <p className="px-3 py-2 text-base text-titl-bark">Signed in as {user.name}</p>
                  <button
                    type="button"
                    className="rounded-lg border border-titl-moss px-3 py-3 text-left text-base font-semibold text-titl-forest"
                    onClick={() => {
                      void logout();
                      closeMenu();
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                    Log in
                  </NavLink>
                  <NavLink to="/register" className={navLinkClass} onClick={closeMenu}>
                    Register
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-titl-sand bg-titl-sand/40 py-8 text-center text-base text-titl-bark">
        <p className="mx-auto max-w-readable px-4">
          Unofficial community site for neighbours. WhatsApp remains the place for urgent
          messages and marketplace posts. Always verify trader insurance and references.
        </p>
        <p className="mt-3 text-sm text-titl-bark/80">
          © {new Date().getFullYear()} TiTL — Thorpebury in the Limes
        </p>
      </footer>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-titl-sand bg-titl-cream/98 pb-[env(safe-area-inset-bottom)] sm:hidden"
        aria-label="Bottom navigation"
      >
        <NavLink to="/" end className={bottomNavClass} onClick={closeMenu}>
          <span className="text-xs uppercase tracking-wide text-titl-bark/70">Start</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/developers" className={bottomNavClass} onClick={closeMenu}>
          <span className="text-xs uppercase tracking-wide text-titl-bark/70">New</span>
          <span>Homes</span>
        </NavLink>
        <NavLink to="/contacts" className={bottomNavClass} onClick={closeMenu}>
          <span className="text-xs uppercase tracking-wide text-titl-bark/70">Local</span>
          <span>Trades</span>
        </NavLink>
        <NavLink to="/events" className={bottomNavClass} onClick={closeMenu}>
          <span className="text-xs uppercase tracking-wide text-titl-bark/70">What's</span>
          <span>On</span>
        </NavLink>
        <NavLink to={ready && user ? "/" : "/login"} className={bottomNavClass} onClick={closeMenu}>
          <span className="text-xs uppercase tracking-wide text-titl-bark/70">Your</span>
          <span>{ready && user ? "Account" : "Sign in"}</span>
        </NavLink>
      </nav>
    </div>
  );
}
