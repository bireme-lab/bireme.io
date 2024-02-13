"use client";

import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import {
  VisuallyHidden,
  mergeProps,
  useCheckbox,
  useFocusRing,
  type AriaCheckboxProps,
} from "react-aria";
import { useToggleState } from "react-stately";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Checkbox.css";

type Props = {
  children?: string;
} & AriaCheckboxProps;

export const Checkbox: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const t = useTranslations("Checkbox");

  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label className={styles.container}>
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={styles.checkbox({ isFocused: isFocusVisible })}>
        <Icon name="handwritten_cross" title={t("ticked")} className={styles.svg} />
        <svg fill="none" className={styles.svg}>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M6 18.5c5.5-7 5.5-7 11-13"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M9 6.5c2 5 4.5 8.5 8.5 13.5"
          />
        </svg>
      </div>
      {props.children && <Text variant="anchor">{props.children}</Text>}
    </label>
  );
};

Checkbox.displayName = "Checkbox";
