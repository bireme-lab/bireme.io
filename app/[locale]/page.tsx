import { Container } from "@/components/Container/Container";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { PostRow } from "@/components/PostRow/PostRow";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { Text } from "@/components/Text/Text";
import { Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { P_hasRecord } from "@/utils/types";
import { Option } from "@swan-io/boxed";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

const NewsBanner = async () => {
  const t = await getTranslations("components.NewsBanner");

  return (
    <Link href="/" className={styles.newsBanner}>
      <Text variant="small-mono" color="secondary-500" className={styles.newsBannerTag}>
        {t("new")}
      </Text>
      <Text variant="anchor">Mise à jour - Création du projet Bireme Lab</Text>
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
    <Container className={styles.container}>
      <Grid>
        <NewsBanner />
      </Grid>
      <Grid>
        <div className={styles.titleWrapper}>
          <Text variant="title1" markup="h1">
            {t("title")}
          </Text>
        </div>
        <div className={styles.descriptionWrapper}>
          <Text variant="body" markup="p" color="primary-600">
            {t("description")}
          </Text>
        </div>
      </Grid>
      {match(postsOption)
        .with(Option.Some(P.select()), (posts) => (
          <div className={styles.latestPostWrapper}>
            <Text variant="section-heading" markup="h3" className={styles.latestPostSectionHeading}>
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
        <Text variant="section-heading" markup="h3" className={styles.allPostsSectionHeading}>
          {t("all_posts")}
        </Text>
        {match(postsOption)
          .with(Option.Some(P.select(P_hasRecord)), (posts) => {
            const postsLength = posts.length;
            posts.shift();

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
            <Text variant="body">No posts found</Text>
          ))}
      </div>
    </Container>
  );
};

export default Home;
