import { Container } from "@/components/Container/Container";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { Text } from "@/components/Text/Text";
import { sortDateDesc } from "@/utils/date";
import { Locale } from "@/utils/i18n";
import { P_hasRecord } from "@/utils/types";
import { Option } from "@swan-io/boxed";
import { getLatestPost, getPostsByLocale } from "contentlayer/fetchers";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { P, match } from "ts-pattern";
import LatestPost from "./LatestPost";
import { NewsBanner } from "./NewsBanner";
import { PostRow } from "./PostsRow";
import * as styles from "./page.css";

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
