import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

// NewsBanner
// -------------------------------------------o

export const newsBanner = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${vars.sizes[16]} ${vars.sizes[16]}`,
      backgroundColor: vars.color.neutral[800],
      gap: vars.sizes[8],
      transitionProperty: "background-color, border",
      transitionDuration: `${transitionDuration}ms`,
      transitionTimingFunction: "ease-out",
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
      gap: vars.sizes[16],
    },
  ],
  desktop: columnCount(6),
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
    color: vars.color.primary[600],
  },
});

export const latestPostPublishedAt = style({
  marginTop: vars.sizes[4],
});

export const handwrittenUnderline = style({
  position: "absolute",
  left: 0,
  bottom: "-12px",
  width: "180px",
  height: "7px",
  color: vars.color.secondary[500],
});

// Home
// -------------------------------------------o

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[48],
  minHeight: "600px",
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
  tablet: columnCount(2),
  desktop: columnCount(6),
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
  color: vars.color.primary[500],
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
