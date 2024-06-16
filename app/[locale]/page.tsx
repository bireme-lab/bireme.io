import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { IconName } from "@/components/Icon/Icon.types";
import { NewsletterSection } from "@/components/NewsletterSection/NewsletterSection";
import { Post } from "@/components/Post/Post";
import { Section } from "@/components/Section/Section";
import { Text } from "@/components/Text/Text";
import { Link } from "@/navigation";
import { Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { WebPage, WebSite, WithContext } from "schema-dts";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

type ProductCardProps = {
  icon: IconName;
  productName: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ icon, productName }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardName}>
        <Icon name={icon} title={productName} className={styles.productCardIcon} />
      </div>
    </div>
  );
};

type HeroProps = {
  locale: Locale;
};

const Hero: React.FC<HeroProps> = async ({ locale }) => {
  const t = await getTranslations("pages.Home");

  const slug = match(locale)
    .with("fr", () => "a-propos-de-bireme-lab")
    .with("en", () => "about-bireme-lab")
    .exhaustive();

  return (
    <div className={styles.hero}>
      <Link
        href={{
          pathname: "/blog/[post_slug]",
          params: { post_slug: slug },
        }}
        className={styles.newsBanner}
      >
        <Text variant="small-mono" color="primary-500" className={styles.newsBannerTag}>
          {t("new")}
        </Text>
        <Text variant="small" color="white-a100">
          {t("news_banner")}
        </Text>
      </Link>
      <Grid className={styles.heroGrid}>
        <div className={styles.titleDummy} />
        <div className={styles.titleWrapper}>
          <Text variant="gradientTitle" markup="h1" className={styles.title}>
            <span className={styles.titleSpan}>{t("title")}</span>
          </Text>
        </div>
        <div className={styles.titleDummy} />
        <div className={styles.descriptionDummy} />
        <div className={styles.descriptionWrapper}>
          <Text variant="body" markup="p" color="neutral-100" className={styles.description}>
            {t("description")}
          </Text>
        </div>
        <div className={styles.descriptionDummy} />
      </Grid>
      <Grid className={styles.productCards}>
        <div className={styles.productCardDummy} />
        <ProductCard icon="dedale" productName="Dédale" />
        <ProductCard icon="hermes" productName="Hermes" />
        <div className={styles.productCardDummy} />
      </Grid>
    </div>
  );
};

Hero.displayName = "Hero";

const Home = async ({
  params: { locale },
}: Readonly<{
  params: { locale: Locale };
}>) => {
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale);

  const t = await getTranslations("pages.Home");

  const postsOption = await MDX.Post.all(locale);

  return (
    <>
      <div className={styles.container}>
        <Hero locale={locale} />
        <Section>
          <Grid>
            <div className={styles.allPostDummy} />
            <div className={styles.allPostContainer}>
              <Text markup="h2" variant="title1" color="white-a100">
                {t("all_posts")}
              </Text>
              <Text markup="p" variant="body" className={styles.centeredText}>
                {t("all_posts_subtitle")}
              </Text>
            </div>
            <div className={styles.allPostDummy} />
          </Grid>
          <Grid>
            <div className={styles.postsDummy} />
            {match(postsOption)
              .with(Option.Some(P.select()), (posts) => (
                <ul className={styles.posts}>
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Post post={post} />
                    </li>
                  ))}
                </ul>
              ))
              .otherwise(() => (
                <Text variant="body">{t("no_posts")}</Text>
              ))}
            <div className={styles.postsDummy} />
          </Grid>
        </Section>
        <NewsletterSection />
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Bireme Lab",
            url: ORIGIN,
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
              sameAs: ["https://twitter.com/biremelab"],
            },
            sameAs: ["https://twitter.com/biremelab"],
          } as WithContext<WebSite>),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Bireme Lab",
            url: `${ORIGIN}/${locale}`,
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
              sameAs: ["https://twitter.com/biremelab"],
            },
            sameAs: ["https://twitter.com/biremelab"],
          } as WithContext<WebPage>),
        }}
      />
    </>
  );
};

export default Home;
