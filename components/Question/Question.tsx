"use client";

import { useRef } from "react";
import { mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { useToggleState } from "react-stately";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Question.css";

type Props = {
  question: string;
  answer: string;
};

export const Question: React.FC<Props> = ({ question, answer }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { isHovered, hoverProps } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isSelected, toggle } = useToggleState({ defaultSelected: false });

  const handlePress = () => {
    toggle();
  };

  const { buttonProps } = useButton(
    {
      onPress: handlePress,
      elementType: "button",
    },
    ref,
  );

  return (
    <section className={styles.container({ isHovered, isFocused: isFocusVisible })} {...hoverProps}>
      <button ref={ref} className={styles.button} {...mergeProps(buttonProps, focusProps)}>
        <Icon name="caret_right" className={styles.icon({ isOpened: isSelected })} />
        <Text variant="body" color="white-a100" className={styles.questionText}>
          {question}
        </Text>
      </button>
      <div className={styles.answer({ isOpened: isSelected })}>
        <Text markup="p" variant="body">
          {answer}
        </Text>
      </div>
    </section>
  );
};

Question.displayName = "Question";
