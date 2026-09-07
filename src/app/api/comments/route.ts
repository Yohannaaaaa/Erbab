import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const bodySchema = z.object({
  portfolioItemId: z.string().min(1),
  body: z.string().trim().min(1).max(500),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const { portfolioItemId, body } = parsed.data;

  const item = await prisma.portfolioItem.findUnique({ where: { id: portfolioItemId } });
  if (!item) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: {
      userId: session.userId,
      authorName: session.name,
      portfolioItemId,
      body,
    },
  });

  return NextResponse.json({ ok: true, comment });
}
