import { NewsletterSection } from "@/components/NewsletterSection/NewsletterSection";
import { getMeta } from "@/content/meta";
import { Locale } from "@/utils/i18n";
import { ORIGIN } from "@/utils/vars";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { match } from "ts-pattern";
import { BackgroundImage } from "./BackgroundImage";
import * as styles from "./page.css";

type PageParams = {
  params: {
    page_slug: string;
    locale: Locale;
  };
};

export const generateMetadata = async ({ params }: PageParams) => {
  const defaultMeta = await getMeta(params.locale);
  const t = await getTranslations("pages.Newsletter");

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: match(params)
        .with({ locale: "fr" }, () => `${ORIGIN}/newsletter`)
        .with({ locale: "en" }, () => `${ORIGIN}/en/newsletter`)
        .exhaustive(),
      languages: {
        fr: `${ORIGIN}/newsletter`,
        en: `${ORIGIN}/en/newsletter`,
        "x-default": `${ORIGIN}/newsletter`,
      },
    },
    twitter: {
      ...defaultMeta.twitter,
      title: t("meta_title"),
      description: t("meta_description"),
    },
    openGraph: {
      ...defaultMeta.openGraph,
      title: t("meta_title"),
      description: t("meta_description"),
      url: match(params)
        .with({ locale: "fr" }, () => `${ORIGIN}/newsletter`)
        .otherwise(({ locale }) => `${ORIGIN}/${locale}/newsletter`),
    },
  };
};

const Newsletter = async ({ params: { locale } }: Readonly<PageParams>) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div className={styles.container}>
        <BackgroundImage />
        <NewsletterSection className={styles.newsletterSection} displayBorderBottom={true} />
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Bireme Lab",
            url: `${ORIGIN}/${locale}`,
            logo: "https://bireme.io/images/logo.png?v=3",
            publisher: {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bireme Lab",
              url: ORIGIN,
              logo: "https://bireme.io/images/logo.png?v=3",
              foundingDate: "2024",
              founders: [
                {
                  "@type": "Person",
                  name: "Antoine Lin",
                  jobTitle: locale === "fr" ? "Co-fondateur" : "Co-founder",
                },
                {
                  "@type": "Person",
                  name: "Frédéric Godin",
                  jobTitle: locale === "fr" ? "Co-fondateur" : "Co-founder",
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
              sameAs: ["https://twitter.com/biremelab", "https://github.com/bireme-lab"],
            },
            sameAs: ["https://twitter.com/biremelab", "https://github.com/bireme-lab"],
          } as WithContext<WebPage>),
        }}
      />
    </>
  );
};

export default Newsletter;
