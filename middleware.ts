import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { i18n } from "./utils/i18n";

const getLocale = (request: NextRequest): string | undefined => {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
};

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (
    [
      "/manifest.webmanifest",
      "/favicon.ico",
      "/icon-16x16.png",
      "/icon-32x32.png",
      "/sitemap.xml",
      "/browserconfig.xml",
      "/robots.txt",
      "/android-chrome-192x192.png",
      "/android-chrome-512x512.png",
      "/icons.svg",
      "/mstile-70x70.png",
      "/mstile-144x144.png",
      "/mstile-150x150.png",
      "/mstile-310x150.png",
      "/mstile-310x310.png",
      "/safari-pinned-tab.svg",
    ].includes(pathname)
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url),
    );
  }
};

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
