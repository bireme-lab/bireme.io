import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const article = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[48],
});

export const heroContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
});

export const breadcrumb = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(4)],
  desktop: [columnCount(6)],
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

export const dummy = responsiveStyle({
  mobile: [columnCount(0)],
  tablet: [columnCount(0)],
  desktop: [columnCount(3)],
});
