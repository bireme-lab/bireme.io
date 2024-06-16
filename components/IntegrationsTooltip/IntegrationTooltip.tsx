"use client";

import { useTranslations } from "next-intl";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import { TooltipTrigger } from "../Tooltip/Tooltip";
import * as styles from "./IntegrationTooltip.css";

export const IntegrationTooltip: React.FC = () => {
  const t = useTranslations("pages.Dedale");

  return (
    <TooltipTrigger
      delay={0}
      closeDelay={200}
      tooltip={() => (
        <div className={styles.tooltipContainer}>
          <Text variant="small">{t("integrate_to_tooltip")}</Text>
        </div>
      )}
    >
      <Icon name="info-primary" className={styles.icon} />
    </TooltipTrigger>
  );
};

IntegrationTooltip.displayName = "IntegrationTooltip";
