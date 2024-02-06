import { vars } from "@/design/theme.css";
import { style } from "@vanilla-extract/css";

export const page = style({
  backgroundColor: vars.color.primary,
  color: "white",
});

export const h1 = style({
  fontFamily: vars.font.hand,
  fontSize: "2rem",
  lineHeight: "2.5rem",
  fontWeight: 600,
});
