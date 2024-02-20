import { responsiveStyleRules, transition } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const post = recipe({
  base: responsiveStyleRules({
    mobile: {
      position: "relative",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: vars.spacings.content.gapSmall,
      padding: `${vars.spacings.content.gapLarge} 0`,

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
    },
    tablet: {
      flexDirection: "row",
      alignItems: "center",
      gap: vars.spacings.content.gapMedium,
    },
  }),
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
    isHovered: {
      true: {
        "::after": {
          transform: "scaleY(1)",
        },
      },
    },
    isFocused: {
      true: {
        outline: "none",

        "::after": {
          transform: "scaleY(1)",
        },
      },
    },
  },
});

export const publishedAt = recipe({
  base: [
    transition({ duration: 200, timingFunction: "ease-out", properties: ["color", "transform"] }),
    {
      color: vars.color.primary[700],
    },
  ],
  variants: {
    isHovered: {
      true: {
        color: vars.color.neutral[900],
        transform: `translateX(${sizes[12]})`,
      },
    },
    isFocused: {
      true: {
        color: vars.color.neutral[900],
        transform: `translateX(${sizes[12]})`,
      },
    },
  },
});

export const title = recipe({
  base: [
    transition({ duration: 200, timingFunction: "ease-out", properties: ["color", "transform"] }),
    {
      color: vars.color.primary[500],
    },
  ],
  variants: {
    isHovered: {
      true: {
        color: vars.color.neutral[900],
        transform: `translateX(${sizes[12]})`,
      },
    },
    isFocused: {
      true: {
        color: vars.color.neutral[900],
        transform: `translateX(${sizes[12]})`,
      },
    },
  },
});

export const comment = recipe({
  base: [
    transition({ duration: 200, timingFunction: "ease-out", properties: ["color", "transform"] }),
    {
      color: vars.color.secondary[500],
    },
  ],
  variants: {
    isHovered: {
      true: {
        color: vars.color.neutral[900],
        transform: `translateX(${sizes[12]})`,
      },
    },
    isFocused: {
      true: {
        color: vars.color.neutral[900],
        transform: `translateX(${sizes[12]})`,
      },
    },
  },
});
