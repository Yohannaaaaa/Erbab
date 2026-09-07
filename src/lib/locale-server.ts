import { cookies } from "next/headers";
import type { Locale } from "./translations";
import { LOCALE_COOKIE } from "./locale-constants";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return value === "en" ? "en" : "tr";
}
