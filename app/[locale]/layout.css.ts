import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const html = style({
  // backgroundColor: "#040404",
  backgroundColor: vars.color.neutral[900],
  overflowX: "hidden",
});

export const body = responsiveStyle({
  mobile: {
    position: "relative",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "0 auto",
  },
  tablet: {
    width: "calc(100% - 102px)",
  },
});

export const container = responsiveStyle({
  mobile: {
    width: vars.grid.body.mobile.width,
    maxWidth: vars.grid.body.mobile.maxWidth,
  },
  tablet: {
    borderRight: `1px solid ${vars.color.neutral[700]}`,
    borderLeft: `1px solid ${vars.color.neutral[700]}`,
    width: vars.grid.body.tablet.width,
    maxWidth: vars.grid.body.tablet.maxWidth,
  },
  desktop: {
    width: vars.grid.body.desktop.width,
    maxWidth: vars.grid.body.desktop.maxWidth,
    margin: "0 auto",
  },
});
