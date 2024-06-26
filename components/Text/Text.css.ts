import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style, styleVariants } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const text = recipe({
  base: {
    fontFamily: vars.font.sans,
    display: "inline",
    zIndex: 1,
    position: "relative",
    transition: `all ${transitionDuration}ms ease-out`,
  },
  variants: {
    variant: {
      code: {
        fontSize: "0.8125rem",
        fontWeight: 400,
        fontFamily: vars.font.mono,
        lineHeight: "0.8125rem",
      },
      comment: {
        fontFamily: vars.font.hand,
      },
      small: {
        fontSize: "0.8125rem",
        fontWeight: 400,
        lineHeight: "1.1875rem",
      },
      "small-mono": {
        fontSize: "0.8125rem",
        fontWeight: 400,
        fontFamily: vars.font.mono,
        lineHeight: "0.8125rem",
        textTransform: "uppercase",
      },
      "small-flat": {
        fontSize: "0.8125rem",
        fontWeight: 400,
        lineHeight: "0.8125rem",
      },
      body: {
        fontSize: "0.9375rem",
        fontWeight: 400,
        lineHeight: "1.563rem",
      },
      "body-flat": {
        fontSize: "0.9375rem",
        fontWeight: 400,
        lineHeight: "0.938rem",
      },
      "section-heading": {
        fontFamily: vars.font.mono,
        fontSize: "0.8125rem",
        fontWeight: 400,
        lineHeight: "0.8125rem",
        textTransform: "uppercase",
      },
      title3: {
        fontSize: "1.0625rem",
        fontWeight: 500,
        lineHeight: "1.5rem",
      },
      title2: {
        fontSize: "1.25rem",
        fontWeight: 500,
        lineHeight: "1.625rem",
      },
      title1: {
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: "2.5rem",
      },
      gradientTitle: {
        fontSize: "3rem",
        fontWeight: 600,
        lineHeight: "3rem",
      },
    },
  },
});

export const em = style({
  fontStyle: "italic",
});

export const strong = style({
  fontWeight: 500,
});

export const s = style({
  textDecoration: "line-through",
});

export const sup = style({
  verticalAlign: "sup",
});

export const underlinedLink = style({
  fontWeight: 500,
  textDecoration: "underline",
});

export const defaultLink = style({
  zIndex: 1,
  position: "relative",
  transitionProperty: "color",
  transitionDuration: `${transitionDuration}ms`,
  transitionTimingFunction: "ease-out",
  color: vars.color.primary[500],

  ":hover": {
    color: vars.color.primary[300],
  },

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 2,
    borderRadius: vars.sizes[2],
  },
});

export const textColor = styleVariants({
  inherit: { color: "inherit" },
  "primary-50": { color: vars.color.primary[50] },
  "primary-100": { color: vars.color.primary[100] },
  "primary-200": { color: vars.color.primary[200] },
  "primary-300": { color: vars.color.primary[300] },
  "primary-400": { color: vars.color.primary[400] },
  "primary-500": { color: vars.color.primary[500] },
  "primary-600": { color: vars.color.primary[600] },
  "primary-700": { color: vars.color.primary[700] },
  "primary-800": { color: vars.color.primary[800] },
  "primary-900": { color: vars.color.primary[900] },
  "negative-50": { color: vars.color.negative[50] },
  "negative-100": { color: vars.color.negative[100] },
  "negative-200": { color: vars.color.negative[200] },
  "negative-300": { color: vars.color.negative[300] },
  "negative-400": { color: vars.color.negative[400] },
  "negative-500": { color: vars.color.negative[500] },
  "negative-600": { color: vars.color.negative[600] },
  "negative-700": { color: vars.color.negative[700] },
  "negative-800": { color: vars.color.negative[800] },
  "negative-900": { color: vars.color.negative[900] },
  "positive-50": { color: vars.color.positive[50] },
  "positive-100": { color: vars.color.positive[100] },
  "positive-200": { color: vars.color.positive[200] },
  "positive-300": { color: vars.color.positive[300] },
  "positive-400": { color: vars.color.positive[400] },
  "positive-500": { color: vars.color.positive[500] },
  "positive-600": { color: vars.color.positive[600] },
  "positive-700": { color: vars.color.positive[700] },
  "positive-800": { color: vars.color.positive[800] },
  "positive-900": { color: vars.color.positive[900] },
  "neutral-50": { color: vars.color.neutral[50] },
  "neutral-100": { color: vars.color.neutral[100] },
  "neutral-200": { color: vars.color.neutral[200] },
  "neutral-300": { color: vars.color.neutral[300] },
  "neutral-400": { color: vars.color.neutral[400] },
  "neutral-500": { color: vars.color.neutral[500] },
  "neutral-600": { color: vars.color.neutral[600] },
  "neutral-700": { color: vars.color.neutral[700] },
  "neutral-800": { color: vars.color.neutral[800] },
  "neutral-900": { color: vars.color.neutral[900] },
  transparent: { color: vars.color.invariant.transparent },
  "black-a10": { color: vars.color.invariant.black.a10 },
  "black-a20": { color: vars.color.invariant.black.a20 },
  "black-a30": { color: vars.color.invariant.black.a30 },
  "black-a40": { color: vars.color.invariant.black.a40 },
  "black-a50": { color: vars.color.invariant.black.a50 },
  "black-a60": { color: vars.color.invariant.black.a60 },
  "black-a70": { color: vars.color.invariant.black.a70 },
  "black-a80": { color: vars.color.invariant.black.a80 },
  "black-a90": { color: vars.color.invariant.black.a90 },
  "black-a100": { color: vars.color.invariant.black.a100 },
  "white-a10": { color: vars.color.invariant.white.a10 },
  "white-a20": { color: vars.color.invariant.white.a20 },
  "white-a30": { color: vars.color.invariant.white.a30 },
  "white-a40": { color: vars.color.invariant.white.a40 },
  "white-a50": { color: vars.color.invariant.white.a50 },
  "white-a60": { color: vars.color.invariant.white.a60 },
  "white-a70": { color: vars.color.invariant.white.a70 },
  "white-a80": { color: vars.color.invariant.white.a80 },
  "white-a90": { color: vars.color.invariant.white.a90 },
  "white-a100": { color: vars.color.invariant.white.a100 },
});
