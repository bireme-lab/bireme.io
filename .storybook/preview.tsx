import React from "react";
import type { Preview } from "@storybook/react";
import { Sprite } from "../components/Icon/Icon";
import "../styles/global.css";
import { cx } from "../styles/mixins";
import { Gloria_Hallelujah } from "next/font/google";
import localFont from "next/font/local";
import { dark } from "../styles/theme/dark.css";
import { vars } from "../styles/theme/index.css";

const GeistSans = localFont({
  src: "../fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
});

const GeistMono = localFont({
  src: "../fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
});

const GloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  display: "swap",
  variable: "--font-gloria-hallelujah",
  subsets: ["latin"],
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "default",
      values: [
        {
          name: "default",
          value: "#151515",
        },
        {
          name: "white",
          value: "white",
        },
        {
          name: "black",
          value: "black",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <main className={cx(GeistSans.variable, GeistMono.variable, GloriaHallelujah.variable, dark)}>
        <Sprite />
        <Story />
      </main>
    ),
  ],
};

export default preview;
