import { Grid } from "@/components/Grid/Grid";
import { Text } from "@/components/Text/Text";
import { Locale } from "@/utils/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import * as styles from "./page.css";

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

export default async function Home({
  params: { locale },
}: Readonly<{
  params: { locale: Locale };
}>) {
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale);

  const t = await getTranslations("pages.Home");

  return (
    <div className={styles.container}>
      <Grid>
        <NewsBanner />
      </Grid>
      <Grid>
        <div className={styles.titleWrapper}>
          <Text variant="title1" markup="h1">
            {t("title")}
          </Text>
        </div>
        <div className={styles.descriptionWrapper}>
          <Text variant="body" markup="p">
            {t("description")}
          </Text>
        </div>
      </Grid>
    </div>
  );
}
