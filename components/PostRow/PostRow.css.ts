import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

// PostRow
// -------------------------------------------o

export const postRow = recipe({
  base: {
    position: "relative",
    width: "100%",

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
      backgroundColor: vars.color.primary[500],
      transition: "transform 300ms ease-out",
      transformOrigin: "bottom",
      transform: "scaleY(0)",
    },
  },
  variants: {
    isFirst: {
      true: {
        borderTop: `1px solid ${vars.color.neutral[700]}`,
        borderBottom: `1px solid ${vars.color.neutral[700]}`,
      },
      false: {
        borderBottom: `1px solid ${vars.color.neutral[700]}`,
      },
    },
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

export const post = recipe({
  base: responsiveStyle({
    mobile: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[8],
      padding: `${vars.sizes[20]} 0`,
      transitionProperty: "color, transform",
      transitionDuration: `${transitionDuration}ms`,
      transitionTimingFunction: "ease-out",

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
      gap: vars.sizes[24],
    },
  }),
  variants: {
    isHovered: {
      true: {
        transform: `translateX(${vars.sizes[24]})`,
      },
    },
    isFocused: {
      true: {
        transform: `translateX(${vars.sizes[24]})`,
      },
    },
  },
});

export const postRowTitle = recipe({
  base: {
    color: `${vars.color.invariant.white.a100}!important`,
  },
  variants: {
    isHovered: {
      true: {
        color: `${vars.color.neutral[900]}!important`,
      },
    },
    isFocused: {
      true: {
        color: `${vars.color.neutral[900]}!important`,
      },
    },
  },
});

export const postRowPublishedAt = recipe({
  base: {
    color: `${vars.color.neutral[200]}!important`,
  },
  variants: {
    isHovered: {
      true: {
        color: `${vars.color.neutral[900]}!important`,
      },
    },
    isFocused: {
      true: {
        color: `${vars.color.neutral[900]}!important`,
      },
    },
  },
});

export const postRowComment = recipe({
  base: {
    color: `${vars.color.primary[500]}!important`,
  },
  variants: {
    isHovered: {
      true: {
        color: `${vars.color.neutral[900]}!important`,
      },
    },
    isFocused: {
      true: {
        color: `${vars.color.neutral[900]}!important`,
      },
    },
  },
});
