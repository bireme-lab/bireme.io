import { useRef } from "react";
import {
  AriaButtonProps,
  PressEvent,
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
  usePress,
} from "react-aria";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Button.css";

export type ButtonVariant = "plain" | "outline";

type Props = Omit<AriaButtonProps, "elementType"> & {
  variant?: ButtonVariant;
  children: string;
  showArrow?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
};

export const Button: React.FC<Props> = ({
  variant = "plain",
  children,
  showArrow = false,
  isLoading = false,
  isSuccess = false,
  onPress,
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
  const arrowIsVisible = showArrow && !nonInteractiveState && (isHovered || isFocused);
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
    <div className={styles.buttonContainer}>
      <button
        ref={ref}
        className={styles.button({
          variant,
          isHovered,
          isFocused,
          isPressed,
          isDisabled: props.isDisabled,
          isSuccess,
        })}
        {...mergeProps(buttonProps, hoverProps, focusProps, pressProps)}
      >
        <div className={styles.loader} aria-hidden={!loaderIsVisible}>
          <div className={styles.loaderElement({ variant, loaderIsVisible })} />
          <div className={styles.loaderElement({ variant, loaderIsVisible })} />
          <div className={styles.loaderElement({ variant, loaderIsVisible })} />
        </div>
        <Text
          color="inherit"
          className={styles.label({
            showArrow,
            isHovered,
            isFocused,
            hideLabel: isLoading || isSuccess,
          })}
          aria-hidden={nonInteractiveState}
        >
          {children}
        </Text>
        <Icon
          key="button-icon"
          name="arrow_right"
          title={children}
          className={styles.icon({
            show: showArrow,
            isHovered,
            isFocused,
            isPressed,
            hideArrow: !arrowIsVisible,
          })}
          aria-hidden={!arrowIsVisible}
        />
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
