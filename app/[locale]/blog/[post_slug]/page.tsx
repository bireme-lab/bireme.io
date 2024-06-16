import { Breadcrumb, Step } from "@/components/Breadcrumb/Breadcrumb";
import { CustomMDX } from "@/components/CustomMDX/CustomMDX";
import { Grid } from "@/components/Grid/Grid";
import { NewsletterSection } from "@/components/NewsletterSection/NewsletterSection";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { Section } from "@/components/Section/Section";
import { TableOfContent } from "@/components/TableOfContent/TableOfContent";
import { Text } from "@/components/Text/Text";
import { authors } from "@/content/authors";
import { getMeta } from "@/content/meta";
import { cx } from "@/styles/mixins";
import { formatDateForSitemap } from "@/utils/date";
import { Locale, i18n } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { BlogPosting, WebPage, WithContext } from "schema-dts";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

type PostPageParams = {
  params: {
    post_slug: string;
    locale: Locale;
  };
};

export const generateStaticParams = async () => {
  const posts = await i18n.locales.reduce<Promise<{ locale: Locale; post: MDX.Post }[]>>(
    async (accPromise, locale) => {
      const postsOption = await MDX.Post.all(locale);
      const acc = await accPromise;

      if (postsOption.isSome()) {
        const posts = postsOption.get();
        const formattedPosts = posts.map((post) => ({ locale, post }));

        return [...acc, ...formattedPosts];
      }

      return acc;
    },
    Promise.resolve([]),
  );

  if (posts.length === 0) {
    return [];
  }

  return posts.map(({ post, locale }) => ({
    post_slug: post.slug,
    locale,
  }));
};

export const generateMetadata = async ({ params }: PostPageParams): Promise<Metadata> => {
  const post = await MDX.Post.findBySlug(params.post_slug, params.locale);
  const defaultMeta = await getMeta(params.locale);

  return match(post)
    .with(Option.P.Some(P.select()), (post) => {
      const url = `${ORIGIN}${MDX.generateHref(post.slug, params.locale, "Post")}`;

      return {
        title: `${post.seo.title} - Bireme Lab`,
        description: post.seo.description,
        alternates: {
          canonical: url,
          languages: post.alternates,
          types: defaultMeta.alternates!.types,
        },
        twitter: {
          ...defaultMeta.twitter,
          title: post.seo.title,
          description: post.seo.description,
        },
        openGraph: {
          ...defaultMeta.openGraph,
          title: post.seo.title,
          description: post.seo.description,
          url,
        },
        authors: post.authors.map((author) => ({
          name: authors[author].fullName,
          url: authors[author].twitterProfileUrl,
        })),
      };
    })
    .otherwise(() => ({}));
};

const PostPage = async ({ params }: PostPageParams) => {
  unstable_setRequestLocale(params.locale);
  const post = await MDX.findPostBySlugOrNotFound(params.post_slug, params.locale);

  const t = await getTranslations("pages.PostPage");

  const breadcrumbSteps: Step[] = [
    {
      label: t("breadcrumb.homepage"),
      href: "/",
      path: "",
    },
    {
      label: post.title,
      href: {
        pathname: "/blog/[post_slug]",
        params: {
          post_slug: post.slug,
        },
      },
      path: MDX.generateHref(post.slug, params.locale, "Post"),
    },
  ];

  const postUrl = `${ORIGIN}${MDX.generateHref(post.slug, params.locale, "Post")}`;

  return (
    <>
      <Section>
        <Grid>
          <div className={styles.dummy} />
          <div className={styles.breadcrumb}>
            <Breadcrumb steps={breadcrumbSteps} />
          </div>
          <div className={styles.dummy} />
        </Grid>
        <article className={styles.article}>
          <Grid>
            <div className={styles.dummy} />
            <div className={cx(styles.body, styles.heroContent)}>
              <Text variant="title1" markup="h1" color="white-a100">
                {post.title}
              </Text>
              <PublishedAt
                authors={post.authors}
                publishedAt={post.publishedAt}
                disableTooltips={false}
              />
              <Text variant="section-heading" color="white-a100">
                tl;dr&nbsp;
              </Text>
              <Text variant="body" markup="p" color="neutral-200">
                {post.tldr}
              </Text>
            </div>
            <div className={styles.dummy} />
          </Grid>
          <Grid>
            <div className={styles.dummy} />
            <div className={cx(styles.body, styles.postBodyWrapper)}>
              <TableOfContent headings={post.headings} />
              <CustomMDX source={post.body} />
            </div>
            <div className={styles.dummy} />
          </Grid>
        </article>
      </Section>
      <NewsletterSection />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Bireme Lab",
            url: postUrl,
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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            genre: "article",
            url: postUrl,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": postUrl,
            },
            datePublished: formatDateForSitemap(post.publishedAt),
            dateCreated: formatDateForSitemap(post.publishedAt),
            dateModified: post.modifiedAt ? formatDateForSitemap(post.modifiedAt) : undefined,
            description: post.seo.description,
            author: {
              "@type": "Person",
              name: authors[post.authors[0]].fullName,
              givenName: authors[post.authors[0]].firstName,
              familyName: authors[post.authors[0]].lastName,
              email: authors[post.authors[0]].email,
              sameAs: [authors[post.authors[0]].twitterProfileUrl],
              jobTitle: authors[post.authors[0]].position,
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Email",
                email: authors[post.authors[0]].email,
              },
            },
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
          } as WithContext<BlogPosting>),
        }}
      />
    </>
  );
};

export default PostPage;
