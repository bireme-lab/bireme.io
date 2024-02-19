import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";

export const container = responsiveStyle({
  mobile: {
    width: vars.grid.mobile.width,
    maxWidth: vars.grid.mobile.maxWidth,
    paddingLeft: vars.grid.mobile.margin,
    paddingRight: vars.grid.mobile.margin,
  },
  tablet: {
    width: vars.grid.tablet.width,
    maxWidth: vars.grid.tablet.maxWidth,
    paddingLeft: vars.grid.tablet.margin,
    paddingRight: vars.grid.tablet.margin,
  },
  desktop: {
    width: vars.grid.desktop.width,
    maxWidth: vars.grid.desktop.maxWidth,
    paddingLeft: vars.grid.desktop.margin,
    paddingRight: vars.grid.desktop.margin,
    margin: "0 auto",
  },
});
