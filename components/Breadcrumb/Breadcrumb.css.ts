import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "inline-flex",
  width: "100%",
});

export const link = recipe({
  base: responsiveStyle({
    mobile: {
      ":hover": {
        color: vars.color.neutral[50],
      },

      ":focus-visible": {
        outline: `1px solid ${vars.color.primary[500]}`,
        outlineOffset: 2,
        borderRadius: vars.sizes[2],
      },
    },
    desktop: {
      overflow: "unset",
    },
  }),
  variants: {
    isLast: {
      true: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        color: vars.color.invariant.white.a100,
      },
      false: {
        color: vars.color.neutral[200],
      },
    },
  },
});

export const separator = style({
  margin: `0 ${vars.sizes[8]}`,
  userSelect: "none",
});
