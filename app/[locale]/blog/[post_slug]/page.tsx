import { Breadcrumb, Step } from "@/components/Breadcrumb/Breadcrumb";
import { Container } from "@/components/Container/Container";
import { CustomMDX } from "@/components/CustomMDX/CustomMDX";
import { Divider } from "@/components/Divider/Divider";
import { Grid } from "@/components/Grid/Grid";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { TableOfContent } from "@/components/TableOfContent/TableOfContent";
import { Text } from "@/components/Text/Text";
import { authors } from "@/content/authors";
import { getMeta } from "@/content/meta";
import { cx } from "@/styles/mixins";
import { Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

type PostPageParams = {
  params: {
    post_slug: string;
    locale: Locale;
  };
};

export const generateStaticParams = async ({ params }: PostPageParams) => {
  return match(await MDX.Post.all(params.locale))
    .with(Option.P.Some(P.select()), (posts) => posts.map((post) => post.slug))
    .otherwise(() => []);
};

export const generateMetadata = async ({ params }: PostPageParams): Promise<Metadata> => {
  const post = await MDX.Post.findBySlug(params.post_slug, params.locale);
  const meta = await getMeta(params.locale);

  return match(post)
    .with(Option.P.Some(P.select()), (post) => {
      const url = `${ORIGIN}${MDX.generateHref(post.slug, params.locale, "Post")}`;

      return {
        title: post.seo.title,
        description: post.seo.description,
        alternates: {
          canonical: url,
          languages: post.alternates,
        },
        twitter: {
          ...meta.twitter,
          title: post.seo.title,
          description: post.seo.description,
        },
        openGraph: {
          ...meta.openGraph,
          title: post.seo.title,
          description: post.seo.description,
          url,
        },
        authors: post.authors.map((author) => ({
          name: authors[author].fullName,
          url: authors[author].twitterProfileUrl,
        })),
      } as Metadata;
    })
    .otherwise(() => {
      throw new Error(`Post not found for slug: ${params.post_slug}`);
    });
};

const PostPage = async ({ params }: PostPageParams) => {
  unstable_setRequestLocale(params.locale);

  const t = await getTranslations("pages.PostPage");

  const post = await MDX.findPostBySlugOrNotFound(params.post_slug, params.locale);
  const isBodyStartingWithHeading = post.body.slice(0, 20).startsWith("##");

  const breadcrumbSteps: Step[] = [
    {
      label: t("breadcrumb.homepage"),
      href: "/",
    },
    {
      label: post.title,
      href: MDX.generateHref(post.slug, params.locale, "Post"),
    },
  ];

  return (
    <Container>
      <Breadcrumb steps={breadcrumbSteps} />
      <article className={styles.article}>
        <Text variant="title1" markup="h1">
          {post.title}
        </Text>
        <div className={styles.heroContent}>
          <PublishedAt
            authors={post.authors}
            publishedAt={post.publishedAt}
            disableTooltips={false}
          />
          <Text variant="body" markup="p" color="primary-600">
            {post.seo.description}
          </Text>
        </div>
        <Divider />
        <Grid className={styles.grid}>
          <div className={styles.threeCols}>
            <TableOfContent headings={post.headings} />
          </div>
          <div
            className={cx(styles.fiveCols, styles.postBodyWrapper({ isBodyStartingWithHeading }))}
          >
            <CustomMDX source={post.body} />
          </div>
        </Grid>
      </article>
    </Container>
  );
};

export default PostPage;
