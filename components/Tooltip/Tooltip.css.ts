import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  position: "relative",
});

const fadeIn = keyframes({
  "0%": {
    transform: "scale(0.95)",
    opacity: 0,
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1,
  },
});

const fadeOut = keyframes({
  "0%": {
    transform: "scale(1)",
    opacity: 1,
  },
  "100%": {
    transform: "scale(0.95)",
    opacity: 0,
  },
});

export const tooltip = recipe({
  base: {
    zIndex: 1,
    position: "absolute",
    top: "100%",
  },
  variants: {
    state: {
      opened: {
        animationName: fadeIn,
        animationDuration: "300ms",
        animationTimingFunction: "ease-out",
      },
      closing: {
        animationName: fadeOut,
        animationDuration: "300ms",
        animationTimingFunction: "ease-out",
      },
      closed: {},
    },
  },
});
