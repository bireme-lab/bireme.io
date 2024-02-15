import { Avatar } from "@/components/Avatar/Avatar";
import { Icon } from "@/components/Icon/Icon";
import { Test } from "@/components/Test";
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
        <Avatar src="/images/avatars/fred.webp" alt="Fred" />
        <Test />
      </div>
    </main>
  );
}
