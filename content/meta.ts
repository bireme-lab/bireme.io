import { ORIGIN } from "@/utils/vars";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const getMeta = async (): Promise<Metadata> => {
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
      images: [
        {
          url: `${ORIGIN}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    openGraph: {
      type: "website",
      url: ORIGIN,
      siteName: "bireme.io",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `${ORIGIN}/images/og-image.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    publisher: "Bireme Lab",
  };
};
