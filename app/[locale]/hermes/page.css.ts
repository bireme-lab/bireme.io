import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "735px",
});

export const titleDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(2),
});

export const titleWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[8],
    },
  ],
  tablet: columnCount(4),
  desktop: columnCount(8),
});

export const title = responsiveStyle({
  mobile: {
    fontSize: "2.5rem!important",
    lineHeight: "2.5rem!important",
    background: "linear-gradient(to right bottom, #F9EADE 30%, #FFC799) text",
    boxDecorationBreak: "clone",
    WebkitTextFillColor: "transparent",
    color: "unset",
    textWrap: "balance",
    textAlign: "left",
  },
  tablet: {
    fontSize: "3rem!important",
    lineHeight: "3rem!important",
  },
});

export const titleSpan = style({
  display: "inline-block",
  verticalAlign: "top",
  textDecoration: "inherit",
  textWrap: "balance",

  "::selection": {
    backgroundColor: `rgba(228, 204, 76, 0.5)`,
    color: vars.color.neutral[900],
  },
});

export const titleLig = style({});

export const dummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(2),
});
