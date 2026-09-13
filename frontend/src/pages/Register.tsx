import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(
      "Account created successfully. Check your email if confirmation is required."
    );

    setLoading(false);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handleGoogleRegister = async () => {
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
    <div className="mb-7">
      <div className="mb-6">
        <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
          Insight<span className="text-[var(--color-brand-blue)]">Flow</span>
        </span>
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        Create account
      </h1>

      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Create your InsightFlow account to get started.
      </p>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        {error}
      </div>
    )}

    {/* Success */}
    {success && (
      <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
        {success}
      </div>
    )}

    {/* Register Form */}
    <form onSubmit={handleRegister} className="space-y-4">

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
          placeholder="Create a password"
          required
          autoComplete="new-password"
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-xs font-medium text-[var(--color-text-secondary)]"
        >
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm your password"
          required
          autoComplete="new-password"
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-brand-blue)] focus:ring-2 focus:ring-[var(--color-brand-blue)]/20"
        />
      </div>

      {/* Create Account */}
      <button
        type="submit"
        disabled={loading || googleLoading}
        className="w-full rounded-lg bg-[var(--color-brand-blue)] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>

    </form>

    {/* Divider */}
    <div className="my-5 flex items-center gap-4">
      <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />

      <span className="text-[11px] text-[var(--color-text-muted)]">
        OR
      </span>

      <div className="h-px flex-1 bg-[var(--color-border-subtle)]" />
    </div>

    {/* Google */}
    <button
      type="button"
      onClick={handleGoogleRegister}
      disabled={googleLoading || loading}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-base)] px-4 py-3 text-sm font-medium text-[var(--color-text-primary)] transition-all hover:border-[var(--color-brand-blue)] hover:bg-[var(--color-bg-surface-hover)] disabled:cursor-not-allowed disabled:opacity-50"
    >
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

    {/* Login */}
    <p className="mt-7 text-center text-xs text-[var(--color-text-muted)]">
      Already have an account?{" "}
      <Link
        to="/login"
        className="font-medium text-[var(--color-brand-blue)] transition hover:underline"
      >
        Sign in
      </Link>
    </p>

  </AuthLayout>
);
}
