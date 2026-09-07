"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { AuthShell } from "@/components/AuthShell";
import { PasswordInput } from "@/components/PasswordInput";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t.auth.genericError);
        return;
      }

      setDone(true);
      setTimeout(() => router.push("/giris"), 2000);
    } catch {
      setError(t.auth.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t.auth.resetPasswordTitle} subtitle={t.auth.resetPasswordSubtitle}>
      {!token ? (
        <p className="text-sm text-red-400">{t.auth.resetPasswordInvalid}</p>
      ) : done ? (
        <p className="text-sm text-white/70">{t.auth.resetPasswordSuccess}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white/80">
            {t.auth.newPasswordLabel}
            <PasswordInput
              value={password}
              onChange={setPassword}
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {t.auth.resetPasswordSubmit}
          </button>
        </form>
      )}

      <p className="mt-4 text-center text-sm text-white/50">
        <Link href="/giris" className="font-medium text-gold-light hover:text-gold">
          {t.auth.backToLogin}
        </Link>
      </p>
    </AuthShell>
  );
}
