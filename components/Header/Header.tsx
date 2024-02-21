"use client";

import { Breadcrumb, Step } from "@/components/Breadcrumb/Breadcrumb";
import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Divider } from "@/components/Divider/Divider";
import { Icon } from "@/components/Icon/Icon";
import { Text } from "@/components/Text/Text";
import { findPostBySlug } from "@/contentlayer.fetchers";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { P, match } from "ts-pattern";
import * as styles from "./Header.css";

export const Header: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations("components.Header");
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({});
  const layoutSegments = useSelectedLayoutSegments();

  const breadcrumbSteps: Step[] = [];

  if (layoutSegments.length > 0) {
    breadcrumbSteps.push({
      label: t("homepage"),
      href: "/",
    });

    match(layoutSegments)
      // /blog/:post_slug
      .with(["blog", P.string], (segments): Step | void => {
        const postOption = findPostBySlug(segments[1], locale);

        if (postOption.isSome()) {
          const post = postOption.get();

          breadcrumbSteps.push({
            label: post.title,
            href: post.url,
          });
        }
      })
      .otherwise(() => null);
  }

  const handleButtonPress = () => {
    console.log("Button pressed");
  };

  const { isPressed, pressProps } = usePress({
    onPress: handleButtonPress,
  });

  return (
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
        <Breadcrumb steps={breadcrumbSteps} />
      </Container>
      <Container>
        <Divider />
      </Container>
    </header>
  );
};

Header.displayName = "Header";
