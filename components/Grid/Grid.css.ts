import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";

export const grid = responsiveStyle({
  mobile: {
    display: "grid",
    width: vars.grid.mobile.width,
    maxWidth: vars.grid.mobile.maxWidth,
    paddingLeft: vars.grid.mobile.margin,
    paddingRight: vars.grid.mobile.margin,
    gridTemplateColumns: `repeat(${vars.grid.mobile.count}, minmax(0, 1fr))`,
    columnGap: vars.grid.mobile.gutter,
  },
  tablet: {
    width: vars.grid.tablet.width,
    maxWidth: vars.grid.tablet.maxWidth,
    paddingLeft: vars.grid.tablet.margin,
    paddingRight: vars.grid.tablet.margin,
    gridTemplateColumns: `repeat(${vars.grid.tablet.count}, minmax(0, 1fr))`,
    columnGap: vars.grid.tablet.gutter,
  },
  desktop: {
    width: vars.grid.desktop.width,
    maxWidth: vars.grid.desktop.maxWidth,
    paddingLeft: vars.grid.desktop.margin,
    paddingRight: vars.grid.desktop.margin,
    gridTemplateColumns: `repeat(${vars.grid.desktop.count}, minmax(0, 1fr))`,
    columnGap: vars.grid.desktop.gutter,
    margin: "0 auto",
  },
});

export const columnStyleExample = responsiveStyle({
  mobile: [columnCount(2), {}],
  tablet: [columnCount(2), {}],
  desktop: [columnCount(5), {}],
});
