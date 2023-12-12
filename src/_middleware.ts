import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Accessing pathname from nextUrl
  const pathname = req.nextUrl.pathname;
  const cookies = req.cookies;
  // Paths that require the user to be registered
  const protectedPaths = ["/marketplace", "/profile"];
  const COOKIE_NAME = process.env.COOKIE_NAME as string;

  // Check if the path is protected and the user is not registered
  if (protectedPaths.includes(pathname)) {
    const isRegistered = cookies.get(COOKIE_NAME); // 'registered' is the name of your cookie

    // Redirect to login page if not registered
    if (!isRegistered) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/registration"; // Replace with your login or registration page path
      return NextResponse.redirect(url);
    }
  }

  // Continue with the request if the path is not protected or the user is registered
  return NextResponse.next();
}
