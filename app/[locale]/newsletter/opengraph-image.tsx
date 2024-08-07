/* eslint-disable @next/next/no-img-element */

import { Locale } from "@/utils/i18n";
import { ORIGIN } from "@/utils/vars";
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "nodejs";

type Props = {
  params: {
    locale: Locale;
  };
};

export async function generateImageMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.Newsletter" });

  return [
    {
      id: "default",
      size: { width: 1200, height: 630 },
      alt: t("meta_title"),
      contentType: "image/png",
    },
  ];
}

const Image = async ({ params }: Props) => {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.Newsletter" });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <img
          src={`${ORIGIN}/images/opengraph-images/newsletter-${params.locale}.png`}
          alt={t("meta_title")}
          width={1200}
          height={630}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
};

export default Image;
