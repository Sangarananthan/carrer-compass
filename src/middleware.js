import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/auth", "/about", "/contact", "/"];

export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // ✅ Explicitly skip all Next.js internals and favicon
//   if (
//     pathname.startsWith("/_next/") ||
//     pathname.startsWith("/api") ||
//     pathname === "/favicon.ico"
//   ) {
//     return NextResponse.next();
//   }

//   const cookie = request.cookies.get("sb-access-token");
//   const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

//   // ✅ If logged in and visiting a public page, redirect to dashboard/home
//   if (isPublicRoute && cookie) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // ✅ If not logged in and visiting a protected page, redirect to login
//   if (!isPublicRoute && !cookie) {
//     return NextResponse.redirect(new URL("/auth", request.url));
//   }

//   // ✅ Allow request to proceed
  return NextResponse.next();
}

export const config = {
  // ✅ Exclude Next.js internals and favicon using a robust matcher
  matcher: ["/((?!_next/|api/|favicon.ico).*)"],
};
