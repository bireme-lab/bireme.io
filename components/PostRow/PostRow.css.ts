import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// PostRow
// -------------------------------------------o

export const postRow = recipe({
  base: {},
  variants: {
    isFirst: {
      true: {
        borderTop: `1px solid ${vars.color.primary[900]}`,
        borderBottom: `1px solid ${vars.color.primary[900]}`,
      },
      false: {
        borderBottom: `1px solid ${vars.color.primary[900]}`,
      },
    },
  },
});

export const post = recipe({
  base: responsiveStyle({
    mobile: {
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[8],
      padding: `${vars.sizes[20]} 0`,

      "::after": {
        zIndex: -1,
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundColor: vars.color.secondary[500],
        transition: "transform 300ms ease-out",
        transformOrigin: "bottom",
        transform: "scaleY(0)",
      },

      ":focus-within": {
        outline: "none",
      },

      ":focus": {
        outline: "none",
      },
    },
    tablet: {
      flexDirection: "row",
      alignItems: "center",
      gap: vars.sizes[16],
    },
  }),
  variants: {
    isHovered: {
      true: {
        ":after": {
          transform: "scaleY(1)",
        },
      },
    },
    isFocused: {
      true: {
        ":after": {
          transform: "scaleY(1)",
        },
      },
    },
  },
});

const postRowContent = style({
  transitionProperty: "color, transform",
  transitionDuration: `${transitionDuration}ms`,
  transitionTimingFunction: "ease-out",
});

const postRowContentHovered = style({
  color: `${vars.color.neutral[900]}!important`,
  transform: `translateX(${vars.sizes[12]})`,
});

export const postRowTitle = recipe({
  base: [
    postRowContent,
    {
      color: vars.color.primary[500],
    },
  ],
  variants: {
    isHovered: {
      true: postRowContentHovered,
    },
    isFocused: {
      true: postRowContentHovered,
    },
  },
});

export const postRowPublishedAt = recipe({
  base: [
    postRowContent,
    {
      color: vars.color.primary[700],
    },
  ],
  variants: {
    isHovered: {
      true: postRowContentHovered,
    },
    isFocused: {
      true: postRowContentHovered,
    },
  },
});

export const postRowComment = recipe({
  base: [
    postRowContent,
    {
      color: vars.color.secondary[500],
    },
  ],
  variants: {
    isHovered: {
      true: postRowContentHovered,
    },
    isFocused: {
      true: postRowContentHovered,
    },
  },
});
