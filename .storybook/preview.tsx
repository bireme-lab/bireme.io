import React from "react";
import type { Preview } from "@storybook/react";
import { Sprite } from "../components/Icon/Icon";
import "../styles/global.css";
import { cx } from "../styles/mixins";
import { Gloria_Hallelujah } from "next/font/google";
import localFont from "next/font/local";
import { dark } from "../styles/theme/dark.css";
import { NextIntlClientProvider } from "next-intl";
import fr from '../messages/fr.json';
import en from '../messages/en.json';
import { i18n } from '../utils/i18n';

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

const messages = {
  fr,
  en,
}

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
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Website available locales",
      defaultValue: i18n.defaultLocale,
      toolbar: {
        icon: "globe",
        items: i18n.locales,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <main className={cx(GeistSans.variable, GeistMono.variable, GloriaHallelujah.variable, dark)}>
          <Sprite />
          <NextIntlClientProvider
            locale={context.globals.locale}
            messages={messages[context.globals.locale]}
          >
            <Story />
          </NextIntlClientProvider>
        </main>
      )
    },
  ],
};

export default preview;
