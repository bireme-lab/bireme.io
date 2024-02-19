import { Text } from "@/components/Text/Text";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import * as styles from "./NewsBanner.css";

export const NewsBanner = async () => {
  const t = await getTranslations("components.NewsBanner");

  return (
    <Link href="/" className={styles.newsBanner}>
      <Text variant="small-mono" color="secondary-500" className={styles.newsBannerTag}>
        {t("new")}
      </Text>
      <Text variant="anchor">Mise à jour - Création du projet Bireme Lab</Text>
    </Link>
  );
};

NewsBanner.displayName = "NewsBanner";
