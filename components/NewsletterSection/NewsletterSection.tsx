import { Grid } from "../Grid/Grid";
import NewsletterForm from "../NewsletterForm/NewsletterForm";
import { Section } from "../Section/Section";
import * as styles from "./NewsletterSection.css";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  displayBorderTop?: boolean;
  displayBorderBottom?: boolean;
};

export const NewsletterSection: React.FC<Props> = ({
  className,
  style,
  displayBorderTop = false,
  displayBorderBottom = false,
}) => {
  return (
    <Section
      className={className}
      style={style}
      displayBorderTop={displayBorderTop}
      displayBorderBottom={displayBorderBottom}
    >
      <Grid>
        <div className={styles.dummy} />
        <div className={styles.container}>
          <NewsletterForm autofocus={true} />
        </div>
        <div className={styles.dummy} />
      </Grid>
    </Section>
  );
};

NewsletterSection.displayName = "NewsletterSection";
