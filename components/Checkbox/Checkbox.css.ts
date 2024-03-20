import { transitionDuration, vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  display: "inline-flex",
  alignItems: "flex-start",
  WebkitTapHighlightColor: "transparent",
  gap: vars.sizes[8],
  cursor: "pointer",
});

export const checkbox = recipe({
  base: {
    zIndex: 1,
    width: vars.sizes[16],
    height: vars.sizes[16],
    minWidth: vars.sizes[16],
    minHeight: vars.sizes[16],
    position: "relative",
    top: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: vars.sizes[4],
    borderColor: vars.color.neutral[500],
    transitionProperty: "transform, border, background, outline",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    isDisabled: {
      true: {
        borderColor: vars.color.neutral[500],
        backgroundColor: vars.color.neutral[500],
      },
    },
    isFocused: {
      true: {
        borderColor: vars.color.neutral[50],
      },
    },
    isHovered: {
      true: {
        borderColor: vars.color.neutral[50],
      },
    },
    isPressed: {
      true: {
        borderColor: vars.color.neutral[300],
      },
    },
    isChecked: {
      true: {
        backgroundColor: vars.color.neutral[900],
        borderColor: vars.color.neutral[300],
      },
    },
  },
});

// export const checkmark = recipe({
//   base: {
//     position: "relative",
//     top: "-1px",
//     left: "-1px",
//     width: vars.sizes[20],
//     height: vars.sizes[20],
//     minWidth: vars.sizes[20],
//     minHeight: vars.sizes[20],
//     color: vars.color.primary[500],
//     transition: `transform ${transitionDuration}ms ease-out`,
//     transform: "scale(0)",
//   },
//   variants: {
//     isChecked: {
//       true: {
//         transform: "scale(1)",
//       },
//     },
//   },
// });
export const checkmark = recipe({
  base: {
    position: "relative",
    width: vars.sizes[8],
    height: vars.sizes[8],
    minWidth: vars.sizes[8],
    minHeight: vars.sizes[8],
    backgroundColor: vars.color.primary[500],
    transition: `transform ${transitionDuration}ms ease-out`,
    transform: "scale(0)",
    borderRadius: vars.sizes[2],
  },
  variants: {
    isChecked: {
      true: {
        transform: "scale(1)",
      },
    },
  },
});

export const svg = style({
  zIndex: 2,
  position: "absolute",
  top: "-1px",
  color: vars.color.primary[500],
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
