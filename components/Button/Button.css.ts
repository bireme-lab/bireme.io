import { transitionDuration, vars } from "@/styles/theme/index.css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const buttonContainer = style({
  position: "relative",
  display: "flex",
  height: "100%",
});

export const button = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "auto",
    borderRadius: vars.sizes[4],
    transitionProperty: "color, transform, background, border",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",
    cursor: "pointer",

    // Prevents flickering on Safari
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d",

    ":focus": {
      outline: "none",
    },
    ":focus-visible": {
      outline: "none",
    },
  },
  variants: {
    variant: {
      plain: {
        border: "none",
        backgroundColor: vars.color.invariant.white.a100,
        backgroundImage: "linear-gradient(98deg, rgba(255,255,255,0) -63.78%, #FFC799 100%)",
        color: vars.color.neutral[900],
      },
      outline: {
        border: `1px solid ${vars.color.neutral[500]}`,
        backgroundColor: vars.color.invariant.transparent,
        color: vars.color.neutral[50],
      },
    },
    size: {
      small: {
        padding: `${vars.sizes[8]} ${vars.sizes[12]}`,
      },
      regular: {
        padding: `${vars.sizes[12]} ${vars.sizes[16]}`,
      },
      full: {},
    },
    isHovered: {
      true: {},
    },
    isFocused: {
      true: {},
    },
    isPressed: {
      true: {
        transform: "scale(0.99)",
      },
    },
    isSuccess: {
      true: {},
    },
    isLoading: {
      true: {
        cursor: "not-allowed",
      },
    },
    isDisabled: {
      true: {
        cursor: "not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: "plain",
        isHovered: true,
      },
      style: {
        backgroundColor: vars.color.primary[500],
      },
    },
    {
      variants: {
        variant: "plain",
        isFocused: true,
      },
      style: {
        outline: `1px solid ${vars.color.primary[500]}!important`,
        outlineOffset: 4,
        borderRadius: vars.sizes[2],
      },
    },
    {
      variants: {
        variant: "plain",
        isPressed: true,
      },
      style: {
        backgroundColor: vars.color.primary[300],
      },
    },
    {
      variants: {
        variant: "plain",
        isLoading: true,
      },
      style: {
        backgroundColor: vars.color.primary[300],
      },
    },
    {
      variants: {
        variant: "plain",
        isDisabled: true,
      },
      style: {
        color: vars.color.neutral[800],
        backgroundColor: vars.color.neutral[300],
        backgroundImage: "none",
      },
    },
    {
      variants: {
        variant: "plain",
        isSuccess: true,
      },
      style: {
        backgroundColor: vars.color.primary[300],
      },
    },
    {
      variants: {
        variant: "outline",
        isHovered: true,
      },
      style: {
        borderColor: vars.color.neutral[200],
      },
    },
    {
      variants: {
        variant: "outline",
        isFocused: true,
      },
      style: {
        outline: `1px solid ${vars.color.primary[500]}!important`,
        outlineOffset: 4,
        borderRadius: vars.sizes[2],
      },
    },
    {
      variants: {
        variant: "outline",
        isPressed: true,
      },
      style: {
        borderColor: vars.color.neutral[300],
      },
    },
    {
      variants: {
        variant: "outline",
        isSuccess: true,
      },
      style: {
        border: `1px solid ${vars.color.positive[500]}`,
      },
    },
    {
      variants: {
        variant: "outline",
        isDisabled: true,
      },
      style: {
        backgroundColor: vars.color.neutral[700],
        border: `1px solid ${vars.color.neutral[700]}`,
        color: vars.color.neutral[300],
      },
    },
  ],
});

export const label = recipe({
  base: {
    transitionProperty: "opacity, margin",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",
  },
  variants: {
    showArrow: {
      true: {},
    },
    isHovered: {
      true: {},
    },
    isFocused: {
      true: {},
    },
    hideLabel: {
      true: {
        opacity: 0,
      },
    },
  },
});

const wave = keyframes({
  "0%": { transform: "scale(0)" },
  "100%": { transform: "scale(1)" },
});

export const loader = style({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
  width: vars.sizes[16],
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  justifyContent: "space-between",
});

export const loaderElement = recipe({
  base: {
    width: vars.sizes[4],
    height: vars.sizes[4],
    borderRadius: "50%",
    transform: "scale(0)",
    animationDuration: "400ms",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
    animationTimingFunction: "ease-out",
    transitionProperty: "transform",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",

    selectors: {
      "&:nth-child(1)": {
        transitionDelay: "100ms",
        animationDelay: "100ms",
      },
      "&:nth-child(2)": {
        transitionDelay: "200ms",
        animationDelay: "200ms",
      },
      "&:nth-child(3)": {
        transitionDelay: "300ms",
        animationDelay: "300ms",
      },
    },
  },
  variants: {
    variant: {
      plain: {
        backgroundColor: vars.color.neutral[900],
      },
      outline: {
        backgroundColor: vars.color.neutral[200],
      },
    },
    loaderIsVisible: {
      true: {
        animationName: wave,
      },
    },
  },
});

export const successBackground = recipe({
  base: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    ":before": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      transform: "translate3d(-50%, -50%, 0) scale3d(0, 0, 0)",
      transformOrigin: "center",
      backgroundColor: vars.color.positive[500],
      transition: `transform ${transitionDuration}ms ease-out`,
      transitionDelay: "300ms",
    },
  },
  variants: {
    variant: {
      plain: {},
      outline: {},
    },
    isSuccess: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: "plain",
        isSuccess: true,
      },
      style: {
        ":before": {
          transform: "translate3d(-50%, -50%, 0) scale3d(5, 5, 5)",
        },
      },
    },
  ],
});

export const check = recipe({
  base: {
    position: "relative",
    width: vars.sizes[32],
    height: vars.sizes[32],
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: "0 auto",
    transform: "scale(0)",
    transformOrigin: "center",
    transitionProperty: "transform",
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: "ease-out",

    // Prevents flickering on Safari
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  },
  variants: {
    variant: {
      plain: {
        color: vars.color.neutral[900],
        transitionDelay: "300ms",
      },
      outline: {
        color: vars.color.positive[500],
      },
    },
    isSuccess: {
      true: {
        transform: "scale(1)",
      },
    },
  },
});
