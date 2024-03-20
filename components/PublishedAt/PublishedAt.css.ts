import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { text } from "../Text/Text.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[12],
  color: vars.color.neutral[100],
});

export const time = style([
  text({
    variant: "body-flat",
  }),
  {
    color: "inherit",
  },
]);
