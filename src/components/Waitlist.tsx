"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";

export function Waitlist() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState<string>(t.waitlist.roles[0]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="erken-erisim" className="border-t border-black/10 py-20 dark:border-white/10">
      <div className="mx-auto max-w-xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.waitlist.title}</h2>
        <p className="mt-3 text-foreground/60">{t.waitlist.subtitle}</p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-amber-600/30 bg-amber-600/10 p-6">
            <p className="font-semibold text-amber-700 dark:text-amber-400">{t.waitlist.successTitle}</p>
            <p className="mt-1 text-sm text-foreground/70">{t.waitlist.successBody}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
            <input
              type="email"
              required
              placeholder={t.waitlist.emailPlaceholder}
              className="w-full rounded-full border border-black/15 bg-background px-5 py-3 text-sm outline-none focus:border-amber-600 dark:border-white/20"
            />

            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <span className="text-sm font-medium text-foreground/70">{t.waitlist.roleLabel}</span>
              <div className="flex flex-wrap justify-center gap-2">
                {t.waitlist.roles.map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                      role === r
                        ? "border-amber-600 bg-amber-600 text-white"
                        : "border-black/15 text-foreground/70 dark:border-white/20"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-amber-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-amber-600/30 transition-transform hover:-translate-y-0.5 hover:bg-amber-700"
            >
              {t.waitlist.submit}
            </button>

            <p className="mt-2 text-xs text-foreground/50">{t.waitlist.note}</p>
          </form>
        )}
      </div>
    </section>
  );
}
