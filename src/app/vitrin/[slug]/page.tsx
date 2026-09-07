import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { translations } from "@/lib/translations";
import { getServerLocale } from "@/lib/locale-server";
import { getSession } from "@/lib/auth";
import { VitrinActions } from "@/components/VitrinActions";
import { LikeButton } from "@/components/LikeButton";
import { Avatar } from "@/components/Avatar";
import { CourseRequestButton } from "@/components/CourseRequestButton";
import { CommentsSection } from "@/components/CommentsSection";
import { ReviewsSection } from "@/components/ReviewsSection";

export default async function VitrinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [profile, locale, session] = await Promise.all([
    prisma.profile.findUnique({
      where: { slug },
      include: {
        user: true,
        portfolioItems: { orderBy: { createdAt: "desc" } },
        courses: { orderBy: { createdAt: "desc" } },
      },
    }),
    getServerLocale(),
    getSession(),
  ]);

  if (!profile) {
    notFound();
  }

  const itemIds = profile.portfolioItems.map((item) => item.id);
  const [likeCounts, likedItemIds, comments] = await Promise.all([
    prisma.like.groupBy({
      by: ["portfolioItemId"],
      where: { portfolioItemId: { in: itemIds } },
      _count: { portfolioItemId: true },
    }),
    session
      ? prisma.like
          .findMany({
            where: { userId: session.userId, portfolioItemId: { in: itemIds } },
            select: { portfolioItemId: true },
          })
          .then((rows) => new Set(rows.map((row) => row.portfolioItemId)))
      : Promise.resolve(new Set<string>()),
    prisma.comment.findMany({
      where: { portfolioItemId: { in: itemIds } },
      orderBy: { createdAt: "asc" },
    }),
  ]);
  const likeCountMap = new Map(likeCounts.map((row) => [row.portfolioItemId, row._count.portfolioItemId]));
  const commentsByItem = new Map<string, typeof comments>();
  for (const comment of comments) {
    const list = commentsByItem.get(comment.portfolioItemId) ?? [];
    list.push(comment);
    commentsByItem.set(comment.portfolioItemId, list);
  }

  const [followerCount, isFollowing, reviews, isEligibleToReview] = await Promise.all([
    prisma.follow.count({ where: { followingId: profile.userId } }),
    session
      ? prisma.follow
          .findUnique({
            where: { followerId_followingId: { followerId: session.userId, followingId: profile.userId } },
          })
          .then(Boolean)
      : Promise.resolve(false),
    prisma.review.findMany({ where: { targetUserId: profile.userId }, orderBy: { createdAt: "desc" } }),
    session && session.userId !== profile.userId
      ? Promise.all([
          prisma.jobOffer.findFirst({
            where: { senderId: session.userId, recipientId: profile.userId, status: "ACCEPTED" },
          }),
          prisma.courseRequest.findFirst({
            where: { studentId: session.userId, status: "ACCEPTED", course: { profileId: profile.id } },
          }),
        ]).then(([offer, courseRequest]) => Boolean(offer || courseRequest))
      : Promise.resolve(false),
  ]);

  const t = translations[locale].vitrin;
  const tCourses = translations[locale].courses;
  const itemTypeLabels = translations[locale].panel.itemTypes;
  const skills = profile.skills
    ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Avatar
            src={profile.avatarUrl}
            name={profile.user.name}
            className="h-24 w-24 shrink-0 text-3xl"
          />
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
            <p className="mt-1 text-sm text-white/50">
              <span className="font-semibold text-white">{followerCount}</span> {t.followers}
              {reviews.length > 0 && (
                <>
                  {" · "}
                  <span className="text-gold-light">
                    ★ {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                  </span>{" "}
                  ({reviews.length})
                </>
              )}
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
          <VitrinActions
            targetUserId={profile.userId}
            isOwnProfile={session?.userId === profile.userId}
            isLoggedIn={Boolean(session)}
            initialFollowing={isFollowing}
          />
        </div>

        <h2 className="mt-12 text-xl font-bold text-white">{t.portfolioTitle}</h2>

        {profile.portfolioItems.length === 0 ? (
          <p className="mt-4 text-sm text-white/50">{t.empty}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {profile.portfolioItems.map((item) => (
              <li key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                    {itemTypeLabels[item.type]}
                  </span>
                  <LikeButton
                    portfolioItemId={item.id}
                    initialLiked={likedItemIds.has(item.id)}
                    initialLikeCount={likeCountMap.get(item.id) ?? 0}
                    isLoggedIn={Boolean(session)}
                  />
                </div>
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
                <CommentsSection
                  portfolioItemId={item.id}
                  isLoggedIn={Boolean(session)}
                  initialComments={(commentsByItem.get(item.id) ?? []).map((comment) => ({
                    id: comment.id,
                    authorName: comment.authorName,
                    body: comment.body,
                    isOwn: session?.userId === comment.userId,
                  }))}
                />
              </li>
            ))}
          </ul>
        )}

        <h2 className="mt-12 text-xl font-bold text-white">{tCourses.sectionTitle}</h2>

        {profile.courses.length === 0 ? (
          <p className="mt-4 text-sm text-white/50">{tCourses.empty}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {profile.courses.map((course) => (
              <li key={course.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-light">
                  {tCourses.typeLabels[course.type]}
                  {course.price ? ` · ${course.price}` : ""}
                </span>
                <p className="mt-1 font-semibold text-white">{course.title}</p>
                <p className="mt-1 text-sm text-white/60">{course.description}</p>
                <CourseRequestButton
                  courseId={course.id}
                  isLoggedIn={Boolean(session)}
                  isOwnProfile={session?.userId === profile.userId}
                />
              </li>
            ))}
          </ul>
        )}

        <h2 className="mt-12 text-xl font-bold text-white">{translations[locale].reviews.sectionTitle}</h2>
        <div className="mt-4">
          <ReviewsSection
            targetUserId={profile.userId}
            isEligible={isEligibleToReview}
            initialReviews={reviews.map((review) => ({
              id: review.id,
              authorName: review.authorName,
              rating: review.rating,
              comment: review.comment,
              isOwn: session?.userId === review.authorId,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
