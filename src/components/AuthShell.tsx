import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-black px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(217,119,6,0.16),transparent_50%),radial-gradient(circle_at_85%_90%,rgba(217,119,6,0.12),transparent_45%)]"
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <Image src="/logo.png" alt="erbab.com" width={36} height={36} className="rounded-md" />
        </Link>
        <h1 className="text-center text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-center text-sm text-white/60">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
