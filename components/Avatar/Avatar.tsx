"use client";

import { cx } from "@/styles/mixins";
import { useTranslations } from "next-intl";
import { Icon } from "../Icon/Icon";
import { Image, ImageProps } from "../Image/Image";
import { Text } from "../Text/Text";
import { TooltipTrigger } from "../Tooltip/Tooltip";
import * as styles from "./Avatar.css";

type Props = {
  disableTooltip?: boolean;
  firstName: string;
  lastName: string;
  position: string;
  twitterProfileUrl: string;
} & ImageProps;

export const Avatar: React.FC<Props> = ({
  className,
  style,
  disableTooltip = false,
  firstName,
  lastName,
  position,
  twitterProfileUrl,
  ...props
}) => {
  const avatarSize = 24;
  const tooltipAvatarSize = 32;
  const t = useTranslations("components.Avatar");

  return (
    <TooltipTrigger
      delay={0}
      closeDelay={200}
      triggerClassName={cx(styles.wrapper({ isTooltipDisabled: disableTooltip }), className)}
      triggerStyle={style}
      tooltipClassName={styles.tooltip}
      isDisabled={disableTooltip}
      tooltip={() => (
        <>
          <div className={styles.tooltipContainer}>
            <div className={styles.tooltipAvatarWrapper}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                placeholder="empty"
                width={tooltipAvatarSize}
                height={tooltipAvatarSize}
                {...props}
              />
            </div>
            <div className={styles.tooltipContent}>
              <Text variant="small-flat">
                {firstName} {lastName}
              </Text>
              <Text variant="small-flat" color="primary-700">
                {position}
              </Text>
            </div>
          </div>
          <Text href={twitterProfileUrl} target="_blank" rel="noopener noreferrer">
            <Icon
              name="x"
              title={t("follow_on_twitter", { name: `${firstName} ${lastName}` })}
              className={styles.networkIcon}
            />
          </Text>
        </>
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image placeholder="empty" width={avatarSize} height={avatarSize} {...props} />
    </TooltipTrigger>
  );
};

Avatar.displayName = "Avatar";
