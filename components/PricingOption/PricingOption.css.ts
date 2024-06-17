import { vars } from "@/styles/theme/index.css";
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
  gap: vars.sizes[16],
});

export const perk = style({
  display: "flex",
  gap: vars.sizes[12],
});

export const perkIcon = style({
  width: vars.sizes[24],
  height: vars.sizes[24],
  minWidth: vars.sizes[24],
  minHeight: vars.sizes[24],
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
