import { cx } from "@/styles/mixins";
import { isNotEmpty, isNotNullish } from "@/utils/types";
import { CSSProperties, useRef } from "react";
import { AriaTextFieldOptions, mergeProps, useFocusRing, useHover, useTextField } from "react-aria";
import { P, match } from "ts-pattern";
import { Text } from "../Text/Text";
import * as styles from "./Input.css";

type Props = Omit<AriaTextFieldOptions<"input">, "type" | "inputElementType"> & {
  label?: string;
  hideError?: boolean;
  description?: string;
  className?: string;
  style?: CSSProperties;
};

export const Input: React.FC<Props> = (props) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({
    isDisabled: props.isDisabled,
  });

  const { labelProps, inputProps, errorMessageProps, descriptionProps } = useTextField(
    {
      ...props,
      type: "text",
      inputElementType: "input",
    },
    ref,
  );

  const isFocused = !props.isDisabled && isFocusVisible;
  const isErrored = Boolean(props.errorMessage);

  return (
    <div className={cx(styles.container, props.className)} style={props.style} {...hoverProps}>
      {isNotNullish(props.label) && isNotEmpty(props.label) && (
        <Text markup="label" variant="body" {...labelProps} color="primary-700">
          {props.label}
          {props.isRequired && <span className={styles.requiredMarker}>&nbsp;*</span>}
        </Text>
      )}
      <input
        ref={ref}
        {...mergeProps(inputProps, focusProps)}
        className={styles.input({
          isFocused,
          isErrored,
          isHovered,
          isDisabled: inputProps.disabled,
        })}
      />
      {match({
        description: props.description,
        errorMessage: props.errorMessage,
        hideError: props.hideError,
      })
        .with(
          {
            description: P.string.minLength(1),
            errorMessage: P.union(P.nullish, P.string.maxLength(0)),
          },
          ({ description }) => (
            <div {...descriptionProps}>
              <Text variant="body" color="primary-700">
                {description}
              </Text>
            </div>
          ),
        )
        .with({ hideError: true }, () => null)
        .with({ errorMessage: P.string.minLength(1) }, ({ errorMessage }) => (
          <div {...errorMessageProps}>
            <Text variant="body" color="negative-500">
              {errorMessage}
            </Text>
          </div>
        ))
        .otherwise(() => (
          <Text variant="body" aria-hidden={true}>
            &nbsp;
          </Text>
        ))}
    </div>
  );
};

Input.displayName = "Input";
