import { responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = responsiveStyle({
  mobile: {
    zIndex: 1000,
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "52px",
    borderTop: `1px solid ${vars.color.neutral[700]}`,
    backgroundColor: vars.color.neutral[900],
  },
  tablet: {
    top: 0,
    width: "52px",
    height: "100%",
    borderTop: "none",
    borderRight: `1px solid ${vars.color.neutral[700]}`,
  },
});

export const navItem = responsiveStyle({
  mobile: {
    height: "100%",
    width: "52px",
  },
  tablet: {
    width: "100%",
    height: "52px",
  },
});

export const navItemLink = recipe({
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `background ${transitionDuration}ms ease-out`,

    ":hover": {
      backgroundColor: vars.color.primary[900],
    },

    ":focus-visible": {
      outline: "none",
      backgroundColor: vars.color.primary[900],
    },
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: vars.color.primary[900],

        ":focus-visible": {
          outline: "none",
          backgroundColor: vars.color.neutral[700],
        },
      },
    },
  },
});

export const navLocaleLink = recipe({
  base: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: `background ${transitionDuration}ms ease-out`,
    color: vars.color.neutral[200],

    ":hover": {
      color: vars.color.primary[500],
      backgroundColor: vars.color.primary[900],
    },

    ":focus-visible": {
      outline: "none",
      backgroundColor: vars.color.primary[900],
    },
  },
  variants: {
    isActive: {
      true: {
        color: vars.color.primary[500],
        backgroundColor: vars.color.primary[900],

        ":focus-visible": {
          outline: "none",
          backgroundColor: vars.color.neutral[700],
        },
      },
    },
  },
});

export const navLocaleLinkText = style({
  fontWeight: "700!important",
});

export const productIcon = style({
  width: "20px",
  height: "20px",
});

export const nav = responsiveStyle({
  mobile: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tablet: {
    flexDirection: "column",
  },
});

export const list = responsiveStyle({
  mobile: {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
  },
  tablet: {
    flexDirection: "column",
  },
});
