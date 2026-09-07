import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const portfolioItemSchema = z.object({
  type: z.enum(["VIDEO", "IMAGE", "CERTIFICATE", "PROJECT", "TEXT"]),
  title: z.string().trim().min(2).max(120),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  url: z.string().trim().url("Geçerli bir bağlantı girin").optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = portfolioItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Geçersiz form" },
      { status: 400 },
    );
  }

  const profile = await prisma.profile.findUnique({ where: { userId: session.userId } });
  if (!profile) {
    return NextResponse.json({ error: "Profil bulunamadı" }, { status: 404 });
  }

  const { type, title, description, url } = parsed.data;

  const item = await prisma.portfolioItem.create({
    data: {
      profileId: profile.id,
      type,
      title,
      description: description || null,
      url: url || null,
    },
  });

  return NextResponse.json({ ok: true, item });
}
