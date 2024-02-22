import "server-only";

import { cx } from "@/styles/mixins";
import { getTranslations } from "next-intl/server";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import rehypeSlug from "rehype-slug";
import { match } from "ts-pattern";
import { Icon } from "../Icon/Icon";
import { Text, type HeadingLevel } from "../Text/Text";
import * as styles from "./CustomMDX.css";

type MDXHeadingProps = {
  level: HeadingLevel;
} & DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

const MDXHeading: React.FC<MDXHeadingProps> = async ({ level, color, ...props }) => {
  const t = await getTranslations("components.MDXHeading");

  if (level === 1) {
    throw new Error("h1 is not allowed in MDX.");
  }

  const variant = match(level)
    .with(2, () => "title2" as const)
    .with(3, () => "title3" as const)
    .otherwise(() => "body" as const);

  if (!props.id) {
    return (
      <Text
        markup={`h${level}`}
        className={cx(styles.heading, props.className)}
        color="primary-500"
        {...props}
      >
        {props.children}
      </Text>
    );
  }

  return (
    <Text markup={`h${level}`} className={cx(styles.heading, props.className)} {...props}>
      <Text
        href={`#${props.id}`}
        variant={variant}
        color="primary-500"
        underlined={false}
        style={{ display: "inline-flex" }}
        className={styles.headingLink}
      >
        {props.children}
        <Icon
          name="link"
          title={t("link_to", { id: props.id })}
          className={styles.headingLinkIcon}
        />
      </Text>
    </Text>
  );
};

export const CustomMDX: React.FC<MDXRemoteProps> = (props) => {
  const components: MDXRemoteProps["components"] = {
    h1: (props) => <MDXHeading level={1} {...props} />,
    h2: (props) => <MDXHeading level={2} {...props} />,
    h3: (props) => <MDXHeading level={3} {...props} />,
    h4: (props) => <MDXHeading level={4} {...props} />,
    h5: (props) => <MDXHeading level={5} {...props} />,
    h6: (props) => <MDXHeading level={6} {...props} />,
    p: (props) => <Text variant="body" markup="p" {...props} color="primary-600" />,
    ol: (props) => <ol className={styles.list} {...props} />,
    ul: (props) => <ul className={styles.list} {...props} />,
    li: (props) => <li className={styles.listItem} {...props} />,
    strong: (props) => <Text variant="body" markup="strong" {...props} color="primary-500" />,
    b: (props) => <Text variant="body" markup="strong" {...props} color="primary-500" />,
    em: (props) => <Text variant="body" markup="em" {...props} color="primary-600" />,
    s: (props) => <Text variant="body" markup="s" {...props} color="primary-600" />,
    small: (props) => <Text variant="small" markup="small" {...props} color="primary-600" />,
    figcaption: (props) => <Text variant="small" markup="small" {...props} color="primary-700" />,
  };

  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
          ...props.options?.mdxOptions,
        },
        ...props.options,
      }}
    />
  );
};

CustomMDX.displayName = "CustomMDX";
