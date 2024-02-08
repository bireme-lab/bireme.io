import { Icon } from "@/components/Icon/Icon";
import { getIntl } from "@/utils/intl";
import * as styles from "./page.css";

export default async function Home() {
  const { t } = await getIntl();

  return (
    <main>
      <h1 className={styles.h1}>{t("helloworld")}</h1>
      <div className={styles.page}>
        <Icon name="github" title="Github" />
        toto
      </div>
    </main>
  );
}
