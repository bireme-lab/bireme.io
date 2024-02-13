import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const buttonContainer = style({
  position: "relative",
  display: "flex",
  width: "fit-content",
});

export const button = recipe({
  base: {
    position: "relative",
    display: "flex",
    overflow: "hidden",
    margin: 0,
    padding: 0,
    width: "auto",
    borderRadius: vars.spacings.button.radius,
  },
  variants: {
    variant: {
      plain: {
        border: "none",
        padding: `${sizes[12]} ${sizes[16]}`,
      },
      outline: {
        border: `1px solid ${vars.color.primary[700]}`,
        backgroundColor: vars.color.invariant.transparent,
        color: vars.color.primary[500],
        padding: `${sizes[12]} ${sizes[16]}`,
      },
    },
    isHovered: {
      true: {},
      false: {},
    },
    isFocused: {
      true: {},
      false: {},
    },
    isPressed: {
      true: {},
      false: {},
    },
    isDisabled: {
      true: {},
      false: {},
    },
  },
});
