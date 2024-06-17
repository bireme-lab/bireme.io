import { cx } from "@/styles/mixins";
import { match } from "ts-pattern";
import { Image, ImageSrc } from "../Image/Image";
import { Text } from "../Text/Text";
import * as styles from "./BentoCard.css";

type Props = {
  variant: "contained" | "covered";
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
  illustration: ImageSrc;
};

export const BentoCard: React.FC<Props> = ({
  className,
  style,
  title,
  description,
  variant,
  illustration,
}) => {
  return (
    <div className={cx(styles.container, className)} style={style}>
      <div className={styles.wrapper}>
        <Text markup="h3" variant="title2" color="white-a100">
          {title}
        </Text>
        <Text markup="p" variant="body">
          {description}
        </Text>
      </div>
      {match(variant)
        .with("contained", () => (
          <div className={styles.containedIllustrationContainer}>
            <Image
              src={illustration}
              alt={description}
              title={title}
              fill={true}
              className={styles.containedIllustration}
            />
          </div>
        ))
        .with("covered", () => (
          <div className={styles.coveredIllustrationContainer}>
            <div className={styles.satin} />
            <Image
              src={illustration}
              alt={description}
              title={title}
              fill={true}
              className={styles.coveredIllustration}
            />
          </div>
        ))
        .exhaustive()}
    </div>
  );
};

BentoCard.displayName = "BentoCard";
