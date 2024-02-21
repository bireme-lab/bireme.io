import { responsiveStyle } from "@/styles/mixins";
import { sizes, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = responsiveStyle({
  mobile: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: vars.spacings.tableOfContent.gap,
  },
  desktop: {
    position: "sticky",
    top: sizes[24],
  },
});

export const header = style({
  width: "100%",
  padding: `${vars.spacings.tableOfContent.verticalPadding} ${vars.spacings.tableOfContent.horizontalPadding}`,
  border: `1px solid ${vars.color.neutral[700]}`,
  borderRadius: vars.spacings.tableOfContent.radius,
  display: "flex",
  alignItems: "center",
  gap: vars.spacings.content.gapRegular,
});

export const icon = style({
  width: vars.spacings.tableOfContent.iconSize,
  height: vars.spacings.tableOfContent.iconSize,
});

export const anchorList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
});

export const anchor = recipe({
  base: {
    padding: `${vars.spacings.tableOfContent.anchorsGap} 0`,
    transition: "color 200ms ease-out",
  },
  variants: {
    level: {
      2: {
        marginTop: sizes[12],
        color: vars.color.primary[500],

        ":hover": {
          color: vars.color.primary[700],
        },
      },
      3: {
        position: "relative",
        color: vars.color.primary[700],
        paddingLeft: sizes[16],

        ":hover": {
          color: vars.color.primary[500],
        },
      },
      4: {
        position: "relative",
        color: vars.color.primary[700],
        paddingLeft: sizes[32],

        ":hover": {
          color: vars.color.primary[500],
        },
      },
      5: {
        color: vars.color.primary[700],
      },
      6: {
        color: vars.color.primary[700],
      },
    },
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
        left: sizes[16],
      },
    },
  },
});
