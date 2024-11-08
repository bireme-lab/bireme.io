"use client";

import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import { Sidepanel } from "../Sidepanel/Sidepanel";
import { Text, TextVariant } from "../Text/Text";
import * as styles from "./Newsletter.css";

type Props = {
  content: string;
  variant?: TextVariant;
};

export const NewsletterTrigger: React.FC<Props> = ({ content }) => {
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
      <Text
        tabIndex={0}
        role="button"
        aria-label={content}
        aria-pressed={isPressed}
        color="none"
        onClick={handleButtonPress}
        className={styles.trigger({ isHovered, isFocused: isFocusVisible, isPressed })}
        {...mergeProps(pressProps, hoverProps, focusProps)}
      >
        {content}
      </Text>
      <Sidepanel
        title="Newsletter"
        overlayTriggerState={overlayTriggerState}
        close={() => overlayTriggerState.close()}
        isDismissable={true}
      >
        <NewsletterForm />
      </Sidepanel>
    </>
  );
};

NewsletterTrigger.displayName = "NewsletterTrigger";
