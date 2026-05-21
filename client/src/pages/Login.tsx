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
      <div className="mx-auto max-w-md card-padded text-center text-titl-muted">
        Checking your session…
      </div>
    );
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md space-y-6 card-padded text-center">
        <h1 className="page-title !text-3xl">You are signed in.</h1>
        <p className="text-body-lg text-titl-muted">
          Hello, <strong className="text-titl-text">{user.name}</strong>. Use{" "}
          <strong className="text-titl-text">Log out</strong> in the menu when you are finished.
        </p>
        <Link to="/" className="link-accent inline-block">
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
      <h1 className="page-title">Log in.</h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 card-padded">
        {error ? (
          <p className="alert-error" role="alert">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="login-email" className="label-field">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="input-field"
            required
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="login-password" className="label-field">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="input-field"
            minLength={6}
            required
            disabled={busy}
          />
          <p className="mt-2 text-sm text-titl-subtle">At least six characters.</p>
        </div>

        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? "Signing in…" : "Log in"}
        </button>
      </form>

      <p className="mt-8 text-center text-titl-muted">
        No account yet?{" "}
        <Link to="/register" className="link-accent">
          Register
        </Link>
      </p>
    </div>
  );
}
