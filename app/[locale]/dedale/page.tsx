import { BentoCard } from "@/components/BentoCard/BentoCard";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { Image } from "@/components/Image/Image";
import { IntegrationTooltip } from "@/components/IntegrationsTooltip/IntegrationTooltip";
import { PricingOption } from "@/components/PricingOption/PricingOption";
import { Question } from "@/components/Question/Question";
import { ReactEmailSection } from "@/components/ReactEmailSection/ReactEmailSection";
import { Section } from "@/components/Section/Section";
import { Text } from "@/components/Text/Text";
import WaitingListForm from "@/components/WaitingListForm/WaitingListForm";
import { getMeta } from "@/content/meta";
import { Locale } from "@/utils/i18n";
import { ORIGIN } from "@/utils/vars";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { FAQPage, WebPage, WithContext } from "schema-dts";
import { match } from "ts-pattern";
import * as styles from "./page.css";

type HeroProps = {
  locale: Locale;
};

const Hero: React.FC<HeroProps> = async () => {
  const t = await getTranslations("pages.Dedale");

  return (
    <div className={styles.hero}>
      <Grid>
        <div className={styles.titleDummy} />
        <div className={styles.titleWrapper}>
          <Text variant="gradientTitle" markup="h1" className={styles.title}>
            <span className={styles.titleSpan}>{t("title")}</span>
          </Text>
        </div>
        <div className={styles.titleDummy} />
      </Grid>
      <Grid>
        <div className={styles.descriptionDummy} />
        <div className={styles.descriptionWrapper}>
          <Text variant="body" markup="p" color="neutral-100" className={styles.description}>
            {t.rich("description", {
              primary: (chunk) => <Text color="primary-500">{chunk}</Text>,
            })}
          </Text>
        </div>
        <div className={styles.descriptionDummy} />
      </Grid>
      <Grid>
        <div className={styles.waitingListDummy} />
        <WaitingListForm className={styles.waitingList} />
        <div className={styles.waitingListDummy} />
      </Grid>
      <div className={styles.heroImageContainer}>
        <Image
          className={styles.heroImage}
          src="/images/dedale-product-image.webp"
          fill={true}
          alt={t("title")}
          title={t("title")}
        />
      </div>
    </div>
  );
};

Hero.displayName = "Hero";

type PageParams = {
  params: {
    page_slug: string;
    locale: Locale;
  };
};

export const generateMetadata = async ({ params }: PageParams) => {
  const defaultMeta = await getMeta(params.locale);
  const t = await getTranslations("pages.Dedale");

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: match(params)
        .with({ locale: "fr" }, () => `${ORIGIN}/dedale`)
        .with({ locale: "en" }, () => `${ORIGIN}/en/dedale`)
        .exhaustive(),
      languages: {
        fr: `${ORIGIN}/dedale`,
        en: `${ORIGIN}/en/dedale`,
        "x-default": `${ORIGIN}/dedale`,
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
        .with({ locale: "fr" }, () => `${ORIGIN}/dedale`)
        .otherwise(({ locale }) => `${ORIGIN}/${locale}/dedale`),
    },
  };
};

const Dedale = async ({ params: { locale } }: Readonly<PageParams>) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations("pages.Dedale");

  return (
    <>
      <div className={styles.container}>
        <Hero locale={locale} />
        <Section className={styles.integrateSection}>
          <div className={styles.integrateIntroWrapper}>
            <Text variant="small">{t("integrate_to")}</Text>
            <IntegrationTooltip />
          </div>
          <div className={styles.integrateLogo}>
            <Icon name="pipedrive" title="Pipedrive" className={styles.pipedriveLogo} />
            <Icon name="salesforce" title="Salesforce" className={styles.salesforceLogo} />
            <Icon name="mailchimp" title="Mailchimp" className={styles.mailchimpLogo} />
            <Icon name="hubspot" title="HubSpot" className={styles.hubspotLogo} />
            <Icon name="sendgrid" title="SendGrid" className={styles.sendgridLogo} />
            <Icon name="klaviyo" title="Klaviyo" className={styles.klaviyoLogo} />
            <Icon name="brevo" title="Brevo" className={styles.brevoLogo} />
            <Icon name="clerk" title="Clerk" className={styles.clerkLogo} />
            <Icon name="resend" title="Resend" className={styles.resendLogo} />
          </div>
        </Section>
        <Section>
          <Grid>
            <div className={styles.sectionTitleDummy} />
            <div className={styles.sectionTitleWrapper}>
              <Text markup="h2" variant="title1" color="white-a100" className={styles.centeredText}>
                {t("features_title")}
              </Text>
              <Text markup="p" variant="body" className={styles.centeredText}>
                {t("features_description")}
              </Text>
            </div>
            <div className={styles.sectionTitleDummy} />
          </Grid>
          <Grid>
            <BentoCard
              variant="contained"
              title={t("feature_1_title")}
              description={t("feature_1_description")}
              className={styles.bentoCardFeature1}
              illustration="/images/editor.webp"
            />
            <BentoCard
              variant="contained"
              title={t("feature_2_title")}
              description={t("feature_2_description")}
              className={styles.bentoCardFeature2}
              illustration="/images/variables-panel.webp"
            />
            <BentoCard
              variant="covered"
              title={t("feature_3_title")}
              description={t("feature_3_description")}
              className={styles.bentoCardFeature3}
              illustration="/images/logos.webp"
            />
            <BentoCard
              variant="covered"
              title={t("feature_4_title")}
              description={t("feature_4_description")}
              className={styles.bentoCardFeature4}
              illustration="/images/can-i-email.webp"
            />
          </Grid>
        </Section>
        <ReactEmailSection />
        <Section>
          <Grid>
            <div className={styles.sectionTitleDummy} />
            <div className={styles.sectionTitleWrapper}>
              <Text markup="h2" variant="title1" color="white-a100" className={styles.centeredText}>
                {t("pricing_title")}
              </Text>
              <Text markup="p" variant="body" className={styles.centeredText}>
                {t("pricing_description")}
              </Text>
            </div>
            <div className={styles.sectionTitleDummy} />
          </Grid>
          <Grid>
            <div className={styles.pricingDummy} />
            <PricingOption
              locale={locale}
              variant="neutral"
              price="0,00"
              title={t("pricing_option_title_1")}
              description={t("pricing_option_description_1")}
              className={styles.pricingOption}
              perks={[
                t("pricing_option_perk_1_1"),
                t("pricing_option_perk_1_2"),
                t("pricing_option_perk_1_3"),
              ]}
            />
            <PricingOption
              locale={locale}
              variant="primary"
              price="0,00"
              title={t("pricing_option_title_2")}
              description={t("pricing_option_description_2")}
              className={styles.pricingOption}
              perks={[
                t("pricing_option_perk_2_1"),
                t("pricing_option_perk_2_2"),
                t("pricing_option_perk_2_3"),
              ]}
            />
            <div className={styles.pricingDummy} />
          </Grid>
          <Grid>
            <div className={styles.pricingDisclaimerDummy} />
            <div className={styles.pricingDisclaimerContainer}>
              <Text variant="small" className={styles.pricingDisclaimer}>
                {t("pricing_disclaimer")}
              </Text>
              <Text variant="small" className={styles.pricingDisclaimer}>
                {t("pricing_wip")}
              </Text>
            </div>
            <div className={styles.pricingDisclaimerDummy} />
          </Grid>
        </Section>
        <Section>
          <Grid>
            <div className={styles.sectionTitleDummy} />
            <div className={styles.sectionTitleWrapper}>
              <Text markup="h2" variant="title1" color="white-a100" className={styles.centeredText}>
                {t("faq_title")}
              </Text>
              <Text markup="p" variant="body" className={styles.centeredText}>
                {t("faq_description")}
              </Text>
            </div>
            <div className={styles.sectionTitleDummy} />
          </Grid>
          <Grid>
            <div className={styles.faqDummy} />
            <div className={styles.faqWrapper}>
              <Question question={t("faq_question_1")} answer={t("faq_answer_1")} />
              <Question question={t("faq_question_2")} answer={t("faq_answer_2")} />
              <Question question={t("faq_question_3")} answer={t("faq_answer_3")} />
              <Question question={t("faq_question_4")} answer={t("faq_answer_4")} />
              <Question question={t("faq_question_5")} answer={t("faq_answer_5")} />
            </div>
            <div className={styles.faqDummy} />
          </Grid>
        </Section>
        <Section>
          <Grid>
            <div className={styles.sectionTitleDummy} />
            <div className={styles.sectionTitleWrapper}>
              <Text
                markup="h2"
                variant="title1"
                color="primary-500"
                className={styles.centeredText}
              >
                {t("ready_to_test_title")}
              </Text>
              <Text markup="p" variant="body" className={styles.centeredText}>
                {t("ready_to_test_description")}
              </Text>
            </div>
            <div className={styles.sectionTitleDummy} />
          </Grid>
          <Grid>
            <div className={styles.waitingListDummy} />
            <WaitingListForm className={styles.waitingList} displayDisclaimer={true} />
            <div className={styles.waitingListDummy} />
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

export default Dedale;
