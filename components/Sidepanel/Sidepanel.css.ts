import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const fadeOut = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});

export const overlay = recipe({
  base: {
    position: "fixed",
    zIndex: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(4px)",
  },
  variants: {
    state: {
      opened: {
        animationName: fadeIn,
        animationDuration: "500ms",
        animationTimingFunction: "cubic-bezier(0.75, 0, 0, 1);",
      },
      closing: {
        animationName: fadeOut,
        animationDuration: "500ms",
        animationTimingFunction: "cubic-bezier(0.75, 0, 0, 1);",
      },
      closed: {},
    },
  },
});

const slideInRight = keyframes({
  "0%": {
    transform: "translateX(100%)",
  },
  "100%": {
    transform: "translateX(0)",
  },
});

const slideOutRight = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(100%)",
  },
});

const slideInBottom = keyframes({
  "0%": {
    transform: "translateY(100%)",
  },
  "100%": {
    transform: "translateY(0)",
  },
});

const slideOutBottom = keyframes({
  "0%": {
    transform: "translateY(0)",
  },
  "100%": {
    transform: "translateY(100%)",
  },
});

export const container = recipe({
  base: responsiveStyle({
    mobile: {
      position: "absolute",
      right: 0,
      display: "flex",
      flexDirection: "column",
      backgroundColor: vars.color.neutral[900],
      width: "100%",
      height: "100%",
      padding: vars.sizes[32],
      gap: vars.sizes[24],
    },
    tablet: {
      width: "450px",
    },
  }),
  variants: {
    state: {
      opened: responsiveStyle({
        mobile: {
          animationName: slideInBottom,
          animationDuration: "500ms",
          animationTimingFunction: "cubic-bezier(0.75, 0, 0, 1);",
        },
        tablet: {
          animationName: slideInRight,
        },
      }),
      closing: responsiveStyle({
        mobile: {
          animationName: slideOutBottom,
          animationDuration: "500ms",
          animationTimingFunction: "cubic-bezier(0.75, 0, 0, 1);",
        },
        tablet: {
          animationName: slideOutRight,
        },
      }),
      closed: {},
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const close = recipe({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: vars.sizes[24],
    height: vars.sizes[24],
    minWidth: vars.sizes[24],
    minHeight: vars.sizes[24],
    borderRadius: vars.radii[2],
    transition: `background-color ${transitionDuration}ms ease-out`,

    ":focus-within": {
      outline: "none",
    },
  },
  variants: {
    isHovered: {
      true: {
        backgroundColor: vars.color.primary[900],
      },
    },
    isFocused: {
      true: {
        backgroundColor: vars.color.primary[900],
      },
    },
    isPressed: {
      true: {
        backgroundColor: vars.color.primary[800],
      },
    },
  },
});

export const closeIcon = style({
  width: vars.sizes[20],
  height: vars.sizes[20],
  minWidth: vars.sizes[20],
  minHeight: vars.sizes[20],
  color: vars.color.primary[500],
});
