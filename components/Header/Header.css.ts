import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[16],
  paddingTop: vars.sizes[24],
  paddingBottom: vars.sizes[24],
});

export const nav = style({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const logoLink = style({
  position: "relative",
  color: vars.color.invariant.white.a100,
  transition: `color ${transitionDuration}ms ease-out`,

  // "::before": {
  //   zIndex: -1,
  //   content: "",
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: vars.color.neutral[700],
  //   boxShadow: `0 0 0 8px ${vars.color.neutral[700]}`,
  //   borderRadius: vars.sizes[2],
  //   opacity: 0,
  //   transition: `opacity ${transitionDuration}ms ease-out`,
  // },

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 4,
    borderRadius: vars.sizes[2],
  },

  // selectors: {
  //   "&:hover::before": {
  //     opacity: 1,
  //   }
  // }
});

export const logo = style({
  width: "115px",
  height: "27px",
  color: "inherit",
});

export const newsletterText = responsiveStyle({
  mobile: {
    display: "none!important",
  },
  tablet: {
    display: "inline!important",
  },
});

export const handwrittenShape = responsiveStyle({
  mobile: {
    position: "absolute",
    width: "190px",
    height: "70px",
    top: 0,
    right: 0,
    bottom: 0,
    color: vars.color.primary[500],
    pointerEvents: "none",
    display: "none",
  },
  tablet: {
    display: "inline",
  },
});
