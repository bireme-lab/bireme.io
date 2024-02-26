"use client";

import * as MDX from "@/utils/mdx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { PublishedAt } from "../PublishedAt/PublishedAt";
import { Text } from "../Text/Text";
import * as styles from "./PostRow.css";

type Props = {
  post: MDX.Post;
  isFirstIndex: boolean;
  isLastIndex: boolean;
};

export const PostRow: React.FC<Props> = ({ post, isFirstIndex, isLastIndex }) => {
  const t = useTranslations("components.PostRow");
  const { isHovered, hoverProps } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing({});

  return (
    <li key={post.slug} className={styles.postRow({ isFirst: isFirstIndex })}>
      <Link
        href={post.href}
        className={styles.post({ isHovered, isFocused: isFocusVisible })}
        {...mergeProps(hoverProps, focusProps)}
      >
        <Text
          variant="anchor"
          className={styles.postRowTitle({ isHovered, isFocused: isFocusVisible })}
        >
          {post.title}
        </Text>
        <PublishedAt
          authors={post.authors}
          publishedAt={post.publishedAt}
          className={styles.postRowPublishedAt({ isHovered, isFocused: isFocusVisible })}
        />
        {isLastIndex && (
          <Text
            variant="comment"
            className={styles.postRowComment({ isHovered, isFocused: isFocusVisible })}
          >
            {t("first_one")}
          </Text>
        )}
      </Link>
    </li>
  );
};

PostRow.displayName = "PostRow";
