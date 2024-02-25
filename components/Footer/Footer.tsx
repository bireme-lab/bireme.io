"use client";

import { Container } from "@/components/Container/Container";
import { Icon } from "@/components/Icon/Icon";
import { Text } from "@/components/Text/Text";
import { Locale } from "@/utils/i18n";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { match } from "ts-pattern";
import { Grid } from "../Grid/Grid";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import * as styles from "./Footer.css";

export const resolveAfter = <T,>(delay: number, value?: T): Promise<T | void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

export const Footer: React.FC = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("components.Footer");

  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Icon name="logo_with_reflection" title={t("homepage")} className={styles.logo} />
        </Link>
        <Grid>
          <NewsletterForm className={styles.form} />
        </Grid>
        <ul className={styles.legalLinks}>
          <li>
            <Text
              href={match(locale)
                .with("fr", () => "/fr/mentions-legales")
                .with("en", () => "/en/legal-notice")
                .exhaustive()}
              variant="small-flat"
              translateOnHover={true}
              color="primary-700"
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
              translateOnHover={true}
              color="primary-700"
            >
              {t("legal_links.privacy_policy")}
            </Text>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

Footer.displayName = "Footer";
