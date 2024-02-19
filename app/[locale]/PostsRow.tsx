"use client";

import type { Post } from "contentlayer/generated";
import Link from "next/link";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { PublishedAt } from "../../components/PublishedAt/PublishedAt";
import { Text } from "../../components/Text/Text";
import * as styles from "./PostsRow.css";

type Props = {
  post: Post;
  index: number;
};

export const PostRow: React.FC<Props> = ({ post, index }) => {
  const { isHovered, hoverProps } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing({});
  const isFirst = index === 0;

  return (
    <li key={post.slug}>
      <Link
        href={post.url}
        className={styles.post({ isFirst, isHovered, isFocused: isFocusVisible })}
        {...mergeProps(hoverProps, focusProps)}
      >
        <Text variant="anchor" className={styles.title({ isHovered, isFocused: isFocusVisible })}>
          {post.title}
        </Text>
        <PublishedAt
          authors={post.authors}
          publishedAt={post.publishedAt}
          className={styles.publishedAt({ isHovered, isFocused: isFocusVisible })}
        />
      </Link>
    </li>
  );
};

PostRow.displayName = "PostRow";
