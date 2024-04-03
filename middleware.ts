import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { i18n, pathnames } from "./utils/i18n";

export default async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  if (pathname.includes(`/${i18n.defaultLocale}`)) {
    return NextResponse.redirect(request.url.replace(`/${i18n.defaultLocale}`, ""), {
      status: 308,
    });
  }

  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createMiddleware({ ...i18n, pathnames });
  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|_next|_vercel|.well-known|.*\\..*).*)"],
};
