import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

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

  await prisma.follow.upsert({
    where: { followerId_followingId: { followerId: session.userId, followingId: userId } },
    create: { followerId: session.userId, followingId: userId },
    update: {},
  });

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
