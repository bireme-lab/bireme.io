import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

// NewsBanner
// -------------------------------------------o

export const newsBannerWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      borderRadius: vars.sizes[4],
      transition: `background ${transitionDuration}ms ease-out`,
      backgroundColor: vars.color.neutral[800],
      backgroundImage: `linear-gradient(150deg, #FFC799 0, rgba(255,255,255,0) 50%)`,
      padding: 1,

      ":focus-within": {
        backgroundColor: vars.color.primary[500],
      },

      ":hover": {
        backgroundColor: vars.color.primary[500],
      },
    },
  ],
  tablet: [columnCount(4)],
  desktop: columnCount(7),
});

export const newsBanner = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: vars.sizes[8],
    borderRadius: vars.sizes[4],
    padding: vars.sizes[16],
    backgroundColor: vars.color.neutral[800],
    transitionProperty: "background-color, border",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",

    ":focus": {
      outline: "none",
      // borderColor: vars.color.primary[500],
    },
  },
  tablet: {
    flexDirection: "row",
    gap: vars.sizes[16],
  },
});

export const newsBannerTag = responsiveStyle({
  mobile: {
    position: "relative",
  },
  tablet: {
    top: "5.5px",
  },
});

// LatestPosts
// -------------------------------------------o

export const latestPostWrapper = responsiveStyle({
  mobile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: vars.sizes[20],
  },
  desktop: {
    marginTop: vars.sizes[80],
  },
});

export const latestPost = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[12],
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(5),
});

export const latestPostTitle = style({
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.neutral[100],
  },
});

export const latestPostPublishedAt = style({
  marginTop: vars.sizes[4],
});

export const handwrittenUnderline = style({
  position: "absolute",
  left: 0,
  bottom: "-12px",
  width: "160px",
  height: "7px",
  color: vars.color.primary[500],
});

// Home
// -------------------------------------------o

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[48],
  minHeight: "735px",
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
  desktop: columnCount(6),
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
    marginBottom: vars.sizes[24],
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

export const learnMoreWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[8],
});

export const learnMore = style({
  display: "inline-flex",
});

export const learnMoreIcon = style({
  width: vars.sizes[16],
  height: vars.sizes[16],
  minWidth: vars.sizes[16],
  minHeight: vars.sizes[16],
  color: vars.color.neutral[50],
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
  desktop: columnCount(4),
});

export const latestPostSectionHeading = style({
  position: "relative",
});

export const allPostsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[20],
});

export const allPostsSectionHeading = style({
  marginBottom: vars.sizes[4],
});

export const postsList = style({
  display: "flex",
  listStyle: "none",
  flexDirection: "column",
});
