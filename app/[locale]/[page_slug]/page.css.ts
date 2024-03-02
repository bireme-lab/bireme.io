import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const grid = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
  marginTop: vars.sizes[48],
});

export const side = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(2)],
  desktop: [columnCount(3)],
});

export const body = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(4)],
  desktop: [columnCount(6)],
});

export const postBodyWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
});
