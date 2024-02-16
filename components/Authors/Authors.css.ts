import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "flex",
});

export const authorWrapper = style({
  marginLeft: "-6px",
});

export const author = recipe({
  base: {},
  variants: {
    isLast: {
      false: {
        mask: "radial-gradient(104% 72.5% at 175% 50%, rgba(0, 0, 0, 0) 98.5%, rgb(0, 0, 0) 100%)",
      },
    },
  },
});
