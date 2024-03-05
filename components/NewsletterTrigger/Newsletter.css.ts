import { transitionDuration, vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const trigger = recipe({
  base: {
    transition: `color ${transitionDuration}ms ease-out`,
    color: vars.color.secondary[500],
    cursor: "pointer",

    ":focus-visible": {
      outline: `1px solid ${vars.color.secondary[500]}`,
      outlineOffset: 2,
      borderRadius: vars.sizes[2],
    },
  },
  variants: {
    isHovered: {
      true: {
        color: vars.color.secondary[200],
      },
    },
    isFocused: {
      true: {
        outline: `1px solid ${vars.color.secondary[500]}`,
        outlineOffset: 2,
        borderRadius: vars.sizes[2],
      },
    },
    isPressed: {
      true: {
        outline: "none",
        color: vars.color.secondary[300],
      },
    },
  },
});
