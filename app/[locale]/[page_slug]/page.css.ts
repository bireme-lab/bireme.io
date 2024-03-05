import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[48],
});

export const grid = responsiveStyle({
  mobile: {
    gap: vars.sizes[24],
  },
  tablet: {
    marginTop: vars.sizes[48],
  },
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

export const title = responsiveStyle({
  mobile: {
    display: "none",
  },
  tablet: {
    display: "inline",
  },
});

export const mobileTitle = responsiveStyle({
  mobile: {
    display: "inline",
  },
  tablet: {
    display: "none",
  },
});
