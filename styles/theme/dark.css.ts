import { createTheme } from "@vanilla-extract/css";
import { sizes, vars } from "./index.css";

// App global theme
// -----------------o

export const dark = createTheme(vars, {
  color: {
    primary: {
      50: "#FEFDFC",
      100: "#FEFBF8",
      200: "#FCF5EF",
      300: "#FBF2EB",
      400: "#FAEEE5",
      500: "#F9EADE",
      600: "#C7BBB2",
      700: "#958C85",
      800: "#645E59",
      900: "#322F2C",
    },
    secondary: {
      50: "#FCFAED",
      100: "#FAF5DB",
      200: "#F4EBB7",
      300: "#EFE094",
      400: "#E9D670",
      500: "#E4CC4C",
      600: "#B6A33D",
      700: "#897A2E",
      800: "#5B521E",
      900: "#2E290F",
    },
    negative: {
      50: "#FDEDED",
      100: "#FCDCDC",
      200: "#F9B9B9",
      300: "#F59595",
      400: "#F27272",
      500: "#EF4F4F",
      600: "#BF3F3F",
      700: "#8F2F2F",
      800: "#602020",
      900: "#301010",
    },
    positive: {
      50: "#F0FBEF",
      100: "#E1F7DF",
      200: "#C2EFBE",
      300: "#A4E69E",
      400: "#85DE7D",
      500: "#67D65D",
      600: "#52AB4A",
      700: "#3E8038",
      800: "#295625",
      900: "#152B13",
    },
    neutral: {
      50: "#D0D0D0",
      100: "#B9B9B9",
      200: "#A1A1A1",
      300: "#8A8A8A",
      400: "#737373",
      500: "#5B5B5B",
      600: "#444444",
      700: "#2C2C2C",
      800: "#151515",
      900: "#0E0E0E",
    },
    invariant: {
      transparent: "transparent",
      white: {
        a10: "rgba(255,255,255,0.1)",
        a20: "rgba(255,255,255,0.2)",
        a30: "rgba(255,255,255,0.3)",
        a40: "rgba(255,255,255,0.4)",
        a50: "rgba(255,255,255,0.5)",
        a60: "rgba(255,255,255,0.6)",
        a70: "rgba(255,255,255,0.7)",
        a80: "rgba(255,255,255,0.8)",
        a90: "rgba(255,255,255,0.9)",
        a100: "rgba(255,255,255,1)",
      },
      black: {
        a10: "rgba(0,0,0,0.1)",
        a20: "rgba(0,0,0,0.2)",
        a30: "rgba(0,0,0,0.3)",
        a40: "rgba(0,0,0,0.4)",
        a50: "rgba(0,0,0,0.5)",
        a60: "rgba(0,0,0,0.6)",
        a70: "rgba(0,0,0,0.7)",
        a80: "rgba(0,0,0,0.8)",
        a90: "rgba(0,0,0,0.9)",
        a100: "rgba(0,0,0,1)",
      },
    },
  },
  font: {
    sans: "var(--font-geist-sans), sans-serif",
    mono: "var(--font-geist-mono), monospace",
    hand: "var(--font-gloria-hallelujah), sans-serif",
  },
  grid: {
    mobile: {
      count: "2",
      width: "100%",
      maxWidth: "100%",
      margin: sizes[24],
      gutter: sizes[24],
    },
    tablet: {
      count: "4",
      width: "100%",
      maxWidth: "100%",
      margin: sizes[24],
      gutter: sizes[24],
    },
    desktop: {
      count: "8",
      width: "100%",
      maxWidth: "64rem",
      margin: "0",
      gutter: sizes[24],
    },
  },
});