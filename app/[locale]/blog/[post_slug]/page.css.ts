import { columnCount, responsiveStyle } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const goBack = style({
  display: "flex",
  alignItems: "center",
  gap: sizes[4],
});

export const goBackIcon = style({
  width: sizes[16],
  height: sizes[16],
  minWidth: sizes[16],
  minHeight: sizes[16],
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
  tablet: [columnCount(2)],
  desktop: [columnCount(3)],
});

export const fiveCols = responsiveStyle({
  mobile: [columnCount(2)],
  tablet: [columnCount(4)],
  desktop: [columnCount(5)],
});

export const postBodyWrapper = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.spacings.content.gapExtraLarge,
  },
  variants: {
    isBodyStartingWithHeading: {
      true: {
        marginTop: `-${sizes[8]}`,
      },
    },
  },
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
