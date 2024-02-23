import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const grid = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
  marginTop: vars.sizes[24],
});

export const title = style({
  marginTop: vars.sizes[8],
});

export const threeCols = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(2)],
  desktop: [columnCount(3)],
});

export const fiveCols = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(4)],
  desktop: [columnCount(5)],
});

export const postBodyWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
});
