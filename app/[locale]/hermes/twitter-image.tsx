import { Locale } from "@/utils/i18n";
import { getTranslations } from "next-intl/server";
import Image from "./opengraph-image";

export const runtime = "nodejs";

type Props = {
  params: {
    locale: Locale;
  };
};

export async function generateImageMetadata({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: "pages.Dedale" });

  return [
    {
      id: "default",
      size: { width: 1200, height: 630 },
      alt: t("meta_title"),
      contentType: "image/png",
    },
  ];
}

export default Image;
