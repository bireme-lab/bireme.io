import { cx } from "@/styles/mixins";
import type { Color } from "@/styles/theme/index.css";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  type PropsWithChildren,
} from "react";
import { P, match } from "ts-pattern";
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
  | "sup"
  | "figcaption";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type TextProps = {
  href?: never;
  variant?: TextVariant;
  markup?: Extract<ElementType, TextElementType>;
  color?: Color | "inherit" | "none";
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement>;

type LinkProps = {
  href: string;
  variant?: TextVariant;
  markup?: never;
  color?: never;
  className?: string;
  style?: React.CSSProperties;
} & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

type Props = PropsWithChildren<TextProps | LinkProps>;

export const Text: React.FC<Props> = ({
  color = "primary-500",
  className,
  style,
  variant,
  ...props
}) => {
  const colorClass = color === "none" ? "" : styles.textColor[color];
  const classNames = cx(styles.text({ variant }), colorClass, className);

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
        .with({ markup: "sup", children: P.string }, ({ markup, ...props }) => (
          <sup className={cx(styles.sup, colorClass, className)} style={style} {...props} />
        ))
        .with({ markup: "figcaption", children: P.string }, ({ markup, ...props }) => (
          <figcaption className={classNames} style={style} {...props} />
        ))
        .with(
          {
            href: P.string,
            children: P.string,
          },
          (typedProps) => {
            return (
              <a
                className={cx(styles.text({ variant }), className)}
                style={style}
                {...typedProps}
              />
            );
          },
        )
        .with({ href: P.string }, (typedProps) => {
          return (
            <a
              className={cx(styles.text({ variant }), className)}
              style={{ display: style?.display ? style?.display : "block", ...style }}
              {...typedProps}
            />
          );
        })
        .otherwise((props) => (
          <span className={classNames} style={style} {...props} />
        ))}
    </>
  );
};

Text.displayName = "Text";
