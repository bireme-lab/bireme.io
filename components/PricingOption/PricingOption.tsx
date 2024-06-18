import { cx } from "@/styles/mixins";
import { Locale } from "@/utils/i18n";
import { getTranslations } from "next-intl/server";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./PricingOption.css";

type Props = {
  locale: Locale;
  variant: "primary" | "neutral";
  className?: string;
  style?: React.CSSProperties;
  title: string;
  description: string;
  price: string;
  perks: string[];
};

export const PricingOption: React.FC<Props> = async ({
  variant,
  title,
  description,
  price,
  className,
  style,
  perks,
}) => {
  const t = await getTranslations("components.PricingOption");

  return (
    <div className={cx(styles.container({ variant }), className)} style={style}>
      <div className={styles.header}>
        <Text markup="h3" variant="title2" color="inherit" className={styles.title({ variant })}>
          {title}
        </Text>
        <Text markup="p" variant="body" color="inherit" className={styles.description({ variant })}>
          {description}
        </Text>
        <div>
          <Text variant="title1" color="inherit" className={styles.price({ variant })}>
            {price}
          </Text>
          <Text variant="title3" color="inherit" className={styles.priceTag({ variant })}>
            {t("price_tag")}
          </Text>
        </div>
      </div>
      <ul className={styles.perks}>
        {perks.map((perk) => (
          <li key={perk} className={styles.perk}>
            <div className={styles.perkIconContainer({ variant })}>
              <Icon className={styles.perkIcon} name="check" />
            </div>
            <Text variant="body" color="inherit" className={styles.perkTitle({ variant })}>
              {perk}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

PricingOption.displayName = "PricingOption";
