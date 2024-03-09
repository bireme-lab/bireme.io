import { text } from "@/components/Text/Text.css";
import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const container = responsiveStyle({
  mobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.sizes[8],
    textAlign: "center",
    height: "50vh",
  },
  tablet: {},
});

export const description = style({
  maxWidth: "300px",
});

export const legalLink = style([
  text({ variant: "body-flat" }),
  {
    marginTop: vars.sizes[8],
    color: vars.color.secondary[500],

    ":hover": {
      color: vars.color.secondary[300],
    },

    ":focus-visible": {
      outline: `1px solid ${vars.color.secondary[500]}`,
      outlineOffset: 2,
      borderRadius: vars.sizes[2],
    },
  },
]);
