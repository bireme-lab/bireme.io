import { cx } from "@/styles/mixins";
import type { Color } from "@/styles/theme/index.css";
import { match } from "ts-pattern";
import * as styles from "./Text.css";

export type TextVariant = keyof typeof styles.text.classNames.variants.variant;

type Props = {
  children: string;
  variant?: TextVariant;
  color?: "default" | Color;
  className?: string;
  style?: React.CSSProperties;
};

export const Text: React.FC<Props> = ({
  children,
  variant = "span",
  color = "default",
  className,
  style,
}) => {
  const classNames = cx(styles.text({ variant }), styles.textColor[color], className);

  return (
    <>
      {match(variant)
        .with("heading1", () => (
          <h1 className={classNames} style={style}>
            {children}
          </h1>
        ))
        .with("heading2", () => (
          <h2 className={classNames} style={style}>
            {children}
          </h2>
        ))
        .with("heading3", () => (
          <h3 className={classNames} style={style}>
            {children}
          </h3>
        ))
        .with("section-heading", () => (
          <h4 className={classNames} style={style}>
            {children}
          </h4>
        ))
        .with("paragraph", () => (
          <p className={classNames} style={style}>
            {children}
          </p>
        ))
        .otherwise(() => (
          <span className={classNames} style={style}>
            {children}
          </span>
        ))}
    </>
  );
};

Text.displayName = "Text";
