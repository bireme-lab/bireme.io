"use client";

import { cx } from "@/styles/mixins";
import { CSSProperties, useRef } from "react";
import {
  AriaButtonProps,
  PressEvent,
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
  usePress,
} from "react-aria";
import { match } from "ts-pattern";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Button.css";

export type ButtonVariant = "plain" | "outline";
export type ButtonSize = "small" | "regular";

type Props = Omit<AriaButtonProps, "elementType"> & {
  variant?: ButtonVariant;
  children: string;
  isLoading?: boolean;
  isSuccess?: boolean;
  className?: string;
  containerClassName?: string;
  size?: ButtonSize;
  style?: CSSProperties;
};

export const Button: React.FC<Props> = ({
  variant = "plain",
  size = "regular",
  children,
  isLoading = false,
  isSuccess = false,
  onPress,
  className,
  containerClassName,
  style,
  ...props
}) => {
  const nonInteractiveState = isLoading || isSuccess || props.isDisabled;
  const ref = useRef<HTMLButtonElement>(null);
  const { isHovered, hoverProps } = useHover({
    isDisabled: nonInteractiveState,
  });

  const { isPressed, pressProps } = usePress({
    isDisabled: nonInteractiveState,
  });

  const { isFocusVisible, focusProps } = useFocusRing();

  const isFocused = !nonInteractiveState && isFocusVisible;
  const loaderIsVisible = isLoading && !isSuccess;

  const handlePress = (event: PressEvent) => {
    onPress?.(event);
  };

  const { buttonProps } = useButton(
    {
      ...props,
      onPress: handlePress,
      elementType: "button",
      isDisabled: nonInteractiveState,
    },
    ref,
  );

  return (
    <div className={cx(styles.buttonContainer, containerClassName)}>
      <button
        ref={ref}
        className={cx(
          styles.button({
            variant,
            size,
            isHovered,
            isFocused,
            isPressed,
            isDisabled: props.isDisabled,
            isSuccess,
            isLoading: loaderIsVisible,
          }),
          className,
        )}
        style={style}
        {...mergeProps(buttonProps, hoverProps, focusProps, pressProps)}
      >
        <div className={styles.loader} aria-hidden={!loaderIsVisible}>
          <div className={styles.loaderElement({ variant, loaderIsVisible })} />
          <div className={styles.loaderElement({ variant, loaderIsVisible })} />
          <div className={styles.loaderElement({ variant, loaderIsVisible })} />
        </div>
        <Text
          color="inherit"
          variant={match(size)
            .with("small", () => "small-flat" as const)
            .with("regular", () => "body-flat" as const)
            .exhaustive()}
          className={styles.label({
            isHovered,
            isFocused,
            hideLabel: isLoading || isSuccess,
          })}
          aria-hidden={nonInteractiveState}
        >
          {children}
        </Text>
        <div className={styles.successBackground({ isSuccess, variant })} aria-hidden={!isSuccess}>
          <Icon
            key="button-success-icon"
            name="check"
            title={children}
            className={styles.check({ isSuccess, variant })}
          />
        </div>
      </button>
    </div>
  );
};

Button.displayName = "Button";
