import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const link = responsiveStyle({
  mobile: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  desktop: {
    overflow: "unset",
  },
});

export const separator = style({
  margin: `0 ${vars.spacings.content.gapSmall}`,
  userSelect: "none",
});
