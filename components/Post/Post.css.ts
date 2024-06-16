import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  padding: vars.sizes[24],
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: vars.sizes[12],
  alignSelf: "stretch",
  backgroundColor: vars.color.neutral[800],
  borderRadius: vars.sizes[8],
  border: `1px solid ${vars.color.neutral[700]}`,
  transition: `border ${transitionDuration}ms ease-out`,

  ":hover": {
    borderColor: vars.color.neutral[500],
  },

  ":focus-visible": {
    outline: "none",
    borderColor: vars.color.primary[500],
  },

  ":focus": {
    outline: "none",
    borderColor: vars.color.primary[500],
  },
});
