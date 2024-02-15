import NextImage, { type ImageProps as NextImageProps, type StaticImageData } from "next/image";
import { P, match } from "ts-pattern";
import { data } from "./data";

type StaticImport = StaticImageData | { default: StaticImageData };
type LocalPublicImage = keyof typeof data;

export type ImageProps = {
  src: StaticImport | LocalPublicImage;
} & Exclude<NextImageProps, "src">;

const isLocalPublicImage = (src: StaticImport | LocalPublicImage): src is LocalPublicImage => {
  return typeof src === "string" && Object.keys(data).includes(src);
};

export const Image: React.FC<ImageProps> = (props) => {
  return match(props)
    .with({ src: P.when(isLocalPublicImage) }, ({ blurDataURL, placeholder, ...typedProps }) => {
      return (
        <NextImage placeholder="blur" blurDataURL={data[typedProps.src].blurHash} {...typedProps} />
      );
    })
    .otherwise(({ placeholder, ...typedProps }) => (
      <NextImage placeholder="blur" {...typedProps} />
    ));
};

Image.displayName = "Image";
