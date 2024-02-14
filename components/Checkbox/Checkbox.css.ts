import { transition } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "inline-flex",
  alignItems: "flex-start",
  WebkitTapHighlightColor: "transparent",
  gap: vars.spacings.checkbox.gap,
});

export const checkboxContainer = style({
  position: "relative",
  top: "-1.5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: vars.spacings.checkbox.iconSize,
  height: vars.spacings.checkbox.iconSize,
  minWidth: vars.spacings.checkbox.iconSize,
  minHeight: vars.spacings.checkbox.iconSize,
});

export const checkbox = recipe({
  base: [
    transition({
      duration: 200,
      timingFunction: "ease-out",
      properties: ["border", "background", "outline", "transform"],
    }),
    {
      zIndex: 1,
      width: vars.spacings.checkbox.boxSize,
      height: vars.spacings.checkbox.boxSize,
      minWidth: vars.spacings.checkbox.boxSize,
      minHeight: vars.spacings.checkbox.boxSize,
      position: "relative",
      borderStyle: "solid",
      borderWidth: "1px",
      borderRadius: vars.spacings.checkbox.radius,
      borderColor: vars.color.primary[800],
    },
  ],
  variants: {
    isFocused: {
      true: {
        borderColor: vars.color.primary[500],
      },
    },
    isHovered: {
      true: {
        borderColor: vars.color.primary[500],
      },
    },
    isPressed: {
      true: {
        borderColor: vars.color.primary[800],
      },
    },
  },
});

export const svg = style({
  zIndex: 2,
  position: "absolute",
  top: "-1px",
  color: vars.color.secondary[500],
});

const fillStrokePath1 = keyframes({
  "0%": {
    opacity: 0,
    strokeDasharray: "0px 1px",
  },
  "1%": {
    opacity: 1,
  },
  "100%": {
    strokeDasharray: "1px 1px",
  },
});

const fillStrokePath2 = keyframes({
  "0%": {
    opacity: 0,
    strokeDasharray: "0px 1px",
  },
  "50%": {
    opacity: 0,
    strokeDasharray: "0px 1px",
  },
  "51%": {
    opacity: 1,
  },
  "100%": {
    strokeDasharray: "1px 1px",
  },
});

export const path = recipe({
  base: {
    opacity: 0,
    strokeDasharray: "0px 1px",
  },
  variants: {
    isChecked: {
      true: {
        opacity: 1,
        animationName: fillStrokePath1,
        animationDuration: "200ms",
        animationIterationCount: "initial",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",

        selectors: {
          "&:nth-child(1)": {
            animationName: fillStrokePath2,
            animationDuration: "400ms",
          },
        },
      },
    },
  },
});
