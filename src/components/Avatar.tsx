"use client";

import { useState } from "react";

export function Avatar({
  src,
  name,
  className,
}: {
  src?: string | null;
  name: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark font-bold text-black ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-provided URL
    <img
      src={src}
      alt=""
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
