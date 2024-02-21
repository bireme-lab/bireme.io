import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const goBack = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[4],
});

export const goBackIcon = style({
  width: vars.sizes[16],
  height: vars.sizes[16],
  minWidth: vars.sizes[16],
  minHeight: vars.sizes[16],
  color: vars.color.primary[700],
});

export const article = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
  marginTop: vars.sizes[24],
});

export const heroContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[12],
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

export const postBodyWrapper = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[24],
  },
  variants: {
    isBodyStartingWithHeading: {
      true: {
        marginTop: "-8px",
      },
    },
  },
});

export const listItem = style({
  display: "list-item",
  marginBottom: vars.sizes[12],
  fontFamily: vars.font.sans,
  fontSize: "0.9375rem",
  fontWeight: 400,
  lineHeight: "1.5625rem",
  color: vars.color.primary[600],

  ":last-of-type": {
    marginBottom: 0,
  },
});

export const list = style({
  marginLeft: vars.sizes[12],
});
