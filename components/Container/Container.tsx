import { cx } from "@/styles/mixins";
import { PropsWithChildren } from "react";
import * as styles from "./Container.css";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  variant?: "header" | "body";
}>;

export const Container: React.FC<Props> = ({ children, className, style, variant = "body" }) => {
  return (
    <div className={cx(styles.container({ variant }), className)} style={style}>
      {children}
    </div>
  );
};

Container.displayName = "Container";
