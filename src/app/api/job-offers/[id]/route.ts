import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const bodySchema = z.object({
  status: z.enum(["ACCEPTED", "DECLINED"]),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Giriş yapmalısınız" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const offer = await prisma.jobOffer.findUnique({ where: { id } });
  if (!offer || offer.recipientId !== session.userId) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  const updated = await prisma.jobOffer.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ ok: true, offer: updated });
}
