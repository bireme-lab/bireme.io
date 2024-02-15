import { transition } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const wrapper = recipe({
  base: {
    overflow: "hidden",
    borderRadius: "50%",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
    flexShrink: 0,
    width: vars.spacings.avatar.size,
    height: vars.spacings.avatar.size,
    cursor: "help",
  },
  variants: {
    isTooltipDisabled: {
      true: {
        cursor: "default",
      },
    },
  },
});

export const tooltipAvatarWrapper = style({
  overflow: "hidden",
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  flexShrink: 0,
  width: vars.spacings.avatar.tooltipAvatarSize,
  height: vars.spacings.avatar.tooltipAvatarSize,
});

export const image = style({
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});

export const tooltip = style({
  minWidth: "220px",
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.spacings.avatar.tooltipVerticalPadding} ${vars.spacings.avatar.tooltipHorizontalPadding}`,
  borderRadius: vars.spacings.avatar.tooltipRadius,
  backgroundColor: vars.color.neutral[900],
});

export const tooltipContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapExtraSmall,
});

export const networkIcon = style([
  transition({
    duration: 200,
    timingFunction: "ease-out",
    properties: ["color"],
  }),
  {
    width: vars.spacings.avatar.networkIconSize,
    height: vars.spacings.avatar.networkIconSize,
    cursor: "pointer",

    ":hover": {
      color: vars.color.primary[600],
    },
  },
]);

export const tooltipContainer = style({
  display: "flex",
  gap: vars.spacings.content.gapSmall,
  alignItems: "center",
});
