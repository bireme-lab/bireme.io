import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  gap: vars.sizes[24],
  height: "52px",
  borderBottom: `1px solid ${vars.color.neutral[700]}`,
});

export const nav = style({
  position: "relative",
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

export const logoLink = style({
  position: "relative",
  color: vars.color.invariant.white.a100,
  transition: `color ${transitionDuration}ms ease-out`,

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 4,
    borderRadius: vars.sizes[2],
  },
});

export const biremeLabLogo = style({
  width: "106px",
  minWidth: "106px",
  height: "20px",
  color: "inherit",
});

export const dedaleLogo = style({
  width: "79px",
  minWidth: "79px",
  height: "20px",
  color: "inherit",
});

export const navLinks = style({
  display: "flex",
  flexDirection: "row",
  gap: vars.sizes[24],
  listStyle: "none",
});

export const navLink = style({
  position: "relative",
  color: vars.color.neutral[200],

  "::before": {
    zIndex: -1,
    content: "",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: vars.color.neutral[700],
    boxShadow: `0 0 0 6px ${vars.color.neutral[700]}`,
    borderRadius: vars.sizes[2],
    opacity: 0,
    transition: `opacity ${transitionDuration}ms ease-out`,
  },

  ":focus-visible": {
    color: vars.color.neutral[50],
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 4,
    borderRadius: vars.sizes[2],
  },

  selectors: {
    "&:hover": {
      color: vars.color.neutral[50],
    },
    "&:hover::before": {
      opacity: 1,
    },
  },
});

export const wrapper = style({
  display: "flex",
  flexDirection: "row",
  gap: vars.sizes[24],
  alignItems: "center",
});
