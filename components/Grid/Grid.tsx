import { cx } from "@/styles/mixins";
import { PropsWithChildren } from "react";
import * as styles from "./Grid.css";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

export const Grid: React.FC<Props> = ({ className, style, children }) => {
  return (
    <div className={cx(styles.grid, className)} style={style}>
      {children}
    </div>
  );
};

Grid.displayName = "Grid";
