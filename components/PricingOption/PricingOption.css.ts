import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {
    padding: vars.sizes[24],
    borderRadius: vars.sizes[8],
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[24],
  },
  variants: {
    variant: {
      primary: {
        border: `1px solid ${vars.color.primary[500]}`,
        backgroundColor: vars.color.primary[900],
      },
      neutral: {
        border: `1px solid ${vars.color.neutral[700]}`,
        backgroundColor: vars.color.neutral[800],
      },
    },
  },
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[12],
});

export const title = recipe({
  base: {},
  variants: {
    variant: {
      primary: {
        color: vars.color.primary[500],
      },
      neutral: {
        color: vars.color.invariant.white.a100,
      },
    },
  },
});

export const description = recipe({
  base: {},
  variants: {
    variant: {
      primary: {
        color: vars.color.invariant.white.a100,
      },
      neutral: {
        color: vars.color.neutral[200],
      },
    },
  },
});

export const price = recipe({
  base: {},
  variants: {
    variant: {
      primary: {
        color: vars.color.primary[500],
      },
      neutral: {
        color: vars.color.invariant.white.a100,
      },
    },
  },
});

export const priceTag = recipe({
  base: {
    marginLeft: vars.sizes[8],
  },
  variants: {
    variant: {
      primary: {
        color: vars.color.invariant.white.a100,
      },
      neutral: {
        color: vars.color.neutral[200],
      },
    },
  },
});

export const perks = style({
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[12],
});

export const perk = style({
  display: "flex",
  gap: vars.sizes[12],
});

export const perkIconContainer = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: vars.sizes[24],
    height: vars.sizes[24],
    borderRadius: vars.sizes[4],
  },
  variants: {
    variant: {
      primary: {
        border: `1px solid ${vars.color.primary[700]}`,
        backgroundColor: vars.color.primary[800],
      },
      neutral: {
        border: `1px solid ${vars.color.neutral[600]}`,
        backgroundColor: vars.color.neutral[700],
      },
    },
  },
});

export const perkIcon = style({
  width: vars.sizes[16],
  height: vars.sizes[16],
  minWidth: vars.sizes[16],
  minHeight: vars.sizes[16],
  color: vars.color.primary[500],
});

export const perkTitle = recipe({
  base: {},
  variants: {
    variant: {
      primary: {
        color: vars.color.invariant.white.a100,
      },
      neutral: {
        color: vars.color.neutral[200],
      },
    },
  },
});

export const cta = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "auto",
    borderRadius: vars.sizes[4],
    transitionProperty: "color, transform, background, border",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",
    cursor: "pointer",
    padding: `${vars.sizes[12]} ${vars.sizes[16]}`,

    // Prevents flickering on Safari
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  },
  variants: {
    variant: {
      primary: {
        border: "none",
        backgroundColor: vars.color.invariant.white.a100,
        backgroundImage: "linear-gradient(98deg, rgba(255,255,255,0) -63.78%, #FFC799 100%)",
        color: vars.color.neutral[900],

        ":hover": {
          outline: "none",
          backgroundColor: vars.color.primary[500],
        },

        ":focus-visible": {
          outline: `1px solid ${vars.color.primary[500]}!important`,
          outlineOffset: 4,
        },
      },
      neutral: {
        border: `1px solid ${vars.color.primary[500]}`,
        backgroundColor: vars.color.primary[900],
        color: vars.color.primary[200],

        ":hover": {
          outline: "none",
          backgroundColor: vars.color.primary[800],
        },

        ":focus-visible": {
          outline: `1px solid ${vars.color.primary[500]}!important`,
          outlineOffset: 4,
        },
      },
    },
  },
});
