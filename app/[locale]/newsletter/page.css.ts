import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = style({
  overflow: "hidden",
  position: "relative",
});

export const newsletterSection = style({
  display: "flex",
  alignItems: "center",
  height: "100vh",
});

export const backgroundImageContainer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",

  ":after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 75%)",
  },
});

export const backgroundImage = recipe({
  base: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    transition: "all 0.5s ease-out",
  },
  variants: {
    loaded: {
      true: {
        opacity: 1,
        transform: "translateY(0)",
      },
      false: {
        opacity: 0,
        transform: "translateY(10px)",
      },
    },
  },
});
