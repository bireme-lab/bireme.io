import { cx } from "@/styles/mixins";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Tag } from "../Tag/Tag";
import { Text } from "../Text/Text";
import * as styles from "./Usage.css";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  href: string;
  title: string;
  description: string;
};

export const Usage: React.FC<Props> = async ({ href, className, style, title, description }) => {
  const t = await getTranslations("components.Usage");

  return (
    <Link href={href} style={style} className={cx(styles.container, className)}>
      <div className={styles.content}>
        <Tag className={styles.tag} colorway="primaryInverse">
          {t("tag_label")}
        </Tag>
        <Text variant="title2" color="white-a100">
          {title}
        </Text>
        <Text variant="small">{description}</Text>
      </div>
      <div className={styles.readDoc}>
        <Tag className={styles.tag} colorway="neutral" icon="new_tab">
          {t("read_documentation")}
        </Tag>
      </div>
    </Link>
  );
};

Usage.displayName = "Usage";
