import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme/index.css";

// CSS Reset from Josh Comeau (https://www.joshwcomeau.com/css/custom-css-reset)
// -----------------------------------------------------------------------------o

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: 0,
  padding: 0,
});

globalStyle("html", {
  textSizeAdjust: "100%",
  minWidth: "350px",
});

globalStyle("body", {
  MozOsxFontSmoothing: "grayscale",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("img, picture, video, canvas, svg", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("input, button, textarea, select", {
  font: "inherit",
});

globalStyle("#root, #__next", {
  isolation: "isolate",
});

// Custom CSS reset
// -----------------o

globalStyle("a", {
  textDecoration: "none",
  color: "inherit",
});

globalStyle("input[type='text'], input[type='email']", {
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
});

globalStyle("::selection", {
  backgroundColor: vars.color.secondary[500],
  color: vars.color.neutral[900],
});

globalStyle(".grecaptcha-badge", { visibility: "hidden" });
