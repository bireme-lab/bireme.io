import { Link } from "@/navigation";
import * as MDX from "@/utils/mdx";
import { PublishedAt } from "../PublishedAt/PublishedAt";
import { Text } from "../Text/Text";
import * as styles from "./LatestPost.css";

type Props = {
  post: MDX.Post;
};

export const LatestPost: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.latestPost}>
      <div>
        <Link
          href={{
            pathname: "/blog/[post_slug]",
            params: { post_slug: post.slug },
          }}
          className={styles.latestPostTitle}
        >
          {post.title}
        </Link>
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
