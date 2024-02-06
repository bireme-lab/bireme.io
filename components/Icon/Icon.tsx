import { IconName } from "./Icon.types";
import { sprite } from "./sprite";

export type IconProps = {
  name: IconName;
  title: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const Icon = ({ name, title, label, className, style }: IconProps) => {
  return (
    <svg className={className} aria-label={label} style={style}>
      {title && <title>{title}</title>}
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

Icon.displayName = "Icon";

export const Sprite = () => {
  return (
    <svg
      aria-hidden="true"
      width={0}
      height={0}
      style={{
        position: "absolute",
      }}
      dangerouslySetInnerHTML={{
        __html: sprite,
      }}
    />
  );
};

Sprite.displayName = "Sprite";
