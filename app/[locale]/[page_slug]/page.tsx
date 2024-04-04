import { Breadcrumb, Step } from "@/components/Breadcrumb/Breadcrumb";
import { Container } from "@/components/Container/Container";
import { CustomMDX } from "@/components/CustomMDX/CustomMDX";
import { Divider } from "@/components/Divider/Divider";
import { Grid } from "@/components/Grid/Grid";
import { TableOfContent } from "@/components/TableOfContent/TableOfContent";
import { Text } from "@/components/Text/Text";
import { getMeta } from "@/content/meta";
import { cx } from "@/styles/mixins";
import { Locale, i18n } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

type PageParams = {
  params: {
    page_slug: string;
    locale: Locale;
  };
};

export const generateStaticParams = async () => {
  const pages = await i18n.locales.reduce<Promise<{ locale: Locale; page: MDX.Page }[]>>(
    async (accPromise, locale) => {
      const pagesOption = await MDX.Page.all(locale);
      const acc = await accPromise;

      if (pagesOption.isSome()) {
        const pages = pagesOption.get();
        const formattedPages = pages.map((page) => ({ locale, page }));

        return [...acc, ...formattedPages];
      }

      return acc;
    },
    Promise.resolve([]),
  );

  if (pages.length === 0) {
    return [];
  }

  return pages
    .filter(({ page }) => !["home", "accueil"].includes(page.slug))
    .map(({ page, locale }) => ({
      page_slug: page.slug,
      locale,
    }));
};

export const generateMetadata = async ({ params }: PageParams) => {
  const page = await MDX.Page.findBySlug(params.page_slug, params.locale);
  const defaultMeta = await getMeta(params.locale);

  return match(page)
    .with(Option.P.Some(P.select()), (page) => {
      const url = `${ORIGIN}${MDX.generateHref(page.slug, params.locale, "Page")}`;

      return {
        title: `${page.title} - Bireme Lab`,
        description: page.seo.description,
        alternates: {
          canonical: url,
          languages: page.alternates,
          types: defaultMeta.alternates!.types,
        },
        twitter: {
          ...defaultMeta.twitter,
          title: page.seo.title,
          description: page.seo.description,
        },
        openGraph: {
          ...defaultMeta.openGraph,
          title: page.seo.title,
          description: page.seo.description,
          url,
        },
      };
    })
    .otherwise(() => ({}));
};

const Page = async ({ params }: PageParams) => {
  unstable_setRequestLocale(params.locale);

  const t = await getTranslations("pages.Page");
  const page = await MDX.findPageBySlugOrNotFound(params.page_slug, params.locale);

  const breadcrumbSteps: Step[] = [
    {
      label: t("breadcrumb.homepage"),
      href: "/",
      path: "",
    },
    {
      label: page.title,
      href: {
        pathname: "/[page_slug]",
        params: {
          page_slug: params.page_slug,
        },
      },
      path: MDX.generateHref(page.slug, params.locale, "Page"),
    },
  ];

  const isBodyBeginWithHeading = page.body.startsWith("#");
  const pageUrl = `${ORIGIN}${MDX.generateHref(page.slug, params.locale, "Post")}`;

  return (
    <>
      <Container>
        <Breadcrumb steps={breadcrumbSteps} />
        <div className={styles.container}>
          <Grid className={styles.grid}>
            <div className={styles.side} />
            <div className={cx(styles.body, styles.heroContent)}>
              <Text markup="h1" variant="title1">
                {page.title}
              </Text>
            </div>
          </Grid>
          <Divider />
          <Grid className={styles.grid}>
            <div className={styles.side}>
              <TableOfContent headings={page.headings} />
            </div>
            <div
              className={cx(
                styles.body,
                styles.postBodyWrapper,
                isBodyBeginWithHeading && styles.bodyBeginWithHeading,
              )}
            >
              <CustomMDX source={page.body} />
            </div>
          </Grid>
        </div>
      </Container>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Bireme Lab",
            url: pageUrl,
            logo: "https://bireme.io/images/logo.png",
            publisher: {
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
            },
            sameAs: ["https://twitter.com/biremelab"],
          } as WithContext<WebPage>),
        }}
      />
    </>
  );
};

export default Page;
