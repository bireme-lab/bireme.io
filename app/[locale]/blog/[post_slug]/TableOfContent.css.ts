import { responsiveStyle } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = responsiveStyle({
  mobile: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  desktop: {
    position: "sticky",
    top: sizes[24],
  },
});

export const header = style({
  width: "100%",
  padding: `${vars.spacings.tableOfContent.verticalPadding} ${vars.spacings.tableOfContent.horizontalPadding}`,
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.spacings.tableOfContent.radius,
  display: "flex",
  alignItems: "center",
  gap: vars.spacings.content.gapRegular,
});

export const icon = style({
  width: vars.spacings.tableOfContent.iconSize,
  height: vars.spacings.tableOfContent.iconSize,
});
