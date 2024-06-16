import { cx } from "@/styles/mixins";
import type { PropsWithChildren } from "react";
import * as styles from "./Grid.css";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  variant?: "body" | "header";
}>;

export const Grid: React.FC<Props> = ({ className, style, children, variant = "body" }) => {
  return (
    <div className={cx(styles.grid({ variant }), className)} style={style}>
      {children}
    </div>
  );
};

Grid.displayName = "Grid";
