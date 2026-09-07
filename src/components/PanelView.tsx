"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { LogoutButton } from "@/components/LogoutButton";

type Role = "ERBAB" | "GOZLEMCI" | "ISVEREN";

export function PanelView({
  name,
  role,
  slug,
  portfolioCount,
  followerCount,
}: {
  name: string;
  role: Role;
  slug: string | null;
  portfolioCount: number;
  followerCount: number;
}) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm text-white/50">{t.panel.welcome}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">{name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-light">
            {t.panel.roleLabels[role]}
          </span>
          <span className="text-sm text-white/50">
            <span className="font-semibold text-white">{followerCount}</span> {t.vitrin.followers}
          </span>
        </div>

        {slug ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/vitrin/${slug}`}
              className="rounded-full bg-gold px-5 py-2.5 text-center text-sm font-semibold text-black hover:bg-gold-light"
            >
              {t.panel.viewShowcase}
            </Link>
            <Link
              href="/panel/profil"
              className="rounded-full border border-white/20 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10"
            >
              {t.panel.editProfile} {portfolioCount > 0 ? `(${portfolioCount})` : ""}
            </Link>
          </div>
        ) : (
          <p className="mt-8 text-sm text-white/50">{t.panel.noProfileYet}</p>
        )}

        <LogoutButton className="mt-8 text-sm font-medium text-white/50 hover:text-white" />
      </div>
    </div>
  );
}
