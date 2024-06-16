import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const icon = style({
  width: vars.sizes[20],
  height: vars.sizes[20],
  minWidth: vars.sizes[20],
  minHeight: vars.sizes[20],
});

export const tooltipContainer = style({
  display: "flex",
  gap: vars.sizes[8],
  alignItems: "center",
  width: vars.sizes[256],
  backgroundColor: vars.color.neutral[800],
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.sizes[4],
  padding: `${vars.sizes[12]} ${vars.sizes[16]}`,
});
