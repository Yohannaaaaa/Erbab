import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";

const bodySchema = z.object({
  userId: z.string().min(1),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const { userId } = parsed.data;
  if (userId === session.userId) {
    return NextResponse.json({ error: "Kendini takip edemezsin" }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!targetUser) {
    return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
  }

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId: session.userId, followingId: userId } },
  });

  if (!existing) {
    await prisma.follow.create({ data: { followerId: session.userId, followingId: userId } });

    const followerProfile = await prisma.profile.findUnique({ where: { userId: session.userId } });
    await createNotification({
      userId,
      type: "FOLLOW",
      actorName: session.name,
      link: followerProfile ? `/vitrin/${followerProfile.slug}` : undefined,
    });
  }

  const followerCount = await prisma.follow.count({ where: { followingId: userId } });

  return NextResponse.json({ ok: true, following: true, followerCount });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const { userId } = parsed.data;

  await prisma.follow.deleteMany({
    where: { followerId: session.userId, followingId: userId },
  });

  const followerCount = await prisma.follow.count({ where: { followingId: userId } });

  return NextResponse.json({ ok: true, following: false, followerCount });
}
