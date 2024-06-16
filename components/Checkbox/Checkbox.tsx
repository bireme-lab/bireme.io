"use client";

import { cx } from "@/styles/mixins";
import { useRef } from "react";
import {
  VisuallyHidden,
  mergeProps,
  useCheckbox,
  useFocusRing,
  useHover,
  usePress,
  type AriaCheckboxProps,
} from "react-aria";
import { Text } from "../Text/Text";
import * as styles from "./Checkbox.css";

type Props = {
  children?: string;
  className?: string;
} & AriaCheckboxProps;

export const Checkbox: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  const { inputProps } = useCheckbox(
    props,
    {
      isSelected: props.isSelected ?? false,
      setSelected: (checked) => props.onChange?.(checked),
      toggle: () => props.onChange?.(!props.isSelected),
    },
    ref,
  );

  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered: isElementHovered, hoverProps } = useHover({});
  const { isPressed: isElementPressed, pressProps } = usePress({
    ref,
  });

  const isFocused = !inputProps.disabled && isFocusVisible;
  const isHovered = !inputProps.disabled && isElementHovered;
  const isPressed = !inputProps.disabled && isElementPressed;

  return (
    <label
      className={cx(styles.container, props.className)}
      {...mergeProps(hoverProps, pressProps)}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div
        className={cx(
          styles.checkbox({
            isDisabled: inputProps.disabled,
            isFocused,
            isHovered,
            isPressed,
            isChecked: inputProps.checked,
          }),
        )}
      >
        <div className={styles.checkmark({ isChecked: inputProps.checked })} />
      </div>
      {props.children && (
        <Text variant="body" color={inputProps.disabled ? "neutral-500" : "neutral-50"}>
          {props.children}
        </Text>
      )}
    </label>
  );
};

Checkbox.displayName = "Checkbox";
