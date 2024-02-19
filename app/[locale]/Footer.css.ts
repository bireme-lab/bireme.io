import { columnCount, responsiveStyle, transition } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const footer = responsiveStyle({
  mobile: {
    width: "100%",
    paddingTop: sizes[48],
    paddingBottom: sizes[48],
    backgroundColor: vars.color.neutral[900],
    display: "flex",
    flexDirection: "column",
    gap: vars.spacings.content.gapExtraLarge,
  },
  desktop: {
    paddingTop: sizes[72],
    paddingBottom: sizes[72],
  },
});

export const logoLink = style([
  transition({ duration: 200, timingFunction: "ease-out", properties: ["color"] }),
  {
    color: vars.color.primary[500],

    ":hover": {
      color: vars.color.primary[600],
    },

    ":focus": {
      outline: "none",
      color: vars.color.primary[600],
    },
  },
]);

export const logo = style({
  width: "140px",
  height: "24px",
  color: "inherit",
});

export const form = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.spacings.content.gapMedium,
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(4),
});

export const input = style({
  marginBottom: vars.spacings.content.gapRegular,
});

export const submitButton = style({
  marginTop: vars.spacings.content.gapRegular,
});

export const mention = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "inline",
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(4),
});

export const legalLinks = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    gap: vars.spacings.content.gapRegular,
    marginTop: vars.spacings.content.gapMedium,
  },
  tablet: {
    flexDirection: "row",
    gap: vars.spacings.content.gapMedium,
  },
});

export const inputsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapSmall,
});
