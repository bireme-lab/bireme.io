import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { text } from "../Text/Text.css";

export const footer = style({
  backgroundColor: vars.color.neutral[800],
});

export const container = responsiveStyle({
  mobile: {
    paddingTop: vars.sizes[48],
    paddingBottom: vars.sizes[128],
    display: "flex",
    flexDirection: "column",
  },
  tablet: {
    paddingBottom: vars.sizes[48],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const logoLink = style({
  transition: `color ${transitionDuration}ms ease-out`,

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 4,
    borderRadius: vars.sizes[2],
  },
});

export const logo = style({
  width: "106px",
  minWidth: "106px",
  height: "20px",
  minHeight: "20px",
  color: "inherit",
});

export const legalLinks = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[12],
    listStyle: "none",
    marginTop: vars.sizes[16],
  },
  tablet: {
    flexDirection: "row",
    gap: vars.sizes[16],
    marginTop: 0,
  },
});

export const legalLink = style([
  text({ variant: "small-flat" }),
  {
    color: vars.color.neutral[200],

    ":hover": {
      color: vars.color.neutral[50],
    },

    ":focus-visible": {
      outline: `1px solid ${vars.color.primary[500]}`,
      outlineOffset: 2,
      borderRadius: vars.sizes[2],
    },
  },
]);

export const logoWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[16],
});

export const socialLinks = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "row",
    gap: vars.sizes[16],
    listStyle: "none",
  },
  tablet: {
    flexDirection: "row",
    marginTop: 0,
  },
});

export const socialLink = style({
  transition: `color ${transitionDuration}ms ease-out`,
  color: vars.color.neutral[200],

  ":hover": {
    color: vars.color.neutral[50],
  },

  ":focus-visible": {
    outline: "none",
    color: vars.color.neutral[50],
  },
});

export const socialIcon = style({
  width: vars.sizes[24],
  height: vars.sizes[24],
  minWidth: vars.sizes[24],
  minHeight: vars.sizes[24],
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[24],
});
