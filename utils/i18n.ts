import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const i18n = {
  defaultLocale: "fr",
  locales: ["fr", "en"],
} as const;

export const isLocale = (locale: string): locale is Locale => {
  return i18n.locales.includes(locale as Locale);
};

export type Locale = (typeof i18n)["locales"][number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isLocale) {
    return notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
