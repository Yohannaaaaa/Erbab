import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const { id } = await params;

  const item = await prisma.portfolioItem.findUnique({
    where: { id },
    include: { profile: true },
  });

  if (!item || item.profile.userId !== session.userId) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  await prisma.portfolioItem.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
