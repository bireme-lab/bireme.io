import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const divider = style({
  width: "100%",
  border: `0.5px solid ${vars.color.neutral[700]}`,
});
