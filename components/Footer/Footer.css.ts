import { responsiveStyle } from "@/styles/mixins";
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

export const container = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
  },
  tablet: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export const logoLink = style({
  color: vars.color.primary[500],
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.primary[600],
  },

  ":focus-visible": {
    outline: `1px solid ${vars.color.secondary[500]}`,
    outlineOffset: 4,
    borderRadius: vars.sizes[2],
  },
});

export const logo = style({
  width: "115px",
  height: "27px",
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

export const logoWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[16],
});

export const socialLinks = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[16],
    listStyle: "none",
  },
  tablet: {
    flexDirection: "row",
    marginTop: 0,
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
  gap: vars.sizes[48],
});
