import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { text } from "../Text/Text.css";

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

export const latestPostTitle = style([
  text({ variant: "title2" }),
  {
    color: vars.color.primary[500],

    ":hover": {
      color: vars.color.secondary[500],
    },

    ":focus-visible": {
      outline: "none",
      color: vars.color.secondary[500],
    },
  },
]);

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
