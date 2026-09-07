import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { createNotification } from "@/lib/notifications";

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

  const request_ = await prisma.apprenticeshipRequest.findUnique({ where: { id } });
  if (!request_ || request_.recipientId !== session.userId) {
    return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  }

  const updated = await prisma.apprenticeshipRequest.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  await createNotification({
    userId: request_.senderId,
    type: parsed.data.status === "ACCEPTED" ? "APPRENTICESHIP_ACCEPTED" : "APPRENTICESHIP_DECLINED",
    actorName: session.name,
    link: "/panel",
  });

  return NextResponse.json({ ok: true, request: updated });
}
