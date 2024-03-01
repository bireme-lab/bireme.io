import { Container } from "@/components/Container/Container";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { NewsletterTrigger } from "@/components/NewsletterTrigger/NewsletterTrigger";
import { PostRow } from "@/components/PostRow/PostRow";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { Text } from "@/components/Text/Text";
import { Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { WebPage, WebSite, WithContext } from "schema-dts";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

type NewsBannerProps = {
  locale: Locale;
};

const NewsBanner: React.FC<NewsBannerProps> = async ({ locale }) => {
  const t = await getTranslations("components.NewsBanner");

  const href = match(locale)
    .with("fr", () => MDX.generateHref("a-propos-de-bireme-lab", locale, "Post"))
    .with("en", () => MDX.generateHref("about-bireme-lab", locale, "Post"))
    .exhaustive();

  return (
    <Link href={href} className={styles.newsBanner}>
      <Text variant="small-mono" color="secondary-500" className={styles.newsBannerTag}>
        {t("new")}
      </Text>
      <Text variant="anchor">{t("text")}</Text>
    </Link>
  );
};

NewsBanner.displayName = "NewsBanner";

type LatestPostProps = {
  post: MDX.Post;
};

const LatestPost: React.FC<LatestPostProps> = ({ post }) => {
  return (
    <div className={styles.latestPost}>
      <div>
        <Text
          variant="title2"
          href={post.href}
          underlined={false}
          className={styles.latestPostTitle}
        >
          {post.title}
        </Text>
      </div>
      <Text variant="body" markup="p" color="primary-600">
        {post.seo.description}
      </Text>
      <PublishedAt
        authors={post.authors}
        publishedAt={post.publishedAt}
        className={styles.latestPostPublishedAt}
      />
    </div>
  );
};

LatestPost.displayName = "LatestPost";

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
      <Container className={styles.container}>
        <Grid>
          <NewsBanner locale={locale} />
        </Grid>
        <Grid>
          <div className={styles.titleWrapper}>
            <Text variant="title1" markup="h1">
              {t("title")}
            </Text>
            <div className={styles.learnMoreWrapper}>
              <Text
                href={match(locale)
                  .with("fr", () => MDX.generateHref("a-propos-de-bireme-lab", locale, "Post"))
                  .with("en", () => MDX.generateHref("about-bireme-lab", locale, "Post"))
                  .exhaustive()}
                variant="anchor"
                translateOnHover={true}
                className={styles.learnMore}
              >
                {t("learn_more")}
              </Text>
              <Icon name="arrow_right" title={t("learn_more")} className={styles.learnMoreIcon} />
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <Text variant="body" markup="p" color="primary-600">
              {t.rich("description", {
                NewsletterTrigger: (chunk) =>
                  chunk && <NewsletterTrigger key="home-description" content={chunk.toString()} />,
              })}
            </Text>
          </div>
        </Grid>
        {match(postsOption)
          .with(Option.Some(P.select()), (posts) => (
            <div className={styles.latestPostWrapper}>
              <Text
                variant="section-heading"
                markup="h2"
                className={styles.latestPostSectionHeading}
              >
                {t("latest_post")}
                <Icon
                  name="handwritten_underline"
                  title={t("latest_post")}
                  className={styles.handwrittenUnderline}
                />
              </Text>
              <Grid>
                <LatestPost post={posts[0]} />
              </Grid>
            </div>
          ))
          .otherwise(() => null)}
        <div className={styles.allPostsWrapper}>
          <Text variant="section-heading" markup="h2" className={styles.allPostsSectionHeading}>
            {t("all_posts")}
          </Text>
          {match(postsOption)
            .with(Option.Some(P.select(P.when((posts) => posts.length < 1))), (posts) => {
              posts.shift();
              const postsLength = posts.length;

              return (
                <ul className={styles.postsList}>
                  {posts.map((post, index) => (
                    <PostRow
                      key={post.slug}
                      post={post}
                      isFirstIndex={index === 0}
                      isLastIndex={index === postsLength - 1}
                    />
                  ))}
                </ul>
              );
            })
            .otherwise(() => (
              <Text variant="body">{t("no_posts")}</Text>
            ))}
        </div>
      </Container>
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
