"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { AuthShell } from "@/components/AuthShell";

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setDone(true);
  };

  return (
    <AuthShell title={t.auth.forgotPasswordTitle} subtitle={t.auth.forgotPasswordSubtitle}>
      {done ? (
        <p className="text-sm text-white/70">{t.auth.forgotPasswordSuccess}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-white/80">
            {t.auth.emailLabel}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {t.auth.forgotPasswordSubmit}
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
