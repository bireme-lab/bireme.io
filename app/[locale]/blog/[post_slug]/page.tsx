import { Container } from "@/components/Container/Container";
import { Divider } from "@/components/Divider/Divider";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { MDXContent } from "@/components/MDXContent/MDXContent";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { TableOfContent } from "@/components/TableOfContent/TableOfContent";
import { Text } from "@/components/Text/Text";
import { cx } from "@/styles/mixins";
import { Option } from "@swan-io/boxed";
import { findPostBySlug, findRecordOrNotFound } from "contentlayer/fetchers";
import { allPosts } from "contentlayer/generated";
import { getTranslations } from "next-intl/server";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: { params: { post_slug: string; locale: string } }) => {
  const post = findPostBySlug(params.post_slug, params.locale);

  return match(post)
    .with(Option.P.Some(P.select(P.when((record) => record.type === "Post"))), (post) => ({
      title: post.title,
    }))
    .otherwise(() => {
      throw new Error(`Post not found for slug: ${params.post_slug}`);
    });
};

const PostPage = async ({ params }: { params: { post_slug: string; locale: string } }) => {
  const t = await getTranslations("pages.PostPage");
  const post = findRecordOrNotFound(findPostBySlug)(params.post_slug, params.locale);

  const isBodyStartingWithHeading = post.body.raw.slice(0, 20).trim().startsWith("##");

  return (
    <Container>
      <div className={styles.goBack}>
        <Icon name="arrow_left" title={t("go_back")} className={styles.goBackIcon} />
        <Text href="/" variant="anchor-flat" color="primary-700" translateOnHover>
          {t("go_back")}
        </Text>
      </div>
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
        <Grid>
          <div className={styles.threeCols}>
            <TableOfContent headings={post.headings} />
          </div>
          <div
            className={cx(styles.fiveCols, styles.postBodyWrapper({ isBodyStartingWithHeading }))}
          >
            <MDXContent code={post.body.code} />
          </div>
        </Grid>
      </article>
    </Container>
  );
};

export default PostPage;
