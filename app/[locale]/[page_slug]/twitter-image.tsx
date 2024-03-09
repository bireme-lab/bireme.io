import { Locale } from "@/utils/i18n";
import { getTranslations } from "next-intl/server";
import Image from "./opengraph-image";

export const runtime = "nodejs";

export async function generateImageMetadata({ params }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });

  return [
    {
      id: "default",
      size: { width: 1200, height: 630 },
      alt: t("title"),
      contentType: "image/png",
    },
  ];
}

export default Image;
