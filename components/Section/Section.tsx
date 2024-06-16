import { cx } from "@/styles/mixins";
import { PropsWithChildren } from "react";
import * as styles from "./Section.css";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  displayBorderBottom?: boolean;
  displayBorderTop?: boolean;
}>;

export const Section: React.FC<Props> = ({
  children,
  className,
  style,
  displayBorderBottom = true,
  displayBorderTop = false,
}) => {
  return (
    <div
      className={cx(styles.section({ displayBorderBottom, displayBorderTop }), className)}
      style={style}
    >
      {children}
    </div>
  );
};

Section.displayName = "Section";
