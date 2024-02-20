import { columnCount, responsiveStyle } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const goBack = style({
  display: "flex",
  alignItems: "center",
  gap: sizes[4],
});

export const goBackIcon = style({
  width: sizes[12],
  height: sizes[12],
  minWidth: sizes[12],
  minHeight: sizes[12],
  color: vars.color.primary[700],
});

export const article = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapExtraLarge,
  marginTop: sizes[24],
});

export const heroContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapRegular,
});

export const threeCols = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(4)],
  desktop: [columnCount(3)],
});

export const fiveCols = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.spacings.content.gapExtraLarge,
    },
  ],
  tablet: [columnCount(4)],
  desktop: [columnCount(5)],
});

export const listItem = style({
  display: "list-item",
  marginBottom: sizes[12],
  fontFamily: vars.font.sans,
  fontSize: "0.9375rem",
  fontWeight: 400,
  lineHeight: "1.5625rem",
  color: vars.color.primary[600],

  ":last-of-type": {
    marginBottom: 0,
  },
});

export const list = style({
  marginLeft: sizes[12],
});
