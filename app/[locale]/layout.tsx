import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Sprite } from "@/components/Icon/Icon";
import { getMeta } from "@/content/meta";
import "@/styles/global.css";
import { cx } from "@/styles/mixins";
import { dark } from "@/styles/theme/dark.css";
import { configDayJS } from "@/utils/date";
import { i18n, type Locale } from "@/utils/i18n";
import { generateMDXFilesRecord } from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Gloria_Hallelujah } from "next/font/google";
import { Organization, WithContext } from "schema-dts";
import * as styles from "./layout.css";

const GloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  display: "swap",
  variable: "--font-gloria-hallelujah",
  subsets: ["latin"],
});

export const generateMetadata = async ({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> => {
  return await getMeta(params.locale);
};

export const generateStaticParams = async () => {
  return i18n.locales.map((locale) => ({ locale }));
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(params.locale);
  configDayJS(params.locale);
  generateMDXFilesRecord();

  const messages = useMessages();

  return (
    <html
      lang={params.locale}
      className={cx(
        GeistSans.variable,
        GeistMono.variable,
        GloriaHallelujah.variable,
        dark,
        styles.html,
      )}
    >
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#151515" />
        <meta name="apple-mobile-web-app-title" content="Bireme Lab" />
        <meta name="application-name" content="Bireme Lab" />
        <meta name="msapplication-TileColor" content="#151515" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={styles.body}>
        <NextIntlClientProvider messages={messages}>
          <Sprite />
          <div className={styles.lighContainer} aria-hidden={true}>
            <div className={styles.light} />
          </div>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bireme Lab",
              url: ORIGIN,
              logo: "https://bireme.io/images/logo.png",
              foundingDate: "2024",
              founders: [
                {
                  "@type": "Person",
                  name: "Antoine Lin",
                  jobTitle: params.locale === "fr" ? "Co-fondateur" : "Co-founder",
                },
                {
                  "@type": "Person",
                  name: "Frédéric Godin",
                  jobTitle: params.locale === "fr" ? "Co-fondateur" : "Co-founder",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "7 rue Meyerbeer",
                addressLocality: "Paris",
                addressRegion: "Paris",
                postalCode: "75009",
                addressCountry: "FR",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Contact",
                email: "contact@bireme.io",
              },
              sameAs: ["https://twitter.com/biremelab"],
            } as WithContext<Organization>),
          }}
        />
      </body>
    </html>
  );
}
