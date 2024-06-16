import { columnCount, responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const grid = recipe({
  base: {},
  variants: {
    variant: {
      header: responsiveStyle({
        mobile: {
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(${vars.grid.header.mobile.count}, minmax(0, 1fr))`,
          columnGap: vars.grid.header.mobile.gutter,
          rowGap: vars.grid.header.mobile.gutter,
        },
        tablet: {
          gridTemplateColumns: `repeat(${vars.grid.header.tablet.count}, minmax(0, 1fr))`,
          columnGap: vars.grid.header.tablet.gutter,
          rowGap: vars.grid.header.tablet.gutter,
        },
        desktop: {
          gridTemplateColumns: `repeat(${vars.grid.header.desktop.count}, minmax(0, 1fr))`,
          columnGap: vars.grid.header.desktop.gutter,
          rowGap: vars.grid.header.desktop.gutter,
        },
      }),
      body: responsiveStyle({
        mobile: {
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(${vars.grid.body.mobile.count}, minmax(0, 1fr))`,
          columnGap: vars.grid.body.mobile.gutter,
          rowGap: vars.grid.body.mobile.gutter,
        },
        tablet: {
          gridTemplateColumns: `repeat(${vars.grid.body.tablet.count}, minmax(0, 1fr))`,
          columnGap: vars.grid.body.tablet.gutter,
          rowGap: vars.grid.body.tablet.gutter,
        },
        desktop: {
          gridTemplateColumns: `repeat(${vars.grid.body.desktop.count}, minmax(0, 1fr))`,
          columnGap: vars.grid.body.desktop.gutter,
          rowGap: vars.grid.body.desktop.gutter,
        },
      }),
    },
  },
});

export const columnStyleExample = responsiveStyle({
  mobile: [columnCount(2), {}],
  tablet: [columnCount(2), {}],
  desktop: [columnCount(5), {}],
});
