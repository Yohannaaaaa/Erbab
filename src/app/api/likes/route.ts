import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const bodySchema = z.object({
  portfolioItemId: z.string().min(1),
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

  const { portfolioItemId } = parsed.data;

  const item = await prisma.portfolioItem.findUnique({ where: { id: portfolioItemId } });
  if (!item) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  await prisma.like.upsert({
    where: { userId_portfolioItemId: { userId: session.userId, portfolioItemId } },
    create: { userId: session.userId, portfolioItemId },
    update: {},
  });

  const likeCount = await prisma.like.count({ where: { portfolioItemId } });

  return NextResponse.json({ ok: true, liked: true, likeCount });
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

  const { portfolioItemId } = parsed.data;

  await prisma.like.deleteMany({ where: { userId: session.userId, portfolioItemId } });

  const likeCount = await prisma.like.count({ where: { portfolioItemId } });

  return NextResponse.json({ ok: true, liked: false, likeCount });
}
