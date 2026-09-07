import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PanelView } from "@/components/PanelView";

export default async function PanelPage() {
  const session = await getSession();
  if (!session) {
    redirect("/giris");
  }

  const [profile, followerCount] = await Promise.all([
    session.role === "ERBAB"
      ? prisma.profile.findUnique({
          where: { userId: session.userId },
          include: { _count: { select: { portfolioItems: true } } },
        })
      : null,
    prisma.follow.count({ where: { followingId: session.userId } }),
  ]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <PanelView
        name={session.name}
        role={session.role}
        slug={profile?.slug ?? null}
        portfolioCount={profile?._count.portfolioItems ?? 0}
        followerCount={followerCount}
      />
    </div>
  );
}
