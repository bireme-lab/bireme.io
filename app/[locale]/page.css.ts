import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const page = style({
  backgroundColor: vars.color.neutral[800],
  color: "white",
});

export const h1 = style({
  fontFamily: vars.font.sans,
  fontSize: "2rem",
  lineHeight: "2.5rem",
  fontWeight: 600,
});
