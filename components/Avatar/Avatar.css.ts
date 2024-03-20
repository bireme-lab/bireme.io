import { transitionDuration, vars } from "@/styles/theme/index.css";
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
    width: vars.sizes[24],
    height: vars.sizes[24],
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
  width: vars.sizes[32],
  height: vars.sizes[32],
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
  padding: `${vars.sizes[16]} ${vars.sizes[20]}`,
  borderRadius: vars.sizes[4],
  backgroundColor: vars.color.neutral[800],
});

export const tooltipContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[4],
});

export const networkIcon = style({
  width: vars.sizes[24],
  height: vars.sizes[24],
  cursor: "pointer",
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.neutral[50],
  },
});

export const tooltipContainer = style({
  display: "flex",
  gap: vars.sizes[8],
  alignItems: "center",
});
