import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { text } from "../Text/Text.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacings.content.gapSmall,
  color: vars.color.primary[700],
});

export const time = style([
  text({
    variant: "small",
  }),
  {
    color: "inherit",
  },
]);
