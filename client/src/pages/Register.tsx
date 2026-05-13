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
      <div className="mx-auto max-w-md rounded-2xl border border-titl-sand bg-white p-8 text-center text-lg text-titl-bark shadow-sm">
        Checking your session…
      </div>
    );
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md space-y-6 rounded-2xl border border-titl-sand bg-white p-8 shadow-sm">
        <h1 className="font-serif text-3xl font-semibold text-titl-forest">Already registered</h1>
        <p className="text-lg text-titl-bark">
          You are already signed in as <strong>{user.name}</strong>.
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
      <h1 className="font-serif text-3xl font-semibold text-titl-forest sm:text-4xl">Register</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-2xl border border-titl-sand bg-white p-6 shadow-sm">
        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-base text-red-900" role="alert">
            {error}
          </p>
        ) : null}

        <div>
          <label htmlFor="reg-name" className="block text-lg font-semibold text-titl-forest">
            Your name
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="mt-2 w-full rounded-lg border border-titl-sand px-4 py-3 text-lg text-titl-bark shadow-inner min-h-[52px]"
            required
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="block text-lg font-semibold text-titl-forest">
            Email
          </label>
          <input
            id="reg-email"
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
          <label htmlFor="reg-password" className="block text-lg font-semibold text-titl-forest">
            Password
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="mt-2 w-full rounded-lg border border-titl-sand px-4 py-3 text-lg text-titl-bark shadow-inner min-h-[52px]"
            minLength={6}
            required
            disabled={busy}
          />
        </div>

        <div>
          <label htmlFor="reg-confirm" className="block text-lg font-semibold text-titl-forest">
            Confirm password
          </label>
          <input
            id="reg-confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(ev) => setConfirm(ev.target.value)}
            className="mt-2 w-full rounded-lg border border-titl-sand px-4 py-3 text-lg text-titl-bark shadow-inner min-h-[52px]"
            minLength={6}
            required
            disabled={busy}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-titl-forest py-4 text-lg font-semibold text-white min-h-[52px] disabled:opacity-60"
        >
          {busy ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-lg text-titl-bark">
        Already registered?{" "}
        <Link to="/login" className="font-semibold text-titl-moss underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
