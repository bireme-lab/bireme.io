import { style } from "@vanilla-extract/css";

export const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

export const truncate = (): string => {
  return style({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });
};

type TransitionOptions = {
  duration?: number;
  delay?: number;
  properties?: string[];
  timingFunction?:
    | "ease"
    | "ease-in"
    | "ease-in-out"
    | "ease-out"
    | "linear"
    | "step-end"
    | "step-start";
};

export const transition = ({
  duration = 200,
  delay = 0,
  properties = [],
  timingFunction = "ease-out",
}: TransitionOptions = {}): string => {
  return style({
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionProperty: properties.join(", "),
    transitionTimingFunction: timingFunction,
  });
};
