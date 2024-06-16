import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { text } from "../Text/Text.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[8],
});

export const input = recipe({
  base: [
    text({ variant: "body-flat" }),
    {
      width: "100%",
      padding: `${vars.sizes[16]} ${vars.sizes[20]}`,
      backgroundColor: vars.color.neutral[800],
      borderRadius: vars.sizes[4],
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: vars.color.neutral[700],
      color: vars.color.neutral[50],
      transitionProperty: "border, background, color",
      transitionDuration: `${transitionDuration}ms`,
      transitionTimingFunction: "ease-out",

      "::placeholder": {
        color: vars.color.neutral[200],
      },

      ":focus-visible": {
        outline: "none",
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
        borderColor: vars.color.neutral[500],
      },
    },
    isDisabled: {
      true: {
        backgroundColor: vars.color.neutral[600],
        color: vars.color.neutral[200],
      },
    },
  },
});

export const label = style({
  fontFamily: vars.font.sans,
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.3125rem",
  color: vars.color.neutral[200],
});

export const requiredMarker = style({
  color: vars.color.negative[500],
});
