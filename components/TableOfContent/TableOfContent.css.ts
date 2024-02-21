import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = responsiveStyle({
  mobile: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[12],
  },
  desktop: {
    position: "sticky",
    top: vars.sizes[24],
  },
});

export const header = style({
  width: "100%",
  padding: `${vars.sizes[16]} ${vars.sizes[20]}`,
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.sizes[2],
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[12],
});

export const icon = style({
  width: vars.sizes[24],
  height: vars.sizes[24],
  minWidth: vars.sizes[24],
  minHeight: vars.sizes[24],
});

export const anchorList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
});

export const anchor = recipe({
  base: {
    padding: `${vars.sizes[4]} 0`,
    transition: `color ${transitionDuration}ms ease-out`,
  },
  variants: {
    level: {
      2: {
        marginTop: vars.sizes[12],
        color: vars.color.primary[500],

        ":hover": {
          color: vars.color.primary[700],
        },
      },
      3: {
        position: "relative",
        color: vars.color.primary[700],
        paddingLeft: vars.sizes[16],

        ":hover": {
          color: vars.color.primary[500],
        },
      },
      4: {
        position: "relative",
        color: vars.color.primary[700],
        paddingLeft: vars.sizes[32],

        ":hover": {
          color: vars.color.primary[500],
        },
      },
      5: {
        color: vars.color.primary[700],
      },
      6: {
        color: vars.color.primary[700],
      },
    },
  },
});

export const anchorDecoration = recipe({
  base: {
    position: "absolute",
    top: 0,
    width: "1px",
    height: "100%",
    backgroundColor: vars.color.neutral[700],
  },
  variants: {
    indentation: {
      none: {
        left: 0,
      },
      simple: {
        left: vars.sizes[16],
      },
    },
  },
});
