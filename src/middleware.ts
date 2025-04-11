/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

type Session = typeof auth.$Infer.Session;

function getLocale(pathname: string): string {
  const locale = pathname.split("/")[1];
  return locales.includes(locale as any) ? locale : defaultLocale;
}

export async function middleware(request: NextRequest) {
  const locale = getLocale(request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  // ✅ Redirect "/" ไปยัง defaultLocale (เช่น "/th")
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }


  if (!locales.includes(locale as any)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (!locales.includes(locale as any)) {
    // Redirect unknown locale to default
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const isDashboard = request.nextUrl.pathname.startsWith(`/${locale}/dashboard`);

  if (isDashboard && !session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (isDashboard && session?.user.role === "user") {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|api|.*\\..*).*)", // Apply to all non-static/non-api paths
  ],
};
