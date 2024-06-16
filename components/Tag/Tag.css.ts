import { vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {
    background: vars.color.primary[900],
    borderRadius: vars.sizes[4],
    padding: `${vars.sizes[6]} ${vars.sizes[8]}`,
    gap: vars.sizes[4],
    alignItems: "center",
  },
  variants: {
    colorway: {
      primaryInverse: {
        background: vars.color.primary[900],
        color: vars.color.primary[500],
      },
      neutral: {
        background: vars.color.neutral[700],
        color: vars.color.primary[50],
      },
    },
  },
});

export const icon = recipe({
  base: {
    width: vars.sizes[16],
    minWidth: vars.sizes[16],
    height: vars.sizes[16],
    minHeight: vars.sizes[16],
  },
  variants: {
    colorway: {
      primaryInverse: {
        color: vars.color.primary[500],
      },
      neutral: {
        color: vars.color.primary[50],
      },
    },
  },
});
