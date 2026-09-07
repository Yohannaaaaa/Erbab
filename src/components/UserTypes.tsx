"use client";

import { useLanguage } from "@/lib/language-context";

const icons = ["🛠️", "👀", "💼"];

export function UserTypes() {
  const { t } = useLanguage();

  return (
    <section id="kimler-icin" className="border-t border-white/10 bg-white/[0.02] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.userTypes.title}</h2>
          <p className="mt-3 text-white/60">{t.userTypes.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {t.userTypes.items.map((item, i) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"
            >
              <div className="text-4xl">{icons[i]}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
