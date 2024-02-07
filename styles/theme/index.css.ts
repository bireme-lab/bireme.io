import { createThemeContract } from "@vanilla-extract/css";

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
