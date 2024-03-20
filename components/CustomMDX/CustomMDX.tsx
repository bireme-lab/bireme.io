import "server-only";

import { cx } from "@/styles/mixins";
import { getTranslations } from "next-intl/server";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { ImageProps } from "next/image";
import Link from "next/link";
import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { P, match } from "ts-pattern";
import { Divider } from "../Divider/Divider";
import { Icon } from "../Icon/Icon";
import { Image as ImageComponent, LocalPublicImage } from "../Image/Image";
import { data } from "../Image/data";
import { NewsletterTrigger } from "../NewsletterTrigger/NewsletterTrigger";
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
        color="neutral-50"
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
        style={{ display: "inline" }}
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

type CalloutProps = PropsWithChildren<{
  emoji: string;
}>;

const Callout: React.FC<CalloutProps> = (props) => {
  return (
    <div className={styles.callout}>
      <div className={styles.calloutEmoji}>{props.emoji}</div>
      <blockquote className={styles.calloutChildrenContainer}>{props.children}</blockquote>
    </div>
  );
};

Callout.displayName = "Callout";

const Blockquote: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.blockquote}>
      <blockquote className={styles.calloutChildrenContainer}>{children}</blockquote>
    </div>
  );
};

Blockquote.displayName = "Blockquote";

const PreTitle: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div className={styles.preTitle}>
      <Text variant="small" markup="figcaption" color="neutral-50" {...props}>
        {children}
      </Text>
    </div>
  );
};

PreTitle.displayName = "PreTitle";

const Image: React.FC<
  PropsWithChildren<{ src: string; alt: string; title: string } & Exclude<ImageProps, "src">>
> = ({ children, src, alt, title, placeholder, ...props }) => {
  if (!data[src as keyof typeof data]) {
    throw new Error(`Image not found: ${src}`);
  }

  if (!alt) {
    throw new Error(`Alt missing: ${src}`);
  }

  return (
    <div className={styles.img}>
      <ImageComponent src={src as keyof typeof data} alt={alt} title={title ?? alt} {...props} />
    </div>
  );
};

Image.displayName = "Image";

export const CustomMDX: React.FC<MDXRemoteProps> = async (props) => {
  const components: MDXRemoteProps["components"] = {
    h1: (props) => <MDXHeading level={1} {...props} />,
    h2: (props) => <MDXHeading level={2} {...props} />,
    h3: (props) => <MDXHeading level={3} {...props} />,
    h4: (props) => <MDXHeading level={4} {...props} />,
    h5: (props) => <MDXHeading level={5} {...props} />,
    h6: (props) => <MDXHeading level={6} {...props} />,
    p: (props) => (
      <Text variant="body" markup="p" {...props} className={styles.paragraph} color="neutral-200" />
    ),
    a: ({ color, ...props }) =>
      match(props)
        .with({ href: P.string }, (props) => (
          <Link
            href={props.href}
            className={styles.link}
            title={props.title}
            target={props.target}
            rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
          >
            {props.children}
          </Link>
        ))
        .otherwise(() => null),
    ol: (props) => <ol className={styles.list} {...props} />,
    ul: (props) => <ul className={styles.list} {...props} />,
    li: (props) => <li className={styles.listItem} {...props} />,
    strong: (props) => <Text variant="body" markup="strong" {...props} color="neutral-200" />,
    b: (props) => <Text variant="body" markup="strong" {...props} color="neutral-200" />,
    em: (props) => <Text variant="body" markup="em" {...props} color="neutral-200" />,
    s: (props) => <Text variant="body" markup="s" {...props} color="neutral-200" />,
    small: (props) => <Text variant="small" markup="small" {...props} color="neutral-200" />,
    code: (props) => <code className={styles.code} {...props} />,
    figcaption: (props) => {
      if (Object.defineProperty(props, "data-rehype-pretty-code-title", { value: "" })) {
        return <PreTitle {...props} />;
      }
      return <Text variant="small" markup="figcaption" {...props} color="neutral-200" />;
    },
    pre: (props) => <pre className={styles.pre} {...props} />,
    img: ({ src, alt, title, width, height, ...props }) => {
      if (!data[src as keyof typeof data]) {
        throw new Error(`Image not found: ${src}`);
      }

      if (!alt) {
        throw new Error(`Alt missing: ${src}`);
      }

      return (
        <div className={styles.img}>
          <ImageComponent
            src={src as LocalPublicImage}
            alt={alt}
            title={title ?? alt}
            width={1024}
            height={512}
            style={{
              objectFit: "cover",
            }}
            sizes="(min-width: 768px) 1024px, 512px"
            {...props}
          />
        </div>
      );
    },
    table: (props) => (
      <div className={styles.tableContainer}>
        <table className={styles.table} {...props} />
      </div>
    ),
    hr: Divider,
    Callout,
    blockquote: Blockquote,
    NewsletterTrigger,
    Image,
  };

  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              // @ts-expect-error pain in the ass for types with plugins
              rehypePrettyCode,
              {
                theme: "vesper",
                keepBackground: false,
              } as RehypePrettyCodeOptions,
            ],
          ],
          ...props.options?.mdxOptions,
        },
        ...props.options,
      }}
    />
  );
};

CustomMDX.displayName = "CustomMDX";
