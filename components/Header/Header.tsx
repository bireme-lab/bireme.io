"use client";

import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { Sidepanel } from "@/components/Sidepanel/Sidepanel";
import { Text } from "@/components/Text/Text";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import * as styles from "./Header.css";

export const Header: React.FC = () => {
  const t = useTranslations("components.Header");
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({});
  const overlayTriggerState = useOverlayTriggerState({
    defaultOpen: false,
  });

  const handleButtonPress = () => {
    overlayTriggerState.open();
  };

  const { isPressed, pressProps } = usePress({
    onPress: handleButtonPress,
  });

  return (
    <>
      <header>
        <Container className={styles.container}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logoLink}>
              <Icon name="logo" title={t("homepage")} className={styles.logo} />
            </Link>
            <div className={styles.buttonWrapper}>
              <Button onPress={handleButtonPress}>{t("create_account")}</Button>
              <Icon
                name="handwritten_shape"
                title={t("homepage")}
                className={styles.handwrittenShape}
              />
            </div>
          </nav>
          <Text color="secondary-500" variant="comment" className={styles.comment}>
            {t("soon_available")}{" "}
            <Text
              tabIndex={0}
              role="button"
              aria-label={t("be_informed")}
              aria-pressed={isPressed}
              color="none"
              variant="comment"
              underlined={true}
              className={styles.commentButton({ isHovered, isFocused: isFocusVisible, isPressed })}
              onClick={handleButtonPress}
              {...mergeProps(pressProps, hoverProps, focusProps)}
            >
              {t("be_informed")}
            </Text>
          </Text>
        </Container>
        <Container>
          <Divider />
        </Container>
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
