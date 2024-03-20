import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
});

export const input = style({
  marginBottom: vars.sizes[12],
});

export const mention = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "inline",
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(4),
});

export const inputsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[8],
});

export const buttonWrapper = style({
  marginTop: vars.sizes[12],
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[12],
});

export const mentionsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[8],
});

export const link = style({
  color: vars.color.primary[500],

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 2,
    borderRadius: vars.sizes[2],
  },
  ":hover": {
    color: vars.color.primary[300],
  },
});
