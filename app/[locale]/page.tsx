import { Container } from "@/components/Container/Container";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { Text } from "@/components/Text/Text";
import { sortDateDesc } from "@/utils/date";
import { Locale } from "@/utils/i18n";
import { P_hasRecord } from "@/utils/types";
import { Option } from "@swan-io/boxed";
import { getLatestPost, getPostsByLocale } from "contentlayer/fetchers";
import { Post } from "contentlayer/generated";
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
  post: Post;
};

const LatestPost: React.FC<LatestPostProps> = ({ post }) => {
  return (
    <div className={styles.latestPost}>
      <div>
        <Text
          variant="title2"
          href={post.url}
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

type PostRowProps = {
  post: Post;
  isFirstIndex: boolean;
  isLastIndex: boolean;
};

const PostRow: React.FC<PostRowProps> = async ({ post, isFirstIndex, isLastIndex }) => {
  const t = await getTranslations("components.PostRow");

  return (
    <li key={post.slug} className={styles.postRow({ isFirst: isFirstIndex })}>
      <Link href={post.url} className={styles.post}>
        <Text variant="anchor" className={styles.postRowTitle}>
          {post.title}
        </Text>
        <PublishedAt
          authors={post.authors}
          publishedAt={post.publishedAt}
          className={styles.postRowPublishedAt}
        />
        {isLastIndex && (
          <Text variant="comment" className={styles.postRowComment}>
            {t("first_one")}
          </Text>
        )}
      </Link>
    </li>
  );
};

PostRow.displayName = "PostRow";

const Home = async ({
  params: { locale },
}: Readonly<{
  params: { locale: Locale };
}>) => {
  // https://next-intl-docs.vercel.app/docs/getting-started/app-router#add-unstable_setrequestlocale-to-all-layouts-and-pages
  unstable_setRequestLocale(locale);

  const t = await getTranslations("pages.Home");
  const postOptions = getPostsByLocale(locale);
  const latestPost = getLatestPost(locale);

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
      {match(latestPost)
        .with(Option.Some(P.select()), (post) => (
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
              <LatestPost post={post} />
            </Grid>
          </div>
        ))
        .otherwise(() => null)}
      <div className={styles.allPostsWrapper}>
        <Text variant="section-heading" markup="h3" className={styles.allPostsSectionHeading}>
          {t("all_posts")}
        </Text>
        {match(postOptions)
          .with(Option.Some(P.select(P_hasRecord)), (posts) => {
            const postsLength = posts.length;
            return (
              <ul className={styles.postsList}>
                {posts
                  .sort((a, b) => sortDateDesc(a.publishedAt, b.publishedAt))
                  .map((post, index) => (
                    <PostRow
                      key={post._id}
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
