import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  overflow: "hidden",
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  flexShrink: 0,
  width: vars.spacings.avatar.size,
  height: vars.spacings.avatar.size,
});

export const image = style({
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});
