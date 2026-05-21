import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const { register, user, ready } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
        <h1 className="page-title !text-3xl">Already registered.</h1>
        <p className="text-body-lg text-titl-muted">
          You are already signed in as <strong className="text-titl-text">{user.name}</strong>.
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
    if (password !== confirm) {
      setError("The two password fields do not match. Please try again.");
      return;
    }
    setBusy(true);
    try {
      const result = await register(name, email, password);
      if (result.ok) navigate("/");
      else setError(result.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="page-title">Register.</h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6 card-padded">
        {error ? (
          <p className="alert-error" role="alert">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="reg-name" className="label-field">
            Your name
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="input-field"
            required
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="label-field">
            Email
          </label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-password" className="label-field">
            Password
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="input-field"
            minLength={6}
            required
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="reg-confirm" className="label-field">
            Confirm password
          </label>
          <input
            id="reg-confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(ev) => setConfirm(ev.target.value)}
            className="input-field"
            minLength={6}
            required
            disabled={busy}
          />
        </div>

        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-titl-muted">
        Already registered?{" "}
        <Link to="/login" className="link-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}
