"use client";

import { cx } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
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
import { useToggleState } from "react-stately";
import { Text } from "../Text/Text";
import * as styles from "./Checkbox.css";

type Props = {
  children?: string;
  className?: string;
} & AriaCheckboxProps;

export const Checkbox: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>(null);

  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({});
  const { isPressed, pressProps } = usePress({
    ref,
  });

  return (
    <label
      className={cx(styles.container, props.className)}
      {...mergeProps(hoverProps, pressProps)}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={styles.checkboxContainer}>
        <svg
          width={vars.spacings.checkbox.boxSize}
          height={vars.spacings.checkbox.boxSize}
          viewBox={`0 0 ${vars.spacings.checkbox.boxSize} ${vars.spacings.checkbox.boxSize}`}
          fill="none"
          className={styles.svg}
        >
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
        <div className={cx(styles.checkbox({ isFocused: isFocusVisible, isHovered, isPressed }))} />
      </div>
      {props.children && <Text variant="anchor">{props.children}</Text>}
    </label>
  );
};

Checkbox.displayName = "Checkbox";
