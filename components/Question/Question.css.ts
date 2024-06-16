import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {
    backgroundColor: vars.color.neutral[800],
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: vars.sizes[8],
    transition: `all ${transitionDuration}ms ease-out`,
    border: `1px solid ${vars.color.neutral[700]}`,
    overflow: "hidden",
  },
  variants: {
    isHovered: {
      true: {
        backgroundColor: vars.color.neutral[700],
      },
      false: {},
    },
    isFocused: {
      true: {
        borderColor: vars.color.primary[500],
      },
      false: {},
    },
  },
});

export const button = style({
  position: "relative",
  display: "flex",
  overflow: "hidden",
  width: "auto",
  borderRadius: vars.sizes[8],
  cursor: "pointer",
  backgroundColor: "transparent",
  margin: 0,
  padding: `${vars.sizes[20]} ${vars.sizes[24]}`,
  border: "none",
  gap: vars.sizes[8],

  // Prevents flickering on Safari
  backfaceVisibility: "hidden",
  transformStyle: "preserve-3d",

  ":focus": {
    outline: "none",
  },
  ":focus-visible": {
    outline: "none",
  },
});

export const answer = recipe({
  base: {
    paddingTop: 0,
    paddingBottom: vars.sizes[24],
    paddingLeft: vars.sizes[56],
    paddingRight: vars.sizes[24],
    transition: `all ${transitionDuration}ms ease-out`,
  },
  variants: {
    isOpened: {
      true: {
        opacity: 1,
        height: "unset",
        paddingBottom: vars.sizes[24],
      },
      false: {
        opacity: 0,
        height: 0,
        paddingBottom: 0,
      },
    },
  },
});

export const icon = recipe({
  base: {
    color: vars.color.neutral[200],
    width: vars.sizes[24],
    height: vars.sizes[24],
    minWidth: vars.sizes[24],
    minHeight: vars.sizes[24],
    transition: `transform ${transitionDuration}ms ease-out`,
  },
  variants: {
    isOpened: {
      true: {
        transform: "rotate(90deg)",
      },
      false: {
        transform: "rotate(0deg)",
      },
    },
  },
});

export const questionText = style({
  textAlign: "left",
});
