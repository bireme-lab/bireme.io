import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";

export const html = style({
  // backgroundColor: "#040404",
  backgroundColor: vars.color.neutral[900],
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

export const main = responsiveStyle({
  mobile: {
    marginTop: vars.sizes[24],
    marginBottom: vars.sizes[96],
    minHeight: "calc(100vh - 400px - 120px)", // 355px: header + footer height, 120px: margins
  },
  tablet: {
    marginTop: vars.sizes[96],
    marginBottom: vars.sizes[96],
    minHeight: "calc(100vh - 150px - 192px)", // 150px: header + footer height, 192px: margins
  },
});
