import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const form = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[12],
  },
  tablet: {
    gap: vars.sizes[12],
  },
});

export const container = style({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
  columnGap: vars.sizes[12],
  rowGap: vars.sizes[12],
});

export const mention = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "inline!important",
      width: "100%",
      textAlign: "center",
      gap: vars.sizes[4],
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(4),
});

export const input = responsiveStyle({
  mobile: columnCount(12),
  tablet: columnCount(7),
  desktop: columnCount(8),
});

export const buttonContainer = responsiveStyle({
  mobile: [
    columnCount(12),
    {
      height: "100%",
    },
  ],
  tablet: columnCount(5),
  desktop: columnCount(4),
});

export const button = responsiveStyle({
  mobile: {
    width: "100%",
    height: vars.sizes[48],
  },
  tablet: {
    height: "100%",
  },
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
