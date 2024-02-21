import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[16],
  paddingTop: vars.sizes[24],
  paddingBottom: vars.sizes[24],
});

export const nav = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const logoLink = style({
  color: vars.color.primary[500],
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.primary[600],
  },

  ":focus": {
    outline: "none",
    color: vars.color.primary[600],
  },
});

export const logo = style({
  width: "138px",
  height: "20px",
  color: "inherit",
});

export const comment = style({
  alignSelf: "flex-end",
  userSelect: "none",
});

export const commentButton = recipe({
  base: {
    transition: `color ${transitionDuration}ms ease-out`,
    color: vars.color.secondary[500],

    ":focus-visible": {
      outline: "none",
    },
  },
  variants: {
    isHovered: {
      true: {
        color: vars.color.secondary[600],
      },
    },
    isFocused: {
      true: {
        outline: "none",
        color: vars.color.secondary[600],
      },
    },
    isPressed: {
      true: {
        outline: "none",
        color: vars.color.secondary[700],
      },
    },
  },
});

export const buttonWrapper = style({
  position: "relative",
});

export const handwrittenShape = style({
  position: "absolute",
  width: "150px",
  height: "50px",
  top: "-8px",
  right: 0,
  left: 0,
  bottom: 0,
  color: vars.color.secondary[500],
  pointerEvents: "none",
});
