import { transition } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapSmall,
});

export const input = recipe({
  base: [
    transition({
      duration: 200,
      timingFunction: "ease-out",
      properties: ["border", "background", "color"],
    }),
    {
      width: "100%",
      padding: `${vars.spacings.input.verticalPadding} ${vars.spacings.input.horizontalPadding}`,
      backgroundColor: vars.color.neutral[800],
      borderRadius: vars.spacings.input.radius,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: vars.color.neutral[800],
      fontFamily: vars.font.sans,
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "0.875rem",
      color: vars.color.primary[500],

      "::placeholder": {
        color: vars.color.primary[700],
      },

      ":focus-visible": {
        outline: "none",
        borderColor: vars.color.primary[500],
      },
    },
  ],
  variants: {
    isFocused: {
      true: {
        outline: "none",
        borderColor: vars.color.primary[500],
      },
    },
    isErrored: {
      true: {
        borderColor: vars.color.negative[500],
      },
    },
    isHovered: {
      true: {
        borderColor: vars.color.primary[500],
      },
    },
    isDisabled: {
      true: {
        backgroundColor: vars.color.neutral[700],
        color: vars.color.primary[600],
      },
    },
  },
});

export const label = style({
  fontFamily: vars.font.sans,
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.3125rem",
  color: vars.color.primary[700],
});

export const requiredMarker = style({
  color: vars.color.negative[500],
});
