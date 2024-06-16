import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: vars.sizes[20],
  backgroundColor: vars.color.neutral[800],
  padding: vars.sizes[36],
  borderRadius: vars.sizes[8],
  border: `1px solid ${vars.color.neutral[700]}`,
});

export const anchorList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
});

export const anchorListItem = recipe({
  base: {
    padding: `${vars.sizes[4]} 0`,
  },
  variants: {
    level: {
      2: {
        marginTop: vars.sizes[12],

        ":first-of-type": {
          marginTop: 0,
        },
      },
      3: {
        position: "relative",
        paddingLeft: vars.sizes[16],
      },
      4: {
        position: "relative",
        paddingLeft: vars.sizes[32],
      },
      5: {},
      6: {},
    },
  },
});

export const anchor = style({
  color: vars.color.neutral[200],

  ":hover": {
    color: vars.color.primary[500],
  },

  ":focus-visible": {
    outline: "none",
    color: vars.color.primary[500],
  },
});

export const anchorDecoration = recipe({
  base: {
    position: "absolute",
    top: 0,
    width: "1px",
    height: "100%",
    backgroundColor: vars.color.neutral[700],
  },
  variants: {
    indentation: {
      none: {
        left: 0,
      },
      simple: {
        left: vars.sizes[16],
      },
    },
  },
});
