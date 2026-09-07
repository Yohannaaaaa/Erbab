"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Locale, type Translations } from "./translations";
import { LOCALE_COOKIE } from "./locale-constants";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "erbab-locale";

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? "tr");

  useEffect(() => {
    if (initialLocale) return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial =
      stored === "tr" || stored === "en"
        ? stored
        : window.navigator.language?.toLowerCase().startsWith("tr")
          ? "tr"
          : "en";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage/navigator, not a render loop
    setLocaleState(initial);
    writeLocaleCookie(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    writeLocaleCookie(next);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
