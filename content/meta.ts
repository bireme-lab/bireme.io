import { Locale } from "@/utils/i18n";
import { ORIGIN } from "@/utils/vars";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const getMeta = async (locale: Locale): Promise<Metadata> => {
  const t = await getTranslations("meta");

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
  };
};
