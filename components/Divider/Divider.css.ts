import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const divider = style({
  width: "100%",
  height: "1px",
  border: `0.5px solid ${vars.color.primary[900]}`,
});
