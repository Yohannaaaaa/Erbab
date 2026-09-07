import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function requireAdminSession() {
  const session = await getSession();
  if (!session || !session.isAdmin) {
    return null;
  }
  return session;
}

export async function syncAdminStatus(user: { id: string; email: string; isAdmin: boolean }) {
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (adminEmail && user.email.toLowerCase() === adminEmail && !user.isAdmin) {
    const updated = await prisma.user.update({ where: { id: user.id }, data: { isAdmin: true } });
    return updated.isAdmin;
  }
  return user.isAdmin;
}
