import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login, user, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!ready) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-titl-sand bg-white p-8 text-center text-lg text-titl-bark shadow-sm">
        Checking your session…
      </div>
    );
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-titl-sand bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-semibold text-titl-forest">You are signed in</h1>
        <p className="text-lg text-titl-bark">
          Hello, <strong>{user.name}</strong>. Use <strong>Log out</strong> in the menu when
          you are finished on this device.
        </p>
        <Link to="/" className="inline-flex min-h-[48px] items-center text-lg font-semibold text-titl-moss underline">
          Back to home
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await login(email, password);
      if (result.ok) navigate("/");
      else setError(result.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-serif text-3xl font-semibold text-titl-forest sm:text-4xl">Log in</h1>
      <p className="mt-3 text-lg text-titl-bark">
        Your account is stored in the community MongoDB database. The server sets a secure
        HTTP-only cookie in this browser after a successful sign-in.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-titl-sand bg-white p-6 shadow-sm">
        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-base text-red-900" role="alert">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="login-email" className="block text-lg font-semibold text-titl-forest">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="mt-2 w-full rounded-lg border border-titl-sand px-4 py-3 text-lg text-titl-bark shadow-inner min-h-[52px]"
            required
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="login-password" className="block text-lg font-semibold text-titl-forest">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="mt-2 w-full rounded-lg border border-titl-sand px-4 py-3 text-lg text-titl-bark shadow-inner min-h-[52px]"
            minLength={6}
            required
            disabled={busy}
          />
          <p className="mt-2 text-base text-titl-bark/80">At least six characters.</p>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-titl-forest py-4 text-lg font-semibold text-white min-h-[52px] disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-lg text-titl-bark">
        No account yet?{" "}
        <Link to="/register" className="font-semibold text-titl-moss underline">
          Register
        </Link>
      </p>
    </div>
  );
}
