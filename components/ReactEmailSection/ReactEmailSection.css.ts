import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const sectionTitleDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(3),
});

export const sectionTitleWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: vars.sizes[24],
    },
  ],
  tablet: columnCount(4),
  desktop: columnCount(6),
});

export const tabsDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(0),
  desktop: columnCount(2),
});

export const tab = recipe({
  base: responsiveStyle({
    mobile: [
      columnCount(2),
      {
        cursor: "pointer",
        display: "flex",
        gap: vars.sizes[12],
        borderRadius: vars.sizes[8],
        padding: `${vars.sizes[20]} ${vars.sizes[24]}`,
        background: vars.color.neutral[800],
        border: `1px solid ${vars.color.neutral[700]}`,
        transition: `all ${transitionDuration}ms ease-out`,
      },
    ],
    tablet: columnCount(3),
    desktop: columnCount(4),
  }),
  variants: {
    isHovered: {
      true: {
        border: `1px solid ${vars.color.neutral[500]}`,
      },
    },
    isFocused: {
      true: {
        outline: "none",
        border: `1px solid ${vars.color.primary[500]}`,
      },
    },
    isActive: {
      true: {
        outline: "none",
        border: `1px solid ${vars.color.primary[500]}`,
      },
    },
  },
});

export const centeredText = style({
  textAlign: "center",
});

export const tabs = style({
  display: "flex",
});

export const tabIconContainer = style({
  width: vars.sizes[24],
  height: vars.sizes[24],
  minHeight: vars.sizes[24],
  minWidth: vars.sizes[24],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: vars.sizes[4],
  background: vars.color.neutral[700],
  border: `1px solid ${vars.color.neutral[600]}`,
});

export const tabIcon = style({
  height: vars.sizes[16],
  width: vars.sizes[16],
  minHeight: vars.sizes[16],
  minWidth: vars.sizes[16],
  color: vars.color.primary[500],
});

export const videoContainer = style({
  width: "100%",
  aspectRatio: "16 / 10",
  borderRadius: vars.sizes[8],
  overflow: "hidden",
  border: `1px solid ${vars.color.neutral[700]}`,
});

export const video = style({
  width: "100%",
});

export const reactEmailLink = style({
  textUnderlineOffset: vars.sizes[4],

  ":hover": {
    textDecoration: "underline",
  },

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 2,
    borderRadius: vars.sizes[2],
  },
});

export const reactEmailLinkText = style({
  display: "flex!important",
  gap: vars.sizes[8],
  alignItems: "center",
});

export const reactEmailLinkIcon = style({
  width: vars.sizes[16],
  minWidth: vars.sizes[16],
  height: vars.sizes[16],
  minHeight: vars.sizes[16],
});
