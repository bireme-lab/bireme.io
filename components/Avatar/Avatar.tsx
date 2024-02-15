import { cx } from "@/styles/mixins";
import { Image, ImageProps } from "../Image/Image";
import * as styles from "./Avatar.css";

export const Avatar: React.FC<ImageProps> = ({ className, style, ...props }) => {
  const imgSize = 24;

  return (
    <div className={cx(styles.container, className)} style={style}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image width={imgSize} height={imgSize} {...props} />
    </div>
  );
};

Avatar.displayName = "Avatar";
