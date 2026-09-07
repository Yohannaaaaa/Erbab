import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProfileEditor } from "@/components/ProfileEditor";

export default async function ProfileEditPage() {
  const session = await getSession();
  if (!session) {
    redirect("/giris");
  }
  if (session.role !== "ERBAB") {
    redirect("/panel");
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
    include: { portfolioItems: { orderBy: { createdAt: "desc" } } },
  });

  if (!profile) {
    redirect("/panel");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black">
      <ProfileEditor
        slug={profile.slug}
        profile={{
          title: profile.title,
          bio: profile.bio,
          location: profile.location,
          category: profile.category,
          skills: profile.skills,
          yearsExperience: profile.yearsExperience,
          avatarUrl: profile.avatarUrl,
        }}
        portfolioItems={profile.portfolioItems}
      />
    </div>
  );
}
