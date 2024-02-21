import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const listItem = style({
  display: "list-item",
  marginBottom: sizes[12],
  fontFamily: vars.font.sans,
  fontSize: "0.9375rem",
  fontWeight: 400,
  lineHeight: "1.5625rem",
  color: vars.color.primary[600],

  ":last-of-type": {
    marginBottom: 0,
  },
});

export const list = style({
  marginLeft: sizes[12],
});

export const heading = style({
  paddingTop: sizes[24],
});

export const headingLink = style({
  alignItems: "center",
  gap: vars.spacings.content.gapExtraSmall,
});

export const headingLinkIcon = style({
  display: "inline",
  width: sizes[20],
  height: sizes[20],
  minWidth: sizes[20],
  minHeight: sizes[20],
  color: vars.color.primary[700],
  transition: "opacity 200ms ease-out",
  opacity: 0,

  selectors: {
    [`${headingLink}:hover &`]: {
      opacity: 1,
    },
  },
});
