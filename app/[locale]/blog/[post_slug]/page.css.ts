import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

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

export const grid = responsiveStyle({
  mobile: {
    rowGap: vars.sizes[72],
  },
  desktop: {
    rowGap: "unset",
  },
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
