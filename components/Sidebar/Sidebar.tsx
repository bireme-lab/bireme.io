"use client";

import { Link, usePathname } from "@/navigation";
import { cx } from "@/styles/mixins";
import { Locale, i18n } from "@/utils/i18n";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Sidebar.css";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  locale: Locale;
};

export const Sidebar: React.FC<Props> = ({ className, style, locale: currentLocale }) => {
  const pathname = usePathname();

  return (
    <div className={cx(styles.container, className)} style={style}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.navItem}>
            <Link href="/" className={styles.navItemLink({ isActive: pathname === "/" })}>
              <Icon name="biremelab_mark" title="Bireme Lab" className={styles.productIcon} />
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/dedale"
              className={styles.navItemLink({ isActive: pathname === "/dedale" })}
            >
              <Icon name="dedale_mark" title="Dédale" className={styles.productIcon} />
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/hermes"
              className={styles.navItemLink({ isActive: pathname === "/hermes" })}
            >
              <Icon name="hermes_mark" title="Hermes" className={styles.productIcon} />
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          {i18n.locales.map((locale) => (
            <li key={locale} className={styles.navItem}>
              <Link
                href="/"
                locale={locale}
                className={styles.navLocaleLink({ isActive: locale === currentLocale })}
              >
                <Text variant="small-flat" color="inherit" className={styles.navLocaleLinkText}>
                  {locale.toUpperCase()}
                </Text>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Sidebar.displayName = "Sidebar";
