import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[48],
});

export const breadcrumb = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(4)],
  desktop: [columnCount(6)],
});

export const heroContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[12],
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

export const bodyBeginWithHeading = style({});

globalStyle(
  `${bodyBeginWithHeading} h2:first-of-type, h3:first-of-type, h4:first-of-type, h5:first-of-type, h6:first-of-type`,
  {
    paddingTop: 0,
  },
);

export const dummy = responsiveStyle({
  mobile: [columnCount(0)],
  tablet: [columnCount(0)],
  desktop: [columnCount(3)],
});
