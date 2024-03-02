"use client";

import { cx } from "@/styles/mixins";
import React, { useRef } from "react";
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
      <div className={styles.checkboxContainer}>
        <svg width={24} height={24} viewBox={`0 0 ${24} ${24}`} fill="none" className={styles.svg}>
          <path
            className={styles.path({ isChecked: inputProps.checked })}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            strokeDashoffset="0px"
            pathLength="1"
            d="M6 18.5c5.5-7 5.5-7 11-13"
          />
          <path
            className={styles.path({ isChecked: inputProps.checked })}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            strokeDashoffset="0px"
            pathLength="1"
            d="M9 6.5c2 5 4.5 8.5 8.5 13.5"
          />
        </svg>
        <div
          className={cx(
            styles.checkbox({ isDisabled: inputProps.disabled, isFocused, isHovered, isPressed }),
          )}
        />
      </div>
      {props.children && (
        <Text variant="anchor" color={inputProps.disabled ? "primary-700" : "primary-500"}>
          {props.children}
        </Text>
      )}
    </label>
  );
};

Checkbox.displayName = "Checkbox";
