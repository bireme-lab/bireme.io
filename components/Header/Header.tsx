"use client";

import { Container } from "@/components/Container/Container";
import { Icon } from "@/components/Icon/Icon";
import { Sidepanel } from "@/components/Sidepanel/Sidepanel";
import { Text } from "@/components/Text/Text";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useOverlayTriggerState } from "react-stately";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import { NewsletterTrigger } from "../NewsletterTrigger/NewsletterTrigger";
import * as styles from "./Header.css";

export const Header: React.FC = () => {
  const t = useTranslations("components.Header");
  const overlayTriggerState = useOverlayTriggerState({
    defaultOpen: false,
  });

  return (
    <>
      <header>
        <Container className={styles.container}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logoLink}>
              <Icon name="logo" title={t("homepage")} className={styles.logo} />
            </Link>
            <Text variant="body" className={styles.newsletterText}>
              {t.rich("subscribe_to_newsletter", {
                NewsletterTrigger: (chunk) =>
                  chunk && <NewsletterTrigger content={chunk.toString()} />,
              })}
            </Text>
            <Icon
              name="handwritten_underline_2"
              title={t("homepage")}
              className={styles.handwrittenShape}
              aria-hidden={true}
            />
          </nav>
        </Container>
        {/* <Container>
          <Divider />
        </Container> */}
      </header>
      <Sidepanel
        title="Newsletter"
        overlayTriggerState={overlayTriggerState}
        close={() => overlayTriggerState.close()}
        isDismissable={true}
      >
        <NewsletterForm autofocus={true} />
      </Sidepanel>
    </>
  );
};

Header.displayName = "Header";
