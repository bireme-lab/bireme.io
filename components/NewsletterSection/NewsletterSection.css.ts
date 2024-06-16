import { columnCount, responsiveStyle } from "@/styles/mixins";

export const dummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(0),
  desktop: columnCount(3),
});

export const container = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(4),
  desktop: columnCount(6),
});
