import { Container } from "@/components/Container/Container";
import { Divider } from "@/components/Divider/Divider";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { Text } from "@/components/Text/Text";
import { Option } from "@swan-io/boxed";
import { findPostBySlug, findRecordOrNotFound } from "contentlayer/fetchers";
import { allPosts } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { getTranslations } from "next-intl/server";
import { P, match } from "ts-pattern";
import { TableOfContent } from "./TableOfContent";
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
  const MDXContent = getMDXComponent(post.body.code);

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
          <PublishedAt authors={post.authors} publishedAt={post.publishedAt} />
          <Text variant="body" markup="p" color="primary-600">
            {post.seo.description}
          </Text>
        </div>
        <Divider />
        <Grid>
          <div className={styles.threeCols}>
            <TableOfContent />
          </div>
          <div className={styles.fiveCols}>
            <MDXContent
              components={{
                h1: () => {
                  throw new Error("h1 is not allowed in MDX. Use h2 instead.");
                },
                h2: (props) => <Text variant="title2" markup="h2" {...props} color="primary-500" />,
                h3: (props) => <Text variant="title3" markup="h3" {...props} color="primary-500" />,
                h4: (props) => (
                  <Text variant="section-heading" markup="h4" {...props} color="primary-500" />
                ),
                h5: () => {
                  throw new Error("No styling for h5 is defined.");
                },
                h6: () => {
                  throw new Error("No styling for h5 is defined.");
                },
                p: (props) => <Text variant="body" markup="p" {...props} color="primary-600" />,
                span: (props) => <Text variant="body" {...props} color="primary-600" />,
                ol: (props) => <ol className={styles.list} {...props} />,
                ul: (props) => <ul className={styles.list} {...props} />,
                li: (props) => <li className={styles.listItem} {...props} />,
                strong: (props) => (
                  <Text variant="body" markup="strong" {...props} color="primary-500" />
                ),
                b: (props) => (
                  <Text variant="body" markup="strong" {...props} color="primary-500" />
                ),
                em: (props) => <Text variant="body" markup="em" {...props} color="primary-600" />,
                s: (props) => <Text variant="body" markup="s" {...props} color="primary-600" />,
                small: (props) => (
                  <Text variant="small" markup="small" {...props} color="primary-600" />
                ),
                figcaption: (props) => (
                  <Text variant="small" markup="small" {...props} color="primary-700" />
                ),
              }}
            />
          </div>
        </Grid>
      </article>
    </Container>
  );
};

export default PostPage;
