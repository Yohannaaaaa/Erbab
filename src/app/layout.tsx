import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/language-context";
import { getSession } from "@/lib/auth";
import { getServerLocale } from "@/lib/locale-server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "erbab.com — Ustalığın Yeri Belli",
  description:
    "Dünyadaki her bireyin kendi ustalığını, yeteneğini veya uzmanlığını global ölçekte sergileyebileceği platform.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "erbab.com — Ustalığın Yeri Belli",
    description:
      "Dünyadaki her bireyin kendi ustalığını, yeteneğini veya uzmanlığını global ölçekte sergileyebileceği platform.",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [session, locale] = await Promise.all([getSession(), getServerLocale()]);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <LanguageProvider initialLocale={locale}>
          <Header authUser={session ? { name: session.name, role: session.role } : null} />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
