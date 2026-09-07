"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export function LogoutButton({ className }: { className?: string }) {
  const { t } = useLanguage();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className={className}>
      {t.panel.logout}
    </button>
  );
}
