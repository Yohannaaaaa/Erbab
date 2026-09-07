import { NextResponse } from "next/server";
import { createOAuthState, type OAuthRole } from "@/lib/auth";
import { buildGoogleAuthUrl } from "@/lib/google-oauth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const roleParam = url.searchParams.get("role");
  const role: OAuthRole =
    roleParam === "ERBAB" || roleParam === "GOZLEMCI" || roleParam === "ISVEREN"
      ? roleParam
      : "GOZLEMCI";

  const state = await createOAuthState(role);
  const redirectUri = `${url.origin}/api/auth/google/callback`;

  return NextResponse.redirect(buildGoogleAuthUrl({ redirectUri, state }));
}
