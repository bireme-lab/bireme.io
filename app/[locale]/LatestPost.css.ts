import { columnCount, responsiveStyle, transition } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const latestPost = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.spacings.content.gapSmall,
    },
  ],
  tablet: columnCount(3),
  desktop: columnCount(5),
});

export const publishedAt = style({
  marginTop: sizes[4],
});

export const latestPostTitle = style([
  transition({ duration: 200, timingFunction: "ease-out", properties: ["color"] }),
  {
    ":hover": {
      color: vars.color.primary[600],
    },
  },
]);
