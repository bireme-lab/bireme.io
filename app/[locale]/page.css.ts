import { columnCount, responsiveStyle } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapExtraExtraLarge,
  minHeight: "600px",
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

export const latestPostWrapper = responsiveStyle({
  mobile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: vars.spacings.content.gapLarge,
  },
  desktop: {
    marginTop: sizes[80],
  },
});

export const latestPostSectionHeading = style({
  position: "relative",
});

export const handwrittenUnderline = style({
  position: "absolute",
  left: 0,
  bottom: "-10px",
  width: "150px",
  height: "7px",
  color: vars.color.secondary[500],
});

export const allPostsWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacings.content.gapLarge,
});

export const allPostsSectionHeading = style({
  marginBottom: sizes[4],
});

export const postsList = style({
  display: "flex",
  listStyle: "none",
  flexDirection: "column",
});
