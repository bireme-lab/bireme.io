import { Grid } from "@/components/Grid/Grid";
import { Section } from "@/components/Section/Section";
import { Text } from "@/components/Text/Text";
import { getMeta } from "@/content/meta";
import { Locale } from "@/utils/i18n";
import { ORIGIN } from "@/utils/vars";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { FAQPage, WebPage, WithContext } from "schema-dts";
import { match } from "ts-pattern";
import * as styles from "./page.css";

type PageParams = {
  params: {
    page_slug: string;
    locale: Locale;
  };
};

export const generateMetadata = async ({ params }: PageParams) => {
  const defaultMeta = await getMeta(params.locale);
  const t = await getTranslations("pages.Hermes");

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: match(params)
        .with({ locale: "fr" }, () => `${ORIGIN}/hermes`)
        .with({ locale: "en" }, () => `${ORIGIN}/en/hermes`)
        .exhaustive(),
      languages: {
        fr: `${ORIGIN}/hermes`,
        en: `${ORIGIN}/en/hermes`,
        "x-default": `${ORIGIN}/hermes`,
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
        .with({ locale: "fr" }, () => `${ORIGIN}/hermes`)
        .otherwise(({ locale }) => `${ORIGIN}/${locale}/hermes`),
    },
  };
};

const Hermes = async ({ params: { locale } }: Readonly<PageParams>) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("pages.Hermes");

  return (
    <>
      <div className={styles.container}>
        <Section>
          <Grid>
            <div className={styles.dummy} />
            <div className={styles.titleWrapper}>
              <Text variant="gradientTitle" markup="h1" className={styles.title}>
                <span className={styles.titleSpan}>{t.rich("title")}</span>
              </Text>
            </div>
            <div className={styles.dummy} />
          </Grid>
        </Section>
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
            logo: "https://bireme.io/images/logo.png?v=2",
            publisher: {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bireme Lab",
              url: ORIGIN,
              logo: "https://bireme.io/images/logo.png?v=2",
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            name: "Bireme Lab",
            url: `${ORIGIN}/${locale}`,
            logo: "https://bireme.io/images/logo.png?v=2",
            publisher: {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bireme Lab",
              url: ORIGIN,
              logo: "https://bireme.io/images/logo.png?v=2",
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
            mainEntity: Array(5)
              .fill(null)
              .map((_, i) => {
                return {
                  "@type": "Question",
                  // @ts-expect-error - This is a dynamic key
                  name: t(`faq_question_${i + 1}`),
                  acceptedAnswer: {
                    "@type": "Answer",
                    // @ts-expect-error - This is a dynamic key
                    text: t(`faq_answer_${i + 1}`),
                  },
                };
              }),
          } as WithContext<FAQPage>),
        }}
      />
    </>
  );
};

export default Hermes;
