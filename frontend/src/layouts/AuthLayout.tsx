import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] flex items-center justify-center p-4 sm:p-6">

      {/* Main Auth Container */}
      <div className="w-full max-w-[1180px] min-h-[680px] overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] shadow-2xl">

        <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[1.08fr_0.92fr]">

          {/* ================= LEFT ================= */}
          <div className="relative hidden lg:block overflow-hidden border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]">

            <img
              src="/insightflow-auth.jpeg"
              alt="InsightFlow data analysis platform"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center justify-center bg-[var(--color-bg-surface)] px-6 py-10 sm:px-10 lg:px-12">

            <div className="w-full max-w-[400px]">
              {children}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}