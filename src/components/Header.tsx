"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { LogoutButton } from "@/components/LogoutButton";
import { NotificationsBell } from "@/components/NotificationsBell";

type AuthUser = { name: string; role: "ERBAB" | "GOZLEMCI" | "ISVEREN"; isAdmin: boolean } | null;

export function Header({ authUser }: { authUser: AuthUser }) {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/ustalar", label: t.nav.discover },
    { href: "/#nasil-calisir", label: t.nav.howItWorks },
    { href: "/#ozellikler", label: t.nav.features },
    { href: "/#vizyon", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="erbab.com" width={36} height={36} className="rounded-md" priority />
          <span className="text-lg font-bold tracking-tight text-gold">
            erbab<span className="text-white">.com</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gold-light">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden overflow-hidden rounded-full border border-white/15 text-xs font-semibold sm:flex">
            <button
              onClick={() => setLocale("tr")}
              className={`px-2.5 py-1 ${locale === "tr" ? "bg-gold text-black" : "text-white/60"}`}
            >
              TR
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 ${locale === "en" ? "bg-gold text-black" : "text-white/60"}`}
            >
              EN
            </button>
          </div>

          {authUser ? (
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/panel/mesajlar" className="text-sm font-medium text-white/70 hover:text-white">
                {t.dm.inboxTitle}
              </Link>
              <NotificationsBell />
              {authUser.isAdmin && (
                <Link href="/admin" className="text-sm font-medium text-white/70 hover:text-white">
                  {t.nav.admin}
                </Link>
              )}
              <Link
                href="/panel"
                className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-gold-light"
              >
                {t.nav.panel}
              </Link>
              <LogoutButton className="text-sm font-medium text-white/50 hover:text-white" />
            </div>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link href="/giris" className="text-sm font-semibold text-white/80 hover:text-white">
                {t.nav.login}
              </Link>
              <Link
                href="/kayit"
                className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-black hover:bg-gold-light"
              >
                {t.nav.register}
              </Link>
            </div>
          )}

          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <span className="block h-0.5 w-6 bg-white" />
            <span className="mt-1.5 block h-0.5 w-6 bg-white" />
            <span className="mt-1.5 block h-0.5 w-6 bg-white" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 border-t border-white/10 px-6 py-4 text-sm font-medium text-white/80 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setLocale("tr")}
              className={`rounded-full border border-white/15 px-3 py-1 text-xs font-semibold ${locale === "tr" ? "bg-gold text-black" : "text-white/60"}`}
            >
              TR
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`rounded-full border border-white/15 px-3 py-1 text-xs font-semibold ${locale === "en" ? "bg-gold text-black" : "text-white/60"}`}
            >
              EN
            </button>
          </div>
          {authUser ? (
            <>
              <div className="flex items-center gap-2">
                <NotificationsBell />
                <Link href="/panel" onClick={() => setOpen(false)} className="font-semibold text-gold-light">
                  {t.nav.panel}
                </Link>
              </div>
              <Link href="/panel/mesajlar" onClick={() => setOpen(false)} className="font-semibold text-white/70">
                {t.dm.inboxTitle}
              </Link>
              {authUser.isAdmin && (
                <Link href="/admin" onClick={() => setOpen(false)} className="font-semibold text-white/70">
                  {t.nav.admin}
                </Link>
              )}
              <LogoutButton className="text-left text-white/50" />
            </>
          ) : (
            <>
              <Link href="/giris" onClick={() => setOpen(false)}>
                {t.nav.login}
              </Link>
              <Link href="/kayit" onClick={() => setOpen(false)} className="font-semibold text-gold-light">
                {t.nav.register}
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
