import NextImage, { type ImageProps as NextImageProps, type StaticImageData } from "next/image";
import { P, match } from "ts-pattern";
import { data } from "./data";

type StaticImport = StaticImageData | { default: StaticImageData };
type LocalPublicImage = keyof typeof data;

export type ImageProps = {
  src: StaticImport | LocalPublicImage;
  placeholder?: "empty" | "blur";
} & Exclude<NextImageProps, "src">;

const isLocalPublicImage = (src: StaticImport | LocalPublicImage): src is LocalPublicImage => {
  return typeof src === "string" && Object.keys(data).includes(src);
};

export const Image: React.FC<ImageProps> = ({ placeholder = "blur", ...props }) => {
  return match(props)
    .with({ src: P.when(isLocalPublicImage) }, ({ blurDataURL, ...typedProps }) => {
      return (
        <NextImage
          blurDataURL={data[typedProps.src].blurHash}
          placeholder={placeholder}
          {...typedProps}
        />
      );
    })
    .otherwise((typedProps) => <NextImage placeholder={placeholder} {...typedProps} />);
};

Image.displayName = "Image";
