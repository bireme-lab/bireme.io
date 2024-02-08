import createMiddleware from "next-intl/middleware";
import { i18n } from "./utils/i18n";

export default createMiddleware(i18n);

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(fr|en)/:path*`],
};
