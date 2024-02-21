import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const footer = responsiveStyle({
  mobile: {
    width: "100%",
    paddingTop: vars.sizes[48],
    paddingBottom: vars.sizes[48],
    backgroundColor: vars.color.neutral[900],
  },
  desktop: {
    paddingTop: vars.sizes[72],
    paddingBottom: vars.sizes[72],
  },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
});

export const logoLink = style({
  color: vars.color.primary[500],
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.primary[600],
  },

  ":focus": {
    outline: "none",
    color: vars.color.primary[600],
  },
});

export const logo = style({
  width: "140px",
  height: "24px",
  color: "inherit",
});

export const form = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[16],
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(4),
});

export const input = style({
  marginBottom: vars.sizes[12],
});

export const submitButton = style({
  marginTop: vars.sizes[12],
});

export const mention = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "inline",
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(4),
});

export const legalLinks = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[12],
    marginTop: vars.sizes[16],
  },
  tablet: {
    flexDirection: "row",
    gap: vars.sizes[16],
  },
});

export const inputsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[8],
});
