import { columnCount, responsiveStyle } from "@/styles/mixins";
import { transitionDuration, vars } from "@/styles/theme/index.css";
import { style } from "@vanilla-extract/css";

export const hero = responsiveStyle({
  mobile: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: vars.sizes[12],
    paddingTop: vars.sizes[36],
    paddingLeft: vars.sizes[24],
    paddingRight: vars.sizes[24],
    borderBottom: `1px solid ${vars.color.neutral[700]}`,
    overflow: "hidden",
    background: "linear-gradient(180deg, #0E0E0E 27.35%, #331010 182.31%)",
  },
  tablet: {
    gap: vars.sizes[24],
    paddingTop: vars.sizes[72],
    paddingLeft: vars.sizes[24],
    paddingRight: vars.sizes[24],
  },
  desktop: {
    paddingLeft: vars.sizes[48],
    paddingRight: vars.sizes[48],
  },
});

export const heroImageContainer = style({
  position: "relative",
  width: "100%",
  aspectRatio: "1183 / 361",
  borderTopLeftRadius: vars.sizes[8],
  borderTopRightRadius: vars.sizes[8],
  border: `1px solid ${vars.color.neutral[700]}`,
  borderBottom: "none",
  overflow: "hidden",
  marginTop: vars.sizes[48],
});

export const heroImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
});

export const titleDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(2),
});

export const titleWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[8],
    },
  ],
  tablet: columnCount(4),
  desktop: columnCount(8),
});

export const titleSpan = style({
  display: "inline-block",
  verticalAlign: "top",
  textDecoration: "inherit",
  textWrap: "balance",

  "::selection": {
    backgroundColor: `rgba(228, 204, 76, 0.5)`,
    color: vars.color.neutral[900],
  },
});

export const descriptionDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(3),
});

export const descriptionWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  ],
  tablet: columnCount(4),
  desktop: columnCount(6),
});

export const description = style({
  textAlign: "center",
});

export const title = responsiveStyle({
  mobile: {
    fontSize: "2.5rem!important",
    lineHeight: "2.5rem!important",
    background: "linear-gradient(to right bottom, #F9EADE 30%, #FFC799) text",
    boxDecorationBreak: "clone",
    WebkitTextFillColor: "transparent",
    color: "unset",
    textWrap: "balance",
    textAlign: "center",
  },
  tablet: {
    fontSize: "3rem!important",
    lineHeight: "3rem!important",
  },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "735px",
});

export const ctaDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(3),
});

export const ctaContainer = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: vars.sizes[12],
    },
  ],
  tablet: columnCount(4),
  desktop: [
    columnCount(6),
    {
      marginTop: vars.sizes[12],
    },
  ],
});

export const cta = style({
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
  border: "none",
  backgroundColor: vars.color.invariant.white.a100,
  backgroundImage: "linear-gradient(98deg, rgba(255,255,255,0) -63.78%, #FFC799 100%)",
  color: vars.color.neutral[900],
  padding: `${vars.sizes[12]} ${vars.sizes[16]}`,

  // Prevents flickering on Safari
  backfaceVisibility: "hidden",
  transformStyle: "preserve-3d",

  ":hover": {
    outline: "none",
    backgroundColor: vars.color.primary[500],
  },

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}!important`,
    outlineOffset: 4,
    borderRadius: vars.sizes[2],
  },
});

export const docLink = style({
  display: "flex",
  alignItems: "center",
  color: vars.color.neutral[200],
  transition: `color ${transitionDuration}ms ease-out`,

  ":hover": {
    color: vars.color.primary[500],
  },
});

export const ctaIcon = style({
  width: vars.sizes[24],
  minWidth: vars.sizes[24],
  height: vars.sizes[24],
  minHeight: vars.sizes[24],
  color: vars.color.neutral[200],
});

export const integrateIntroWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: vars.sizes[8],
});

export const integrateSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${vars.sizes[24]}!important`,
});

export const integrateLogo = responsiveStyle({
  mobile: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: vars.sizes[24],
  },
  tablet: {},
  desktop: {
    maxWidth: "622px",
  },
});

export const pipedriveLogo = style({
  width: "92px",
  minWidth: "92px",
  height: "20px",
  minHeight: "20px",
});

export const salesforceLogo = style({
  width: "88px",
  minWidth: "88px",
  height: "20px",
  minHeight: "20px",
});

export const mailchimpLogo = style({
  width: "110px",
  minWidth: "110px",
  height: "20px",
  minHeight: "20px",
});

export const hubspotLogo = style({
  width: "68px",
  minWidth: "68px",
  height: "20px",
  minHeight: "20px",
});

export const sendgridLogo = style({
  width: "107px",
  minWidth: "107px",
  height: "20px",
  minHeight: "20px",
});

export const klaviyoLogo = style({
  width: "68px",
  minWidth: "68px",
  height: "20px",
  minHeight: "20px",
});

export const brevoLogo = style({
  width: "68px",
  minWidth: "68px",
  height: "20px",
  minHeight: "20px",
});

export const clerkLogo = style({
  width: "59px",
  minWidth: "59px",
  height: "20px",
  minHeight: "20px",
});

export const resendLogo = style({
  width: "81px",
  minWidth: "81px",
  height: "20px",
  minHeight: "20px",
});

export const sectionTitleWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: vars.sizes[24],
    },
  ],
  tablet: columnCount(4),
  desktop: columnCount(6),
});

export const sectionTitleDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(3),
});

export const centeredText = style({
  textAlign: "center",
});

export const waitingListSection = style({});

export const reactEmailScreenshotWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      position: "relative",
      aspectRatio: "984 / 623",
      borderRadius: vars.sizes[8],
      border: `1px solid ${vars.color.neutral[700]}`,
      overflow: "hidden",
    },
  ],
  tablet: columnCount(10),
  desktop: columnCount(10),
});

export const reactEmailScreenshotDummy = responsiveStyle({
  mobile: columnCount(1),
  tablet: columnCount(1),
  desktop: columnCount(1),
});

export const reactEmailScreenshot = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
});

export const reactEmailLink = style({
  textUnderlineOffset: vars.sizes[4],

  ":hover": {
    textDecoration: "underline",
  },

  ":focus-visible": {
    outline: `1px solid ${vars.color.primary[500]}`,
    outlineOffset: 2,
    borderRadius: vars.sizes[2],
  },
});

export const reactEmailLinkText = style({
  display: "flex!important",
  gap: vars.sizes[8],
  alignItems: "center",
});

export const reactEmailLinkIcon = style({
  width: vars.sizes[16],
  minWidth: vars.sizes[16],
  height: vars.sizes[16],
  minHeight: vars.sizes[16],
});

export const faqWrapper = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[12],
    },
  ],
  tablet: columnCount(6),
  desktop: columnCount(8),
});

export const faqDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(0),
  desktop: columnCount(2),
});

export const bentoCardFeature1 = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(6),
  desktop: columnCount(8),
});

export const bentoCardFeature2 = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(6),
  desktop: columnCount(4),
});

export const bentoCardFeature3 = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(6),
  desktop: columnCount(4),
});

export const bentoCardFeature4 = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(6),
  desktop: columnCount(8),
});

export const pricingDummy = responsiveStyle({
  mobile: columnCount(0),
  tablet: columnCount(0),
  desktop: columnCount(3),
});

export const pricingOption = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(3),
  desktop: columnCount(3),
});

export const pricingDisclaimerDummy = responsiveStyle({
  mobile: columnCount(2),
  tablet: columnCount(1),
  desktop: columnCount(3),
});

export const pricingDisclaimerContainer = responsiveStyle({
  mobile: [
    columnCount(2),
    {
      display: "flex",
      flexDirection: "column",
      gap: vars.sizes[12],
    },
  ],
  tablet: columnCount(4),
  desktop: columnCount(6),
});

export const pricingDisclaimer = style({
  textAlign: "center",
});

export const lastSection = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: `${vars.sizes[24]}!important`,
});
