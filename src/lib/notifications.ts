import { prisma } from "@/lib/db";
import type { NotificationType } from "@prisma/client";

export async function createNotification({
  userId,
  type,
  actorName,
  link,
}: {
  userId: string;
  type: NotificationType;
  actorName: string;
  link?: string;
}) {
  await prisma.notification.create({
    data: { userId, type, actorName, link },
  });
}
