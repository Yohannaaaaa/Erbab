"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LikeButton({
  portfolioItemId,
  initialLiked,
  initialLikeCount,
  isLoggedIn,
}: {
  portfolioItemId: string;
  initialLiked: boolean;
  initialLikeCount: number;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (!isLoggedIn) {
      router.push(`/giris?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    const res = await fetch("/api/likes", {
      method: liked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ portfolioItemId }),
    });
    setLoading(false);

    if (res.ok) {
      const data = await res.json();
      setLiked(data.liked);
      setCount(data.likeCount);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 text-sm transition-colors disabled:opacity-60 ${
        liked ? "text-gold" : "text-white/50 hover:text-white"
      }`}
    >
      <span>{liked ? "★" : "☆"}</span>
      <span>{count}</span>
    </button>
  );
}
