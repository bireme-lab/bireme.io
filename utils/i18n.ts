import { Pathnames } from "next-intl/navigation";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { z } from "zod";

export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/dedale": "/dedale",
  "/hermes": "/hermes",
  "/[page_slug]": "/[page_slug]",
  "/blog/[post_slug]": "/blog/[post_slug]",
  "/rss.xml": "/rss.xml",
} satisfies Pathnames<typeof i18n.locales>;

export type Pathname = Exclude<keyof typeof pathnames, "/[page_slug]" | "/blog/[post_slug]">;

export const i18n = {
  defaultLocale: "fr",
  locales: ["fr", "en"],
  localePrefix: "as-needed",
} as const;

export const localeEnum = z.enum(["fr", "en"]);

export const isLocale = (locale: string): locale is Locale => {
  return i18n.locales.includes(locale as Locale);
};

export type Locale = (typeof i18n)["locales"][number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isLocale(locale)) {
    return notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
