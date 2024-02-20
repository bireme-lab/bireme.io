import { PublishedAt } from "@/components/PublishedAt/PublishedAt";
import { Text } from "@/components/Text/Text";
import { Post } from "contentlayer/generated";
import * as styles from "./LatestPost.css";

type Props = {
  post: Post;
};

export const LatestPost: React.FC<Props> = ({ post }) => {
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
        className={styles.publishedAt}
      />
    </div>
  );
};

LatestPost.displayName = "LatestPost";

export default LatestPost;
