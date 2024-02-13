import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Icon } from "@/components/Icon/Icon";
import { Locale } from "@/utils/i18n";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import * as styles from "./page.css";

export default async function Home({
  params: { locale },
}: Readonly<{
  params: { locale: Locale };
}>) {
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale);

  const t = await getTranslations("Checkbox");

  return (
    <main>
      <h1 className={styles.h1}>{t("ticked")}</h1>
      <div className={styles.page}>
        <Icon name="github" title="Github" />
        toto
        <Checkbox>Contenu marketing et offres exclusives en rapport avec nos produits</Checkbox>
      </div>
    </main>
  );
}
