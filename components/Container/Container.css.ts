import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {},
  variants: {
    variant: {
      header: responsiveStyle({
        mobile: {
          width: "100%",
          paddingLeft: vars.grid.header.mobile.margin,
          paddingRight: vars.grid.header.mobile.margin,
        },
        tablet: {
          width: "100%",
          paddingLeft: vars.grid.header.tablet.margin,
          paddingRight: vars.grid.header.tablet.margin,
        },
        desktop: {
          width: "100%",
          paddingLeft: vars.grid.header.desktop.margin,
          paddingRight: vars.grid.header.desktop.margin,
        },
      }),
      body: responsiveStyle({
        mobile: {
          width: "100%",
          paddingLeft: vars.grid.body.mobile.margin,
          paddingRight: vars.grid.body.mobile.margin,
        },
        tablet: {
          width: "100%",
          paddingLeft: vars.grid.body.tablet.margin,
          paddingRight: vars.grid.body.tablet.margin,
        },
        desktop: {
          width: "100%",
          paddingLeft: vars.grid.body.desktop.margin,
          paddingRight: vars.grid.body.desktop.margin,
        },
      }),
    },
  },
});
