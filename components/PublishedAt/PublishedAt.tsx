import { AuthorSlug } from "@/content/authors";
import { cx } from "@/styles/mixins";
import { configDayJS, formatDateForDisplay } from "@/utils/date";
import { Locale } from "@/utils/i18n";
import { useLocale, useTranslations } from "next-intl";
import { CSSProperties } from "react";
import { Authors } from "../Authors/Authors";
import * as styles from "./PublishedAt.css";

type Props = {
  publishedAt: string;
  authors: AuthorSlug[];
  className?: string;
  style?: CSSProperties;
  disableTooltips?: boolean;
};

export const PublishedAt: React.FC<Props> = ({
  className,
  style,
  authors,
  publishedAt,
  disableTooltips = true,
}) => {
  const locale = useLocale();
  const t = useTranslations("components.PublishedAt");

  configDayJS(locale as Locale);

  return (
    <div className={cx(styles.container, className)} style={style}>
      <Authors authorSlugs={authors} disableTooltips={disableTooltips} />
      <time dateTime={publishedAt} className={styles.time}>
        {t("published_on", { date: formatDateForDisplay(publishedAt) })}
      </time>
    </div>
  );
};

PublishedAt.displayName = "PublishedAt";
