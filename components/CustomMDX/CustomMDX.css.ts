import { transitionDuration, vars } from "@/styles/theme/index.css";
import { globalStyle, style } from "@vanilla-extract/css";
import { text } from "../Text/Text.css";

export const listItem = style({
  display: "list-item",
  marginBottom: vars.sizes[12],
  fontFamily: vars.font.sans,
  fontSize: "0.938rem",
  fontWeight: 400,
  lineHeight: "1.563rem",
  color: vars.color.neutral[200],

  ":last-of-type": {
    marginBottom: 0,
  },
});

globalStyle(`${listItem} strong, b`, {
  fontWeight: 500,
  color: vars.color.invariant.white.a100,
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
  color: vars.color.invariant.white.a100,

  ":focus-visible": {
    outline: "none",
    color: vars.color.primary[500],
  },
});

export const headingLinkIcon = style({
  display: "inline",
  width: vars.sizes[20],
  height: vars.sizes[20],
  minWidth: vars.sizes[20],
  minHeight: vars.sizes[20],
  color: vars.color.neutral[200],
  transition: `opacity ${transitionDuration}ms ease-out`,
  opacity: 0,
  position: "relative",
  top: "4px",
  marginLeft: vars.sizes[4],

  selectors: {
    [`${headingLink}:hover &`]: {
      opacity: 1,
    },
    [`${headingLink}:focus-visible &`]: {
      opacity: 1,
    },
  },
});

export const callout = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[4],
  padding: vars.sizes[16],
  borderRadius: vars.sizes[2],
  backgroundColor: vars.color.neutral[800],
});

export const calloutEmoji = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginRight: vars.sizes[12],
});

export const calloutChildrenContainer = style({
  flex: 1,
});

globalStyle(`${calloutChildrenContainer} *`, {
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.3125rem",
  color: vars.color.invariant.white.a100,
});

export const blockquote = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[4],
  padding: `${vars.sizes[16]} ${vars.sizes[16]} ${vars.sizes[16]} ${vars.sizes[20]}`,
  borderRadius: vars.sizes[2],
  backgroundColor: vars.color.neutral[800],
  borderLeft: `2px solid ${vars.color.primary[500]}`,
  // fontStyle: "italic",
});

export const link = style([
  text({ variant: "body" }),
  {
    color: vars.color.primary[500],

    ":hover": {
      color: vars.color.primary[300],
    },

    ":focus-visible": {
      outline: `1px solid ${vars.color.primary[500]}`,
      outlineOffset: 2,
      borderRadius: vars.sizes[2],
    },
  },
]);

export const paragraph = style({});

globalStyle(`${paragraph} strong, b`, {
  fontWeight: 500,
  color: vars.color.invariant.white.a100,
});

export const pre = style({
  paddingTop: vars.sizes[20],
  paddingBottom: vars.sizes[20],
  backgroundColor: vars.color.neutral[800],
  overflowX: "auto",
});

export const preTitle = style({
  display: "flex",
  alignItems: "center",
  padding: `${vars.sizes[16]} ${vars.sizes[20]}`,
  backgroundColor: vars.color.neutral[800],
});

export const img = style({
  display: "block",
  maxWidth: "100%",
  height: "auto",
  overflow: "hidden",
  borderRadius: vars.sizes[4],
});

export const code = style({
  fontFamily: vars.font.mono,
  fontSize: "0.8125rem",
  lineHeight: "1.5625rem",
  borderRadius: vars.sizes[2],
  color: vars.color.neutral[100],

  "::before": {
    content: "`",
  },

  "::after": {
    content: "`",
  },
});

globalStyle(`figure[data-rehype-pretty-code-figure=""]`, {
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[2],
  borderRadius: vars.sizes[2],
});

globalStyle(`${pre} code`, {
  counterReset: "step",
  counterIncrement: "step 0",
});

globalStyle(`${pre} code::before`, {
  content: "",
});

globalStyle(`${pre} code::after`, {
  content: "",
});

globalStyle(`${pre} [data-line]`, {
  fontSize: "0.8125rem",
  fontWeight: 500,
  lineHeight: "1.5625rem",
  fontFamily: vars.font.mono,
  paddingLeft: vars.sizes[24],
  paddingRight: vars.sizes[24],
});

globalStyle(`${pre} [data-line]::before`, {
  content: "counter(step)",
  counterIncrement: "step",
  width: "1rem",
  marginRight: "1.5rem",
  display: "inline-block",
  textAlign: "right",
  color: vars.color.neutral[600],
});

globalStyle(`${pre} [data-highlighted-line]`, {
  background: vars.color.neutral[700],
  boxShadow: `0 0 0 2px ${vars.color.neutral[700]}`,
});

globalStyle(`${pre} mark`, {
  background: vars.color.neutral[700],
  boxShadow: `0 0 0 4px ${vars.color.neutral[700]}`,
  borderRadius: vars.sizes[2],
});

export const tableContainer = style({
  width: "100%",
  borderRadius: vars.sizes[2],
  overflow: "hidden",
});

export const table = style({
  display: "table",
  // tableLayout: "fixed",
  borderSpacing: "0",
  width: "100%",
  overflowX: "auto",
});

globalStyle(`${table} thead`, {
  // backgroundColor: vars.color.neutral[900],
});

globalStyle(`${table} thead th`, {
  // borderBottom: `1px solid ${vars.color.neutral[800]}`,
  color: vars.color.invariant.white.a100,
});

globalStyle(`${table} tbody`, {
  // backgroundColor: vars.color.neutral[900],
});

globalStyle(`${table} tbody td`, {
  color: vars.color.neutral[300],
  borderTop: `1px solid ${vars.color.neutral[700]}`,
});

globalStyle(`${table} tbody td strong`, {
  color: vars.color.invariant.white.a100,
});

globalStyle(`${table} th, td`, {
  fontFamily: vars.font.sans,
  fontSize: "0.875rem",
  fontWeight: 400,
  lineHeight: "1.3125rem",
  padding: `${vars.sizes[8]} ${vars.sizes[12]}`,
});
