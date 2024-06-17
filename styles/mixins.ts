import { StyleRule, style } from "@vanilla-extract/css";
import { breakpoints } from "./theme/index.css";

export const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

export const truncate = (): string => {
  return style({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  });
};

// Responsive style
// ------------------ o

export type ResponsiveValue<T> = {
  mobile: T;
  tablet?: T;
  desktop?: T;
};

const getBreakpointRules = (
  breakpoint: string,
  breakpointStyles?: StyleRule | StyleRule[],
): StyleRule[] => {
  if (!breakpointStyles) {
    return [];
  }

  if (Array.isArray(breakpointStyles)) {
    return breakpointStyles.map((breakpointStyle) => ({
      "@media": {
        [`screen and (min-width: ${breakpoint})`]: breakpointStyle,
      },
    }));
  }

  return [
    {
      "@media": {
        [`screen and (min-width: ${breakpoint})`]: breakpointStyles,
      },
    },
  ];
};

export const responsiveStyleRules = (
  styles: ResponsiveValue<StyleRule | StyleRule[]>,
): StyleRule[] => {
  // by default
  const baseStyle = Array.isArray(styles.mobile) ? styles.mobile : [styles.mobile];

  // when we are upper than tablet breakpoint, we apply tablet style
  const tabletStyle = getBreakpointRules(breakpoints.tablet, styles.tablet);
  // when we are upper than desktop breakpoint, we apply desktop style
  const desktopStyle = getBreakpointRules(breakpoints.desktop, styles.desktop);

  return [...baseStyle, ...tabletStyle, ...desktopStyle];
};

export const responsiveStyle = (styles: ResponsiveValue<StyleRule | StyleRule[]>): string => {
  return style(responsiveStyleRules(styles));
};

export function isResponsiveValue<T>(tested: ResponsiveValue<T> | T): tested is ResponsiveValue<T> {
  return Object.prototype.hasOwnProperty.call(tested, "mobile");
}

export function columnCount(count: number): StyleRule {
  if (count === 0) {
    return {
      display: "none",
    };
  }

  return {
    display: "flex",
    gridColumn: `span ${count}`,
  };
}
