import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

// Hero
// -------------------------------------------o

export const hero = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: vars.sizes[36],
    padding: `${vars.sizes[36]} ${vars.sizes[24]}`,
    borderBottom: `1px solid ${vars.color.neutral[700]}`,
    overflow: "hidden",
  },
  tablet: {
    paddingTop: vars.sizes[72],
    paddingLeft: vars.sizes[48],
    paddingRight: vars.sizes[48],
  },
});

export const newsBanner = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "center",
    width: "100%",
    gap: vars.sizes[8],
    borderRadius: vars.sizes[8],
    padding: vars.sizes[16],
    backgroundColor: vars.color.neutral[800],
    transition: `border ${transitionDuration}ms ease-out`,
    border: `1px solid ${vars.color.neutral[700]}`,

    ":hover": {
      borderColor: vars.color.neutral[500],
    },

    ":focus-visible": {
      outline: "none",
      borderColor: vars.color.primary[500],
    },

    ":focus": {
      outline: "none",
      borderColor: vars.color.primary[500],
    },
  },
  tablet: {
    width: "unset",
    flexDirection: "row",
    gap: vars.sizes[16],
  },
});

export const newsBannerTag = responsiveStyle({
  mobile: {
    position: "relative",
  },
  tablet: {
    top: "2.4px",
  },
});

export const heroGrid = responsiveStyle({
  mobile: {
    gap: vars.sizes[12],
  },
  tablet: {
    gap: vars.sizes[24],
  },
});

export const heroContent = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: vars.sizes[24],
});

export const titleDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(1),
  desktop: columnCount(2),
});

export const titleWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[8],
    },
  ],
  tablet: columnCount(6),
  desktop: columnCount(8),
});

export const title = responsiveStyle({
  mobile: {
    fontSize: "2.5rem!important",
    lineHeight: "2.5rem!important",
    background: "linear-gradient(to right bottom, #F9EADE 30%, #FFC799) text",
    boxDecorationBreak: "clone",
    WebkitTextFillColor: "transparent",
    color: "unset",
    textWrap: "balance",
    textAlign: "center",
  },
  tablet: {
    fontSize: "3rem!important",
    lineHeight: "3rem!important",
  },
});

export const titleSpan = style({
  display: "inline-block",
  verticalAlign: "top",
  textDecoration: "inherit",
  textWrap: "balance",

  "::selection": {
    backgroundColor: `rgba(228, 204, 76, 0.5)`,
    color: vars.color.neutral[900],
  },
});

export const descriptionDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(1),
  desktop: columnCount(4),
});

export const descriptionWrapper = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(4),
  desktop: columnCount(4),
});

export const description = style({
  display: "inline-flex!important",
  textAlign: "center",
});

export const productCards = responsiveStyle({
  mobile: {
    rowGap: vars.sizes[36],
  },
  desktop: {
    rowGap: "unset",
  },
});

export const productCardDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(2),
  desktop: columnCount(4),
});

export const productCard = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[24],
      borderRadius: vars.sizes[8],
      border: `1px solid ${vars.color.neutral[700]}`,
      transition: `all ${transitionDuration}ms ease-out`,
      width: "100%",
      aspectRatio: "16 / 9",
      overflow: "hidden",

      ":hover": {
        border: `1px solid ${vars.color.neutral[500]}`,
      },

      ":focus-visible": {
        outline: "none",
        border: `1px solid ${vars.color.primary[500]}`,
      },
    },
  ],
  tablet: columnCount(2),
  desktop: columnCount(4),
});

export const productCardIcon = style({
  height: vars.sizes[20],
  minHeight: vars.sizes[20],
  width: vars.sizes[80],
  minWidth: vars.sizes[80],
});

export const productCardDescription = responsiveStyle({
  mobile: {
    zIndex: 3,
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
    top: 0,
    display: "flex",
    alignItems: "flex-end",
    padding: vars.sizes[12],
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%)",
  },
  tablet: {},
  desktop: {},
});

export const productCardImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: `all ${transitionDuration}ms ease-out`,
  objectPosition: "center",
});

export const productCardName = style({
  zIndex: 5,
  position: "absolute",
  top: vars.sizes[12],
  left: vars.sizes[12],
  background: vars.color.neutral[800],
  borderRadius: vars.sizes[4],
  padding: `${vars.sizes[8]} ${vars.sizes[12]}`,
  border: `1px solid ${vars.color.neutral[700]}`,
});

// Home
// -------------------------------------------o

export const container = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "735px",
});

export const allPostContainer = responsiveStyle({
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

export const allPostDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(1),
  desktop: columnCount(3),
});

export const centeredText = style({
  textAlign: "center",
});

export const postsDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(0),
  desktop: columnCount(3),
});

export const posts = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[24],
      listStyle: "none",
    },
  ],
  tablet: [
    columnCount(4),
    {
      gap: vars.sizes[12],
    },
  ],
  desktop: columnCount(6),
});
