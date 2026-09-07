import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/admin";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 403 });
  }

  const [userCount, profileCount, portfolioItemCount, jobOfferCount, courseRequestCount, commentCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.profile.count(),
      prisma.portfolioItem.count(),
      prisma.jobOffer.count(),
      prisma.courseRequest.count(),
      prisma.comment.count(),
    ]);

  return NextResponse.json({
    userCount,
    profileCount,
    portfolioItemCount,
    jobOfferCount,
    courseRequestCount,
    commentCount,
  });
}
