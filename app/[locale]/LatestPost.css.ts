import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const latestPost = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[8],
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(5),
});

export const publishedAt = style({
  marginTop: vars.sizes[4],
});

export const latestPostTitle = style({
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.primary[600],
  },
});
