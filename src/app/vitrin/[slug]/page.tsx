import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/locale-server";
import { VitrinActions } from "@/components/VitrinActions";

export default async function VitrinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [profile, locale] = await Promise.all([
    prisma.profile.findUnique({
      where: { slug },
      include: {
        user: true,
        portfolioItems: { orderBy: { createdAt: "desc" } },
      },
    }),
    getServerLocale(),
  ]);

  if (!profile) {
    notFound();
  }

  const t = translations[locale].vitrin;
  const itemTypeLabels = translations[locale].panel.itemTypes;
  const skills = profile.skills
    ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const initials = profile.user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-3xl font-bold text-black">
            {initials}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{profile.user.name}</h1>
            {profile.title && <p className="mt-1 text-lg text-gold-light">{profile.title}</p>}
            <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-white/50">
              {profile.location && <span>📍 {profile.location}</span>}
              {profile.category && <span>🏷️ {profile.category}</span>}
              {profile.yearsExperience != null && (
                <span>
                  ⏱ {profile.yearsExperience} {t.yearsExperience}
                </span>
              )}
              <span>
                {t.memberSince}{" "}
                {new Intl.DateTimeFormat(locale === "en" ? "en-US" : "tr-TR", {
                  year: "numeric",
                  month: "long",
                }).format(profile.createdAt)}
              </span>
            </p>
          </div>
        </div>

        {profile.bio && <p className="mt-6 max-w-2xl text-white/70">{profile.bio}</p>}

        {skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                {skill}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8">
          <VitrinActions />
        </div>

        <h2 className="mt-12 text-xl font-bold text-white">{t.portfolioTitle}</h2>

        {profile.portfolioItems.length === 0 ? (
          <p className="mt-4 text-sm text-white/50">{t.empty}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {profile.portfolioItems.map((item) => (
              <li key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                  {itemTypeLabels[item.type]}
                </span>
                <p className="mt-1 font-semibold text-white">{item.title}</p>
                {item.description && <p className="mt-1 text-sm text-white/60">{item.description}</p>}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-gold-light hover:text-gold"
                  >
                    {item.url} ↗
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
