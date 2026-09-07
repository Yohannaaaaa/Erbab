"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { AuthShell } from "@/components/AuthShell";
import { GoogleButton } from "@/components/GoogleButton";
import { PasswordInput } from "@/components/PasswordInput";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "oauth" ? t.auth.oauthError : null,
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t.auth.genericError);
        return;
      }

      router.push(searchParams.get("next") ?? "/panel");
      router.refresh();
    } catch {
      setError(t.auth.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t.auth.loginTitle} subtitle={t.auth.loginSubtitle}>
      <div className="flex flex-col gap-4">
        <GoogleButton />
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
          <span className="h-px flex-1 bg-white/10" />
          {t.auth.orDivider}
          <span className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
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

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          <span className="flex items-center justify-between">
            {t.auth.passwordLabel}
            <Link href="/sifremi-unuttum" className="text-xs font-medium text-gold-light hover:text-gold">
              {t.auth.forgotPasswordLink}
            </Link>
          </span>
          <PasswordInput value={password} onChange={setPassword} required autoComplete="current-password" />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {t.auth.loginSubmit}
        </button>

        <p className="text-center text-sm text-white/50">
          {t.auth.noAccount}{" "}
          <Link href="/kayit" className="font-medium text-gold-light hover:text-gold">
            {t.auth.registerLink}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
