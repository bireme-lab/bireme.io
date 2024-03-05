import { socials } from "@/content/socials";
import { Locale } from "@/utils/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { match } from "ts-pattern";
import { Container } from "../Container/Container";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Footer.css";

export const resolveAfter = <T,>(delay: number, value?: T): Promise<T | void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

export const Footer: React.FC = async () => {
  const locale = useLocale() as Locale;
  const t = await getTranslations("components.Footer");

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logoLink}>
              <Icon name="logo" title={t("homepage")} className={styles.logo} />
            </Link>
            <Text variant="small-flat" color="primary-700">
              © {new Date().getFullYear()}
            </Text>
          </div>
          <ul className={styles.socialLinks}>
            <li>
              <Text href={socials.twitter} variant="small-flat" target="_blank">
                <Icon name="x" title={socials.twitter} className={styles.socialIcon} />
              </Text>
            </li>
          </ul>
        </div>
        <ul className={styles.legalLinks}>
          <li>
            <Text
              href={match(locale)
                .with("fr", () => "/fr/rss.xml")
                .with("en", () => "/en/rss.xml")
                .exhaustive()}
              variant="small-flat"
              className={styles.legalLink}
            >
              {t("rss_feed")}
            </Text>
          </li>
          <li>
            <Text
              href={match(locale)
                .with("fr", () => "/fr/mentions-legales")
                .with("en", () => "/en/legal-notice")
                .exhaustive()}
              variant="small-flat"
              className={styles.legalLink}
            >
              {t("legal_links.legal_notice")}
            </Text>
          </li>
          <li>
            <Text
              href={match(locale)
                .with("fr", () => "/fr/politique-de-confidentialite")
                .with("en", () => "/en/privacy-policy")
                .exhaustive()}
              variant="small-flat"
              className={styles.legalLink}
            >
              {t("legal_links.privacy_policy")}
            </Text>
          </li>
          <li>
            <Text
              href={match(locale)
                .with("fr", () => "/fr/politique-des-cookies")
                .with("en", () => "/en/cookie-policy")
                .exhaustive()}
              variant="small-flat"
              className={styles.legalLink}
            >
              {t("legal_links.cookie_policy")}
            </Text>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

Footer.displayName = "Footer";
