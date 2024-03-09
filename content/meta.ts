import { Locale, i18n } from "@/utils/i18n";
import { ORIGIN } from "@/utils/vars";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const getMeta = async (locale: Locale): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(ORIGIN),
    title: t("title"),
    description: t("description"),
    twitter: {
      card: "summary_large_image",
      site: "@biremelab",
      creator: "@biremelab",
      title: t("title"),
      description: t("description"),
    },
    openGraph: {
      type: "website",
      url: ORIGIN,
      siteName: "bireme.io",
      title: t("title"),
      description: t("description"),
      locale,
    },
    publisher: "Bireme Lab",
    alternates: {
      canonical: locale === i18n.defaultLocale ? ORIGIN : `${ORIGIN}/${locale}`,
      languages: {
        fr: ORIGIN,
        en: `${ORIGIN}/en`,
        "x-default": ORIGIN,
      },
      types: {
        "application/rss+xml": `${locale === i18n.defaultLocale ? ORIGIN : `${ORIGIN}/${locale}`}/rss.xml`,
      },
    },
  };
};
