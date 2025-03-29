import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//in which routes you want to add configurations
export const config = {
  matcher: ["/", "/home", "/sign-in", "/sign-up", "/about", "/contact","/transactions"],
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

  // Prevent users with role "user" from accessing the dashboard
  if (token?.role === "user" && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Redirect non-"user" roles away from transactions route
  if (!token || token.role !== "user") {
    if (url.pathname.startsWith("/transactions")) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // Redirect root URL to /home
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
