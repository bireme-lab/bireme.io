import { Text } from "@/components/Text/Text";
import { getTranslations } from "next-intl/server";
import { P, match } from "ts-pattern";
import * as styles from "./TableOfContent.css";

type Props = {
  headings: {
    level: 1 | 2 | 3 | 4 | 5 | 6 | undefined;
    text: string | undefined;
    slug: string | undefined;
  }[];
};

export const TableOfContent: React.FC<Props> = async ({ headings }) => {
  const t = await getTranslations("components.TableOfContent");

  return (
    <aside className={styles.container}>
      {/* <div className={styles.header}>
        <Icon name="table_of_content" title={t("title")} className={styles.icon} />
        <Text variant="body">{t("title")}</Text>
      </div> */}
      <Text variant="section-heading">{t("title")}</Text>
      <ul className={styles.anchorList}>
        {headings.map((heading) => {
          return match(heading)
            .with({ level: 1 }, () => null)
            .with({ level: 2, slug: P.string, text: P.string }, ({ level, slug, text }) => (
              <li key={slug} className={styles.anchorListItem({ level })}>
                <Text href={`#${slug}`} variant="body" className={styles.anchor}>
                  {text}
                </Text>
              </li>
            ))
            .with({ level: 3, slug: P.string, text: P.string }, ({ level, slug, text }) => (
              <li key={slug} className={styles.anchorListItem({ level })}>
                <div
                  className={styles.anchorDecoration({ indentation: "none" })}
                  aria-hidden={true}
                />
                <Text href={`#${slug}`} variant="body" className={styles.anchor}>
                  {text}
                </Text>
              </li>
            ))
            .with({ level: 4, slug: P.string, text: P.string }, ({ level, slug, text }) => (
              <li key={slug} className={styles.anchorListItem({ level })}>
                <div
                  className={styles.anchorDecoration({ indentation: "none" })}
                  aria-hidden={true}
                />
                <div
                  className={styles.anchorDecoration({ indentation: "simple" })}
                  aria-hidden={true}
                />
                <Text href={`#${slug}`} variant="body" className={styles.anchor}>
                  {text}
                </Text>
              </li>
            ))
            .otherwise(() => null);
        })}
      </ul>
    </aside>
  );
};

TableOfContent.displayName = "TableOfContent";
