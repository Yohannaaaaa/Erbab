"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { AuthShell } from "@/components/AuthShell";
import { GoogleButton } from "@/components/GoogleButton";
import { PasswordInput } from "@/components/PasswordInput";

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ERBAB" | "GOZLEMCI" | "ISVEREN">("ERBAB");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t.auth.genericError);
        return;
      }

      router.push("/panel");
      router.refresh();
    } catch {
      setError(t.auth.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title={t.auth.registerTitle} subtitle={t.auth.registerSubtitle}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {t.auth.roles.map((r) => (
            <button
              type="button"
              key={r.value}
              onClick={() => setRole(r.value)}
              className={`rounded-lg border p-3 text-left text-xs transition-colors ${
                role === r.value
                  ? "border-gold bg-gold/10 text-white"
                  : "border-white/10 text-white/60 hover:border-white/25"
              }`}
            >
              <span className="block font-semibold">{r.label}</span>
              <span className="mt-1 block text-white/50">{r.description}</span>
            </button>
          ))}
        </div>

        <GoogleButton role={role} />
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white/40">
          <span className="h-px flex-1 bg-white/10" />
          {t.auth.orDivider}
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-white/80">
          {t.auth.nameLabel}
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-gold"
          />
        </label>

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
          {t.auth.passwordLabel}
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
          {t.auth.registerSubmit}
        </button>

        <p className="text-center text-sm text-white/50">
          {t.auth.hasAccount}{" "}
          <Link href="/giris" className="font-medium text-gold-light hover:text-gold">
            {t.auth.loginLink}
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
