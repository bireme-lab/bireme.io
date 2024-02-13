import { cx } from "@/styles/mixins";
import type { Color } from "@/styles/theme/index.css";
import Link, { LinkProps as NextLinkProps } from "next/link";
import { ElementType, PropsWithChildren } from "react";
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
  | "small"
  | "em"
  | "strong"
  | "b"
  | "s"
  | "figcaption";

type TextProps = {
  variant?: TextVariant;
  markup?: Extract<ElementType, TextElementType>;
  color?: Color | "inherit";
  className?: string;
  style?: React.CSSProperties;
};

type LinkProps = {
  variant?: TextVariant;
  underlined?: boolean;
  color?: Color | "inherit";
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
  ...props
}) => {
  const classNames = cx(styles.text({ variant }), styles.textColor[color], className);

  return (
    <>
      {match(props)
        .with({ markup: "h1", children: P._ }, ({ children }) => (
          <h1 className={classNames} style={style}>
            {children}
          </h1>
        ))
        .with({ markup: "h2", children: P._ }, ({ children }) => (
          <h2 className={classNames} style={style}>
            {children}
          </h2>
        ))
        .with({ markup: "h3", children: P._ }, ({ children }) => (
          <h3 className={classNames} style={style}>
            {children}
          </h3>
        ))
        .with({ markup: "h4", children: P._ }, ({ children }) => (
          <h4 className={classNames} style={style}>
            {children}
          </h4>
        ))
        .with({ markup: "h5", children: P._ }, ({ children }) => (
          <h5 className={classNames} style={style}>
            {children}
          </h5>
        ))
        .with({ markup: "h6", children: P._ }, ({ children }) => (
          <h5 className={classNames} style={style}>
            {children}
          </h5>
        ))
        .with({ markup: "p", children: P._ }, ({ children }) => (
          <p className={classNames} style={style}>
            {children}
          </p>
        ))
        .with({ markup: "small", children: P._ }, ({ children }) => (
          <small className={classNames} style={style}>
            {children}
          </small>
        ))
        .with({ markup: "em", children: P.string }, ({ children }) => (
          <em className={cx(styles.em, styles.textColor[color], className)} style={style}>
            {children}
          </em>
        ))
        .with({ markup: "strong", children: P.string }, ({ children }) => (
          <strong className={cx(styles.strong, styles.textColor[color], className)} style={style}>
            {children}
          </strong>
        ))
        .with({ markup: "b", children: P.string }, ({ children }) => (
          <b className={cx(styles.strong, styles.textColor[color], className)} style={style}>
            {children}
          </b>
        ))
        .with({ markup: "s", children: P.string }, ({ children }) => (
          <s className={cx(styles.s, styles.textColor[color], className)} style={style}>
            {children}
          </s>
        ))
        .with({ markup: "figcaption", children: P.string }, ({ children }) => (
          <figcaption className={cx(styles.textColor[color], className)} style={style}>
            {children}
          </figcaption>
        ))
        .with({ href: P.string }, (typedProps) => <LinkComponent {...typedProps} />)
        .otherwise(({ children }) => (
          <span className={classNames} style={style}>
            {children}
          </span>
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
  const isUnderlined = underlined && isChildrenInlineNode && !translateOnHover;
  const classNames = cx(
    styles.text({ variant: props.variant }),
    styles.textColor[color],
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
        classNames,
      )}
      style={match([isChildrenInlineNode, translateOnHover])
        .with([true, true], () => ({
          display: "inline-flex",
          overflow: "hidden",
          ...style,
        }))
        .with([true, false], () => style)
        .otherwise(() => ({ display: "block", ...style }))}
      {...mergeProps(props, hoverProps, focusProps)}
    >
      {isChildrenInlineNode && translateOnHover ? (
        <span
          className={styles.translateAnimationContainer({
            isHovered: isControlledHovered ?? isHovered,
            isFocused: isControlledFocused ?? isFocusVisible,
          })}
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
