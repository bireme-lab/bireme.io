import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";

export const newsBanner = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: `${vars.sizes[16]} ${vars.sizes[16]}`,
      backgroundColor: vars.color.neutral[900],
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
      gap: vars.sizes[12],
    },
  ],
  desktop: columnCount(4),
});

export const newsBannerTag = responsiveStyle({
  mobile: {
    position: "relative",
  },
  tablet: {
    top: "5px",
  },
});
