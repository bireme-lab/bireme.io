import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const link = recipe({
  base: responsiveStyle({
    mobile: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",

      ":hover": {
        color: vars.color.secondary[500],
      },

      ":focus-visible": {
        outline: `1px solid ${vars.color.secondary[500]}`,
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
        color: vars.color.secondary[500],
      },
      false: {
        color: vars.color.primary[700],
      },
    },
  },
});

export const separator = style({
  margin: `0 ${vars.sizes[8]}`,
  userSelect: "none",
});
