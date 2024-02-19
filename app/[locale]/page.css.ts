import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapExtraExtraLarge,
  minHeight: "600px",
});

export const newsBanner = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${vars.spacings.newsBanner.verticalPadding} ${vars.spacings.newsBanner.horizontalPadding}`,
      backgroundColor: vars.color.neutral[900],
      gap: vars.spacings.content.gapSmall,
      transition: "background-color, border 200ms ease-out",
      border: `1px solid ${vars.color.neutral[900]}`,

      ":focus": {
        outline: "none",
        borderColor: vars.color.primary[500],
      },
    },
  ],
  tablet: [
    columnCount(3),
    {
      flexDirection: "row",
      gap: vars.spacings.content.gapRegular,
    },
  ],
  desktop: columnCount(4),
});

export const newsBannerTag = responsiveStyle({
  mobile: {
    position: "relative",
  },
  tablet: {
    top: "5px",
  },
});

export const titleWrapper = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(2),
  desktop: columnCount(5),
});

export const descriptionWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      position: "relative",
      top: "7px",
    },
  ],
  tablet: columnCount(2),
  desktop: columnCount(3),
});
