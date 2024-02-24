import { vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";

export const html = style({
  backgroundColor: vars.color.neutral[800],
  overflowX: "hidden",
});

export const body = style({
  position: "relative",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  display: "flex",
  flexDirection: "column",
  // overflowX: "hidden",
});

export const lighContainer = style({
  zIndex: -1,
  position: "absolute",
  width: "100vw",
  height: "100%",
  overflow: "hidden",
  pointerEvents: "none",
  userSelect: "none",
});

const lightAnimation = keyframes({
  "0%": {
    opacity: 0.1,
    filter: "blur(100px)",
  },
  "100%": {
    opacity: 0.2,
    filter: "blur(150px)",
  },
});

export const light = style({
  pointerEvents: "none",
  userSelect: "none",
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  transform: "translate(50%, -75%)",
  margin: "0 auto",
  width: "1500px",
  height: "1000px",
  background: vars.color.secondary[500],
  opacity: 0.1,
  borderRadius: "50%",
  filter: "blur(150px)",
  animation: `${lightAnimation} 5s infinite alternate`,
  animationTimingFunction: "ease-out",
});

export const main = style({
  paddingTop: vars.sizes[24],
  paddingBottom: vars.sizes[96],
});
