import { createThemeContract } from "@vanilla-extract/css";

export const breakpoints = {
  tablet: "768px",
  desktop: "1072px",
};

export const sizes = {
  2: "0.125rem",
  4: "0.25rem",
  6: "0.375rem",
  8: "0.5rem",
  10: "0.625rem",
  12: "0.75rem",
  16: "1rem",
  20: "1.25rem",
  24: "1.5rem",
  28: "1.75rem",
  32: "2rem",
  36: "2.25rem",
  40: "2.5rem",
  48: "3rem",
  56: "3.5rem",
  64: "4rem",
  72: "4.5rem",
  80: "5rem",
  96: "6rem",
  112: "7rem",
  128: "8rem",
  160: "10rem",
  192: "12rem",
  224: "14rem",
  256: "16rem",
};

export const vars = createThemeContract({
  color: {
    primary: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    secondary: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    negative: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    positive: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    neutral: {
      50: null,
      100: null,
      200: null,
      300: null,
      400: null,
      500: null,
      600: null,
      700: null,
      800: null,
      900: null,
    },
    invariant: {
      transparent: null,
      white: {
        a10: null,
        a20: null,
        a30: null,
        a40: null,
        a50: null,
        a60: null,
        a70: null,
        a80: null,
        a90: null,
        a100: null,
      },
      black: {
        a10: null,
        a20: null,
        a30: null,
        a40: null,
        a50: null,
        a60: null,
        a70: null,
        a80: null,
        a90: null,
        a100: null,
      },
    },
  },
  font: {
    sans: null,
    mono: null,
    hand: null,
  },
  grid: {
    mobile: {
      count: null,
      width: null,
      maxWidth: null,
      margin: null,
      gutter: null,
    },
    tablet: {
      count: null,
      width: null,
      maxWidth: null,
      margin: null,
      gutter: null,
    },
    desktop: {
      count: null,
      width: null,
      maxWidth: null,
      margin: null,
      gutter: null,
    },
  },
});

export type ColorName = Exclude<keyof typeof vars.color, "invariant">;
export type ColorShade = keyof typeof vars.color.primary;

export type InvariantBlackColor = `black-${keyof typeof vars.color.invariant.black}`;
export type InvariantWhiteColor = `white-${keyof typeof vars.color.invariant.white}`;
export type InvariantColor =
  | InvariantBlackColor
  | InvariantWhiteColor
  | Exclude<keyof typeof vars.color.invariant, "black" | "white">;

export type Color = `${ColorName}-${ColorShade}` | InvariantColor;
