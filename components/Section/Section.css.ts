import { responsiveStyle } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { recipe } from "@vanilla-extract/recipes";

export const section = recipe({
  base: responsiveStyle({
    mobile: {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[48],
      padding: `${vars.sizes[72]} ${vars.sizes[24]}`,
    },
    tablet: {
      padding: `${vars.sizes[72]} ${vars.sizes[48]}`,
    },
  }),
  variants: {
    displayBorderBottom: {
      true: {
        borderBottom: `1px solid ${vars.color.neutral[700]}`,
      },
    },
    displayBorderTop: {
      true: {
        borderTop: `1px solid ${vars.color.neutral[700]}`,
      },
    },
  },
});
