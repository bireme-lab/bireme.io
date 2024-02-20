"use client";

import type { Post } from "contentlayer/generated";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { PublishedAt } from "../../components/PublishedAt/PublishedAt";
import { Text } from "../../components/Text/Text";
import * as styles from "./PostsRow.css";

type Props = {
  post: Post;
  isFirstIndex: boolean;
  isLastIndex: boolean;
};

export const PostRow: React.FC<Props> = ({ post, isFirstIndex, isLastIndex }) => {
  const { isHovered, hoverProps } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing({});
  const t = useTranslations("components.PostRow");

  return (
    <li key={post.slug}>
      <Link
        href={post.url}
        className={styles.post({ isFirst: isFirstIndex, isHovered, isFocused: isFocusVisible })}
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
        {isLastIndex && (
          <Text
            variant="comment"
            className={styles.comment({ isHovered, isFocused: isFocusVisible })}
          >
            {t("first_one")}
          </Text>
        )}
      </Link>
    </li>
  );
};

PostRow.displayName = "PostRow";
