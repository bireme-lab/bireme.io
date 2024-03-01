import { transitionDuration, vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const trigger = recipe({
  base: {
    transition: `color ${transitionDuration}ms ease-out`,
    color: vars.color.primary[500],
    cursor: "pointer",

    ":focus-visible": {
      outline: "none",
    },
  },
  variants: {
    isHovered: {
      true: {
        color: vars.color.primary[600],
      },
    },
    isFocused: {
      true: {
        outline: "none",
        color: vars.color.primary[600],
      },
    },
    isPressed: {
      true: {
        outline: "none",
        color: vars.color.primary[700],
      },
    },
  },
});
