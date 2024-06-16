import { cx } from "@/styles/mixins";
import React, { PropsWithChildren } from "react";
import { Icon } from "../Icon/Icon";
import { IconName } from "../Icon/Icon.types";
import { Text } from "../Text/Text";
import * as styles from "./Tag.css";

type Props = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  icon?: IconName;
  colorway: "primaryInverse" | "neutral";
}>;

export const Tag: React.FC<Props> = ({ children, className, style, colorway, icon }) => {
  return (
    <div className={cx(styles.container({ colorway }), className)} style={style}>
      <Text variant="small" color="inherit">
        {children}
      </Text>
      {icon && <Icon name={icon} className={styles.icon({ colorway })} />}
    </div>
  );
};

Tag.displayName = "Tag";
