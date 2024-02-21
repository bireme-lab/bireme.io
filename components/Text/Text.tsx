"use client";

import { cx } from "@/styles/mixins";
import type { Color } from "@/styles/theme/index.css";
import Link, { type LinkProps as NextLinkProps } from "next/link";
import { ElementType, type PropsWithChildren } from "react";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { P, isMatching, match } from "ts-pattern";
import * as styles from "./Text.css";

export type TextVariant = keyof typeof styles.text.classNames.variants.variant;

type TextElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "label"
  | "small"
  | "em"
  | "strong"
  | "b"
  | "s"
  | "figcaption";

export type HeadingElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type TextProps = {
  variant?: TextVariant;
  markup?: Extract<ElementType, TextElementType>;
  underlined?: boolean;
  color?: Color | "inherit" | "none";
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement>;

type LinkProps = {
  variant?: TextVariant;
  markup?: never;
  underlined?: boolean;
  color?: Color | "inherit" | "none";
  className?: string;
  style?: React.CSSProperties;
  translateOnHover?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
} & NextLinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = PropsWithChildren<TextProps | LinkProps>;

export const Text: React.FC<Props> = ({
  color = "primary-500",
  className,
  style,
  variant,
  underlined,
  ...props
}) => {
  const colorClass = color === "none" ? "" : styles.textColor[color];
  const classNames = cx(styles.text({ variant, isUnderlined: underlined }), colorClass, className);

  return (
    <>
      {match(props)
        .with({ markup: "h1", children: P._ }, ({ markup, ...props }) => (
          <h1 className={classNames} style={style} {...props} />
        ))
        .with({ markup: "h2", children: P._ }, ({ markup, ...props }) => (
          <h2 className={classNames} style={style} {...props} />
        ))
        .with({ markup: "h3", children: P._ }, ({ markup, ...props }) => (
          <h3 className={classNames} style={style} {...props} />
        ))
        .with({ markup: "h4", children: P._ }, ({ markup, ...props }) => (
          <h4 className={classNames} style={style} {...props} />
        ))
        .with({ markup: "h5", children: P._ }, ({ markup, ...props }) => (
          <h5 className={classNames} style={style} {...props} />
        ))
        .with({ markup: "h6", children: P._ }, ({ markup, ...props }) => (
          <h6 className={classNames} style={style} {...props} />
        ))
        .with({ markup: "p", children: P._ }, ({ markup, ...props }) => (
          <p className={classNames} style={style} {...props} />
        ))
        .with({ markup: "label", children: P._ }, ({ markup, ...props }) => (
          <label className={classNames} style={style} {...props} />
        ))
        .with({ markup: "small", children: P._ }, ({ markup, ...props }) => (
          <small className={classNames} style={style} {...props} />
        ))
        .with({ markup: "em", children: P.string }, ({ markup, ...props }) => (
          <em className={cx(styles.em, colorClass, className)} style={style} {...props} />
        ))
        .with({ markup: "strong", children: P.string }, ({ markup, ...props }) => (
          <strong className={cx(styles.strong, colorClass, className)} style={style} {...props} />
        ))
        .with({ markup: "b", children: P.string }, ({ markup, ...props }) => (
          <b className={cx(styles.strong, colorClass, className)} style={style} {...props} />
        ))
        .with({ markup: "s", children: P.string }, ({ markup, ...props }) => (
          <s className={cx(styles.s, colorClass, className)} style={style} {...props} />
        ))
        .with({ markup: "figcaption", children: P.string }, ({ markup, ...props }) => (
          <figcaption className={cx(colorClass, className)} style={style} {...props} />
        ))
        .with({ href: P.string }, (typedProps) => (
          <LinkComponent
            {...typedProps}
            variant={variant}
            color={color}
            underlined={underlined}
            className={className}
            style={style}
          />
        ))
        .otherwise((props) => (
          <span className={classNames} style={style} {...props} />
        ))}
    </>
  );
};

Text.displayName = "Text";

const LinkComponent: React.FC<LinkProps> = ({
  translateOnHover = false,
  underlined = true,
  color = "primary-500",
  isHovered: isControlledHovered,
  isFocused: isControlledFocused,
  style,
  className,
  ...props
}) => {
  const { isHovered, hoverProps } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing({});
  const isChildrenInlineNode = isMatching({ children: P.string }, props);
  const isUnderlined = underlined && !translateOnHover;
  const classNames = cx(
    styles.text({ variant: props.variant }),
    color === "none" ? "" : styles.textColor[color],
    className,
  );

  return (
    <Link
      className={cx(
        styles.link({
          isUnderlined,
          isHovered: isControlledHovered ?? isHovered,
          isFocused: isControlledFocused ?? isFocusVisible,
        }),
        isChildrenInlineNode && translateOnHover ? "" : classNames,
      )}
      style={match([isChildrenInlineNode, translateOnHover])
        .with([true, true], () => ({
          display: style?.display ? style?.display : "inline-flex",
          overflow: "hidden",
          ...style,
        }))
        .with([true, false], () => style)
        .otherwise(() => ({ display: style?.display ? style?.display : "block", ...style }))}
      {...mergeProps(props, hoverProps, focusProps)}
    >
      {isChildrenInlineNode && translateOnHover ? (
        <span
          className={cx(
            styles.translateAnimationContainer({
              isHovered: isControlledHovered ?? isHovered,
              isFocused: isControlledFocused ?? isFocusVisible,
            }),
            classNames,
          )}
          data-content={props.children}
        >
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </Link>
  );
};

LinkComponent.displayName = "LinkComponent";
