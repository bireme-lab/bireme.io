import { cx } from "@/styles/mixins";
import type { Color } from "@/styles/theme/index.css";
import { ElementType } from "react";
import { match, P } from "ts-pattern";
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
  | "span"
  | "em"
  | "strong"
  | "b"
  | "s"
  | "figcaption";

type Props = {
  children: JSX.Element | string;
  variant?: TextVariant;
  markup?: Extract<ElementType, TextElementType>;
  color?: Color;
  className?: string;
  style?: React.CSSProperties;
};

const isChildrenString = (children: JSX.Element | string) => typeof children === "string";

export const Text: React.FC<Props> = ({
  children,
  variant,
  color = "primary-500",
  markup = "span",
  className,
  style,
}) => {
  const classNames = cx(styles.text({ variant }), styles.textColor[color], className);

  return (
    <>
      {match([markup, children])
        .with(["h1", P._], () => (
          <h1 className={classNames} style={style}>
            {children}
          </h1>
        ))
        .with(["h2", P._], () => (
          <h2 className={classNames} style={style}>
            {children}
          </h2>
        ))
        .with(["h3", P._], () => (
          <h3 className={classNames} style={style}>
            {children}
          </h3>
        ))
        .with(["h4", P._], () => (
          <h4 className={classNames} style={style}>
            {children}
          </h4>
        ))
        .with(["h5", P._], () => (
          <h5 className={classNames} style={style}>
            {children}
          </h5>
        ))
        .with(["h6", P._], () => (
          <h5 className={classNames} style={style}>
            {children}
          </h5>
        ))
        .with(["p", P._], () => (
          <p className={classNames} style={style}>
            {children}
          </p>
        ))
        .with(["small", P.when(isChildrenString)], () => (
          <small className={classNames} style={style}>
            {children}
          </small>
        ))
        .with(["span", P.when(isChildrenString)], () => (
          <span className={classNames} style={style}>
            {children}
          </span>
        ))
        .with(["em", P.when(isChildrenString)], () => (
          <em className={cx(styles.em, styles.textColor[color], className)} style={style}>
            {children}
          </em>
        ))
        .with(["strong", P.when(isChildrenString)], () => (
          <strong className={cx(styles.strong, styles.textColor[color], className)} style={style}>
            {children}
          </strong>
        ))
        .with(["b", P.when(isChildrenString)], () => (
          <b className={cx(styles.strong, styles.textColor[color], className)} style={style}>
            {children}
          </b>
        ))
        .with(["s", P.when(isChildrenString)], () => (
          <s className={cx(styles.s, styles.textColor[color], className)} style={style}>
            {children}
          </s>
        ))
        .with(["figcaption", P.when(isChildrenString)], () => (
          <figcaption className={cx(styles.textColor[color], className)} style={style}>
            {children}
          </figcaption>
        ))
        .otherwise(() => (
          <span className={classNames} style={{ display: "block", ...style }}>
            {children}
          </span>
        ))}
    </>
  );
};

Text.displayName = "Text";
