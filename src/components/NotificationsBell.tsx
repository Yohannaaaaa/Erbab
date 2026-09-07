"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type NotificationType =
  | "FOLLOW"
  | "LIKE"
  | "COMMENT"
  | "JOB_OFFER"
  | "JOB_OFFER_ACCEPTED"
  | "JOB_OFFER_DECLINED"
  | "COURSE_REQUEST"
  | "COURSE_REQUEST_ACCEPTED"
  | "COURSE_REQUEST_DECLINED";

type NotificationItem = {
  id: string;
  type: NotificationType;
  actorName: string;
  link: string | null;
  read: boolean;
  createdAt: string;
};

const POLL_INTERVAL_MS = 30_000;

export function NotificationsBell() {
  const { t, locale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    const res = await fetch("/api/notifications");
    if (res.ok) {
      const data = await res.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount, then polled on an interval
    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && unreadCount > 0) {
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      await fetch("/api/notifications/read", { method: "POST" });
    }
  };

  const formatMessage = (notification: NotificationItem) =>
    t.notifications.messages[notification.type].replace("{name}", notification.actorName);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={toggle}
        aria-label={t.notifications.title}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-black">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-black shadow-xl">
          <div className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white">
            {t.notifications.title}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-white/40">{t.notifications.empty}</p>
            ) : (
              <ul>
                {notifications.map((notification) => {
                  const content = (
                    <div
                      className={`px-4 py-3 text-sm hover:bg-white/[0.04] ${
                        notification.read ? "text-white/60" : "text-white"
                      }`}
                    >
                      <p>{formatMessage(notification)}</p>
                      <p className="mt-1 text-xs text-white/30">
                        {new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(notification.createdAt))}
                      </p>
                    </div>
                  );

                  return (
                    <li key={notification.id} className="border-b border-white/5 last:border-0">
                      {notification.link ? (
                        <Link href={notification.link} onClick={() => setOpen(false)}>
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
