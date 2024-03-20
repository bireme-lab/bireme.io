import { socials } from "@/content/socials";
import { Link } from "@/navigation";
import { Locale } from "@/utils/i18n";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
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
            <Text variant="small-flat" color="neutral-200">
              © {new Date().getFullYear()}
            </Text>
          </div>
          <ul className={styles.socialLinks}>
            <li>
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Icon name="x" title={socials.twitter} className={styles.socialIcon} />
              </a>
            </li>
          </ul>
        </div>
        <ul className={styles.legalLinks}>
          <li>
            <Link href="/" locale={locale === "fr" ? "en" : "fr"} className={styles.legalLink}>
              {t("see_website_localized")}
            </Link>
          </li>
          <li>
            <Link href="/rss.xml" className={styles.legalLink}>
              {t("rss_feed")}
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/[page_slug]",
                params: {
                  page_slug: match(locale)
                    .with("fr", () => "mentions-legales")
                    .with("en", () => "legal-notice")
                    .exhaustive(),
                },
              }}
              className={styles.legalLink}
            >
              {t("legal_links.legal_notice")}
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/[page_slug]",
                params: {
                  page_slug: match(locale)
                    .with("fr", () => "politique-de-confidentialite")
                    .with("en", () => "privacy-policy")
                    .exhaustive(),
                },
              }}
              className={styles.legalLink}
            >
              {t("legal_links.privacy_policy")}
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/[page_slug]",
                params: {
                  page_slug: match(locale)
                    .with("fr", () => "politique-des-cookies")
                    .with("en", () => "cookie-policy")
                    .exhaustive(),
                },
              }}
              className={styles.legalLink}
            >
              {t("legal_links.cookie_policy")}
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

Footer.displayName = "Footer";
