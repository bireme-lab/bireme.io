import { Icon } from "@/components/Icon/Icon";
import { Text } from "@/components/Text/Text";
import { getTranslations } from "next-intl/server";
import * as styles from "./TableOfContent.css";

export const TableOfContent: React.FC = async () => {
  const t = await getTranslations("components.TableOfContent");

  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        <Icon name="table_of_content" title={t("title")} className={styles.icon} />
        <Text variant="body">{t("title")}</Text>
      </div>
    </aside>
  );
};

TableOfContent.displayName = "TableOfContent";
