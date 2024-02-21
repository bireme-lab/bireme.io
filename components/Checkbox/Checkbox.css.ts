import { transitionDuration, vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "inline-flex",
  alignItems: "flex-start",
  WebkitTapHighlightColor: "transparent",
  gap: vars.sizes[2],
});

export const checkboxContainer = style({
  position: "relative",
  top: "-1.5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: vars.sizes[24],
  height: vars.sizes[24],
  minWidth: vars.sizes[24],
  minHeight: vars.sizes[24],
});

export const checkbox = recipe({
  base: {
    zIndex: 1,
    width: vars.sizes[12],
    height: vars.sizes[12],
    minWidth: vars.sizes[12],
    minHeight: vars.sizes[12],
    position: "relative",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: vars.sizes[2],
    borderColor: vars.color.primary[800],
    transitionProperty: "transform, border, background, outline",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",
  },
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
