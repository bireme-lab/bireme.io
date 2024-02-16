import { truncate } from "@/styles/mixins";
import { vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const link = recipe({
  base: {},
  variants: {
    isLast: {
      true: [
        truncate(),
        {
          flex: 1,
        },
      ],
    },
  },
});

export const separator = style({
  margin: `0 ${vars.spacings.content.gapSmall}`,
  userSelect: "none",
});
