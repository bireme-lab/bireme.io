import { createThemeContract } from "@vanilla-extract/css";

export const breakpoints = {
  tablet: "768px",
  desktop: "1072px",
};

export const sizes = {
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  16: "16px",
  20: "20px",
  24: "24px",
  28: "28px",
  32: "32px",
  36: "36px",
  40: "40px",
  48: "48px",
  56: "56px",
  64: "64px",
  72: "72px",
  80: "80px",
  96: "96px",
  112: "112px",
  128: "128px",
  160: "160px",
  192: "192px",
  224: "224px",
  256: "256px",
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
  spacings: {
    content: {
      gapExtraSmall: null,
      gapSmall: null,
      gapRegular: null,
      gapMedium: null,
      gapLarge: null,
      gapExtraLarge: null,
      gapExtraExtraLarge: null,
    },
    button: {
      horizontalPadding: null,
      verticalPadding: null,
      radius: null,
    },
    checkbox: {
      gap: null,
      iconSize: null,
      boxSize: null,
      radius: null,
    },
    input: {
      horizontalPadding: null,
      verticalPadding: null,
      radius: null,
      gap: null,
    },
    avatar: {
      size: null,
      tooltipRadius: null,
      tooltipAvatarSize: null,
      tooltipHorizontalPadding: null,
      tooltipVerticalPadding: null,
      networkIconSize: null,
    },
    newsBanner: {
      horizontalPadding: null,
      verticalPadding: null,
    },
    tableOfContent: {
      horizontalPadding: null,
      verticalPadding: null,
      iconSize: null,
      radius: null,
      gap: null,
      anchorsGap: null,
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
