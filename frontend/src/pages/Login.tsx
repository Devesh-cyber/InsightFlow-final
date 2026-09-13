import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  return (
  <AuthLayout>

    {/* Header */}
    <div className="mb-8">
      <div className="mb-6">
        <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          Insight<span className="text-[var(--color-brand-blue)]">Flow</span>
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        Welcome back
      </h1>

      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Sign in to continue to your workspace.
      </p>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        {error}
      </div>
    )}

    {/* Login Form */}
    <form onSubmit={handleLogin} className="space-y-5">

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-medium text-[var(--color-text-secondary)]"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-medium text-[var(--color-text-secondary)]"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20"
        />
      </div>

      {/* Sign In */}
      <button
        type="submit"
        disabled={loading || googleLoading}
        className="w-full rounded-lg bg-[var(--color-brand-blue)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

    </form>

    {/* Divider */}
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />

      <span className="text-[11px] text-[var(--color-text-muted)]">
        OR
      </span>

      <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>

    {/* Google */}
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={googleLoading || loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-bg-surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {/* Google G */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill="#4285F4"
          d="M21.35 12.23c0-.78-.07-1.53-.22-2.25H12v4.26h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.37Z"
        />
        <path
          fill="#34A853"
          d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.75 9.75 0 0 0 12 21.75Z"
        />
        <path
          fill="#FBBC05"
          d="M6.54 13.86A5.86 5.86 0 0 1 6.23 12c0-.65.11-1.28.31-1.86v-2.5H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.5Z"
        />
        <path
          fill="#EA4335"
          d="M12 6.11c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.2 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.64l3.24 2.5C7.31 7.83 9.46 6.11 12 6.11Z"
        />
      </svg>

      {googleLoading ? "Connecting..." : "Continue with Google"}
    </button>

    {/* Register */}
    <p className="mt-7 text-center text-xs text-[var(--color-text-muted)]">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="font-medium text-[var(--color-brand-blue)] transition hover:underline"
      >
        Create an account
      </Link>
    </p>

  </AuthLayout>
);
}