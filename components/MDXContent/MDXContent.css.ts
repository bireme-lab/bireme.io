import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const listItem = style({
  display: "list-item",
  marginBottom: vars.sizes[12],
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
  marginLeft: vars.sizes[12],
});

export const heading = style({
  paddingTop: vars.sizes[24],
});

export const headingLink = style({
  alignItems: "center",
  gap: vars.sizes[4],
});

export const headingLinkIcon = style({
  display: "inline",
  width: vars.sizes[20],
  height: vars.sizes[20],
  minWidth: vars.sizes[20],
  minHeight: vars.sizes[20],
  color: vars.color.primary[700],
  transition: `opacity ${transitionDuration}ms ease-out`,
  opacity: 0,

  selectors: {
    [`${headingLink}:hover &`]: {
      opacity: 1,
    },
  },
});
