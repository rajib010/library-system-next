import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/home", "/sign-in", "/sign-up", "/", "/dashboard"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl;

  // Redirect authenticated users away from sign-in/sign-up
  if (token && ["/sign-in", "/sign-up"].includes(url.pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect unauthenticated users from dashboard
  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
