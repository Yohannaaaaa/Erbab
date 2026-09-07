"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";
import { CATEGORIES } from "@/lib/categories";
import { COUNTRIES } from "@/lib/countries";

export function DiscoverBar() {
  const { t, locale } = useLanguage();
  const router = useRouter();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (country) params.set("country", country);
    router.push(`/ustalar?${params.toString()}`);
  };

  return (
    <section className="border-t border-white/10 bg-black py-10">
      <div className="mx-auto max-w-4xl px-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row"
        >
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.discover.placeholder}
            className="flex-1 rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
          >
            <option value="">{t.discover.allCategories}</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {locale === "en" ? c.en : c.tr}
              </option>
            ))}
          </select>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none focus:border-gold"
          >
            <option value="">{t.discover.allCountries}</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-black hover:bg-gold-light"
          >
            {t.discover.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
