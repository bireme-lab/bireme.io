import { cx } from "@/styles/mixins";
import { PropsWithChildren } from "react";
import * as styles from "./Container.css";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

export const Container: React.FC<Props> = ({ children, className, style }) => {
  return (
    <div className={cx(styles.container, className)} style={style}>
      {children}
    </div>
  );
};

Container.displayName = "Container";
