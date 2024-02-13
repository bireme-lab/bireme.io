import { transition } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "inline-flex",
  alignItems: "flex-start",
  WebkitTapHighlightColor: "transparent",
});

export const checkbox = recipe({
  base: [
    transition({
      duration: 200,
      timingFunction: "ease-out",
      properties: ["border", "background", "outline"],
    }),
    {
      width: sizes[12],
      height: sizes[12],
      minWidth: sizes[12],
      minHeight: sizes[12],
      position: "relative",
      top: "4.5px",
      marginRight: sizes[8],
      borderStyle: "solid",
      borderWidth: "1px",
      borderRadius: sizes[2],
      outlineStyle: "solid",
      outlineWidth: "1px",
      outlineColor: "transparent",
      outlineOffset: 2,
      borderColor: vars.color.primary[800],
    },
  ],
  variants: {
    isFocused: {
      true: {
        outlineColor: vars.color.secondary[500],
      },
    },
  },
});

export const svg = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: sizes[24],
  height: sizes[24],
  color: vars.color.secondary[500],
});
