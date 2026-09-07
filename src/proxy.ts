import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "erbab_session";

function getSecretKey() {
  return new TextEncoder().encode(process.env.SESSION_SECRET);
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  let isAuthenticated = false;
  let isAdmin = false;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, getSecretKey());
      isAuthenticated = true;
      isAdmin = payload.isAdmin === true;
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/panel")) {
    const loginUrl = new URL("/giris", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL(isAuthenticated ? "/panel" : "/giris", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
};
