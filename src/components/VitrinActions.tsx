"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export function VitrinActions({
  targetUserId,
  isOwnProfile,
  isLoggedIn,
  initialFollowing,
}: {
  targetUserId: string;
  isOwnProfile: boolean;
  isLoggedIn: boolean;
  initialFollowing: boolean;
}) {
  const { t } = useLanguage();
  const router = useRouter();

  const [following, setFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const showComingSoon = () => {
    setMessage(t.vitrin.comingSoon);
    window.setTimeout(() => setMessage(null), 2500);
  };

  const toggleFollow = async () => {
    if (!isLoggedIn) {
      router.push(`/giris?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/follow", {
      method: following ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: targetUserId }),
    });
    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      setFollowing(data.following);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={showComingSoon}
          className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black hover:bg-gold-light"
        >
          {t.vitrin.offerJob}
        </button>

        {!isOwnProfile && (
          <button
            onClick={toggleFollow}
            disabled={loading}
            className={
              following
                ? "rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10 disabled:opacity-60"
                : "rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-60"
            }
          >
            {following ? t.vitrin.following : t.vitrin.follow}
          </button>
        )}

        <button
          onClick={showComingSoon}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
        >
          {t.vitrin.proposeCollab}
        </button>
      </div>
      {message && <p className="text-xs text-white/50">{message}</p>}
    </div>
  );
}
