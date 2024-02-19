import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";

export const grid = responsiveStyle({
  mobile: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: `repeat(${vars.grid.mobile.count}, minmax(0, 1fr))`,
    columnGap: vars.grid.mobile.gutter,
  },
  tablet: {
    gridTemplateColumns: `repeat(${vars.grid.tablet.count}, minmax(0, 1fr))`,
    columnGap: vars.grid.tablet.gutter,
  },
  desktop: {
    gridTemplateColumns: `repeat(${vars.grid.desktop.count}, minmax(0, 1fr))`,
    columnGap: vars.grid.desktop.gutter,
  },
});

export const columnStyleExample = responsiveStyle({
  mobile: [columnCount(2), {}],
  tablet: [columnCount(2), {}],
  desktop: [columnCount(5), {}],
});
