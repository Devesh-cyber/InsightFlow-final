import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


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
  <div className="min-h-screen bg-[var(--color-bg-base)] flex items-center justify-center px-4 py-8">

    <div className="w-full max-w-md">

      {/* Branding */}
      <div className="text-center mb-8">
        <h1 className="font-sans font-bold text-3xl tracking-tight text-[var(--color-text-primary)]">
          Insight<span className="text-[var(--color-brand-blue)]">Flow</span>
        </h1>

        <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
          Turn your data into insights.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-strong)] rounded-xl p-8 shadow-xl">

        <div className="mb-7">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            Sign in to continue to your workspace.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />

          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            OR
          </span>

          <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
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
              className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
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
              className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)]"
            />
          </div>

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-[var(--color-brand-blue)] px-4 py-3 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-7">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand-blue)] transition-colors"
          >
            Create an account
          </Link>
        </p>

      </div>

    </div>

  </div>
);
}