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
    paddingTop: vars.sizes[24],
    paddingBottom: vars.sizes[24],
  },
});

export const container = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const logoLink = style({
  color: vars.color.primary[500],
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.primary[600],
  },

  ":focus-visible": {
    outline: "none",
    color: vars.color.primary[600],
  },
});

export const logo = style({
  width: "120px",
  height: "16px",
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
  desktop: columnCount(3),
});

export const legalLinks = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[12],
    listStyle: "none",
  },
  tablet: {
    flexDirection: "row",
    gap: vars.sizes[16],
  },
});

export const legalLink = style({
  color: vars.color.primary[700],

  ":hover": {
    color: vars.color.primary[500],
  },

  ":focus-visible": {
    outline: `1px solid ${vars.color.secondary[500]}`,
    outlineOffset: 2,
    borderRadius: vars.sizes[2],
  },
});
