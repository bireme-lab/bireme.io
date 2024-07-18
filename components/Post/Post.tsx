import { Text } from "@/components/Text/Text";
import { cx } from "@/styles/mixins";
import * as MDX from "@/utils/mdx";
import Link from "next/link";
import { PublishedAt } from "../PublishedAt/PublishedAt";
import * as styles from "./Post.css";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  post: MDX.Post;
};

export const Post: React.FC<Props> = ({ className, style, post }) => {
  return (
    <Link href={post.href} className={cx(styles.container, className)} style={style}>
      <Text variant="body" color="white-a100">
        {post.title}
      </Text>
      <Text variant="body">{post.seo.description}</Text>
      <PublishedAt authors={post.authors} publishedAt={post.publishedAt} />
    </Link>
  );
};

Post.displayName = "Post";
