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
    paddingTop: vars.sizes[36],
    paddingLeft: vars.sizes[24],
    paddingRight: vars.sizes[24],
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

export const titleDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(0),
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
  tablet: columnCount(4),
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
  tablet: columnCount(0),
  desktop: columnCount(3),
});

export const descriptionWrapper = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(2),
  desktop: columnCount(6),
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
      height: "160px",
      backgroundColor: vars.color.neutral[800],
      border: `1px solid ${vars.color.neutral[700]}`,
      borderRadius: vars.sizes[8],
    },
  ],
  tablet: [
    columnCount(2),
    {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: vars.sizes[8],
      borderTopRightRadius: vars.sizes[8],
    },
  ],
  desktop: [
    columnCount(4),
    {
      transform: "translateY(40px)",
      transition: `transform ${transitionDuration}ms ease-out`,

      ":hover": {
        transform: "translateY(30px)",
      },
    },
  ],
});

export const productCardName = style({
  zIndex: 3,
  position: "absolute",
  top: 0,
  left: 0,
  transform: `translate(${vars.sizes[12]}, -50%)`,
  borderRadius: vars.sizes[4],
  padding: `${vars.sizes[12]} ${vars.sizes[16]}`,
  backgroundColor: vars.color.neutral[800],
  border: `1px solid ${vars.color.neutral[700]}`,
});

export const productCardIcon = style({
  height: "20px",
  minHeight: "20px",
  width: "80px",
});

export const productCardImage = style({
  height: "100%",
  width: "100%",
  objectFit: "cover",
  borderRadius: vars.sizes[8],
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
