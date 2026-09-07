"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

type Stats = {
  userCount: number;
  profileCount: number;
  portfolioItemCount: number;
  jobOfferCount: number;
  courseRequestCount: number;
  commentCount: number;
};

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ERBAB" | "GOZLEMCI" | "ISVEREN";
  isAdmin: boolean;
  createdAt: string;
  profile: { slug: string } | null;
};

type AdminComment = {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  portfolioItem: { title: string; profile: { slug: string } };
};

export function AdminDashboard() {
  const { t, locale } = useLanguage();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [comments, setComments] = useState<AdminComment[]>([]);

  const load = async () => {
    const [statsRes, usersRes, commentsRes] = await Promise.all([
      fetch("/api/admin/stats"),
      fetch("/api/admin/users"),
      fetch("/api/admin/comments"),
    ]);
    if (statsRes.ok) setStats(await statsRes.json());
    if (usersRes.ok) setUsers((await usersRes.json()).users);
    if (commentsRes.ok) setComments((await commentsRes.json()).comments);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time fetch on mount
    load();
  }, []);

  const deleteUser = async (id: string) => {
    if (!window.confirm(t.admin.usersDeleteConfirm)) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const deleteComment = async (id: string) => {
    if (!window.confirm(t.admin.commentsDeleteConfirm)) return;
    const res = await fetch(`/api/admin/comments/${id}`, { method: "DELETE" });
    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const dateFormat = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const statCards: { label: string; value: number }[] = stats
    ? [
        { label: t.admin.statsUsers, value: stats.userCount },
        { label: t.admin.statsProfiles, value: stats.profileCount },
        { label: t.admin.statsPortfolioItems, value: stats.portfolioItemCount },
        { label: t.admin.statsJobOffers, value: stats.jobOfferCount },
        { label: t.admin.statsCourseRequests, value: stats.courseRequestCount },
        { label: t.admin.statsComments, value: stats.commentCount },
      ]
    : [];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold text-white">{t.admin.title}</h1>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {statCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-2xl font-bold text-gold-light">{card.value}</p>
              <p className="mt-1 text-xs text-white/50">{card.label}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold text-white">{t.admin.usersTitle}</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-white/50">
              <tr>
                <th className="px-4 py-3">{t.admin.usersName}</th>
                <th className="px-4 py-3">{t.admin.usersEmail}</th>
                <th className="px-4 py-3">{t.admin.usersRole}</th>
                <th className="px-4 py-3">{t.admin.usersJoined}</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-white/5">
                  <td className="px-4 py-3 text-white">
                    {user.profile ? (
                      <Link href={`/vitrin/${user.profile.slug}`} className="hover:text-gold-light">
                        {user.name}
                      </Link>
                    ) : (
                      user.name
                    )}
                    {user.isAdmin && (
                      <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold-light">
                        {t.admin.usersAdminBadge}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-white/60">{user.email}</td>
                  <td className="px-4 py-3 text-white/60">{t.panel.roleLabels[user.role]}</td>
                  <td className="px-4 py-3 text-white/60">{dateFormat.format(new Date(user.createdAt))}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-xs text-white/40 hover:text-red-400"
                    >
                      {t.admin.usersDelete}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-xl font-bold text-white">{t.admin.commentsTitle}</h2>
        {comments.length === 0 ? (
          <p className="mt-4 text-sm text-white/50">{t.admin.commentsEmpty}</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-white">{comment.authorName}</span>{" "}
                    <span className="text-white/40">
                      {t.admin.commentsOn}{" "}
                      <Link
                        href={`/vitrin/${comment.portfolioItem.profile.slug}`}
                        className="text-gold-light hover:text-gold"
                      >
                        {comment.portfolioItem.title}
                      </Link>
                    </span>
                    <p className="mt-1 text-white/70">{comment.body}</p>
                  </div>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="shrink-0 text-xs text-white/40 hover:text-red-400"
                  >
                    {t.admin.commentsDelete}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
