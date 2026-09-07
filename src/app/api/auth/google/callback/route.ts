import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession, verifyOAuthState } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";
import { exchangeGoogleCode } from "@/lib/google-oauth";
import { syncAdminStatus } from "@/lib/admin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const loginUrl = new URL("/giris", url.origin);

  if (!code || !state) {
    loginUrl.searchParams.set("error", "oauth");
    return NextResponse.redirect(loginUrl);
  }

  const role = await verifyOAuthState(state);
  if (!role) {
    loginUrl.searchParams.set("error", "oauth");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const redirectUri = `${url.origin}/api/auth/google/callback`;
    const googleUser = await exchangeGoogleCode({ code, redirectUri });

    if (!googleUser.email || !googleUser.email_verified) {
      loginUrl.searchParams.set("error", "oauth");
      return NextResponse.redirect(loginUrl);
    }

    let user = await prisma.user.findUnique({ where: { googleId: googleUser.sub } });

    if (!user) {
      const existingByEmail = await prisma.user.findUnique({ where: { email: googleUser.email } });

      if (existingByEmail) {
        user = await prisma.user.update({
          where: { id: existingByEmail.id },
          data: { googleId: googleUser.sub },
        });
      } else {
        user = await prisma.user.create({
          data: {
            name: googleUser.name || googleUser.email.split("@")[0],
            email: googleUser.email,
            googleId: googleUser.sub,
            role,
            ...(role === "ERBAB"
              ? { profile: { create: { slug: await generateUniqueSlug(googleUser.name || googleUser.email) } } }
              : {}),
          },
        });
      }
    }

    const isAdmin = await syncAdminStatus(user);
    await createSession({ userId: user.id, email: user.email, name: user.name, role: user.role, isAdmin });

    return NextResponse.redirect(new URL("/panel", url.origin));
  } catch {
    loginUrl.searchParams.set("error", "oauth");
    return NextResponse.redirect(loginUrl);
  }
}
