import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  background: vars.color.neutral[800],
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.sizes[8],
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[24],
  padding: vars.sizes[24],
  overflow: "hidden",
  minHeight: "300px",
});

export const wrapper = style({
  zIndex: 10,
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[8],
});

export const containedIllustrationContainer = style({
  position: "relative",
  width: "100%",
  minHeight: "340px",
  height: "100%",
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.sizes[4],
  overflow: "hidden",
});

export const containedIllustration = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

export const coveredIllustrationContainer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: vars.sizes[4],
  overflow: "hidden",
});

export const coveredIllustration = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});

export const satin = style({
  zIndex: 2,
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0) 100%)",
});

export const illustrationOverlay = style({
  zIndex: 1,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});
