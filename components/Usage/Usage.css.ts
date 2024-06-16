import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  background: vars.color.neutral[800],
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.sizes[8],
  padding: vars.sizes[24],
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
  transition: `border ${transitionDuration}ms ease-out`,

  ":hover": {
    border: `1px solid ${vars.color.neutral[500]}`,
  },

  ":focus-visible": {
    outline: "none",
    border: `1px solid ${vars.color.primary[500]}`,
  },

  ":focus": {
    outline: "none",
    border: `1px solid ${vars.color.primary[500]}`,
  },
});

export const tag = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "row",
  alignSelf: "flex-start",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[12],
});

export const readDoc = style({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
});

export const readDocIcon = style({
  color: vars.color.neutral[50],
  width: vars.sizes[16],
  minWidth: vars.sizes[16],
  height: vars.sizes[16],
  minHeight: vars.sizes[16],
});
