import "server-only";

import { cx } from "@/styles/mixins";
import { getMDXComponent } from "next-contentlayer/hooks";
import { getTranslations } from "next-intl/server";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { P, match } from "ts-pattern";
import { Icon } from "../Icon/Icon";
import { Text, type HeadingElementType } from "../Text/Text";
import * as styles from "./MDXContent.css";

type MDXHeadingProps = {
  MDXProps: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
  markup: HeadingElementType;
};

const MDXHeading: React.FC<MDXHeadingProps> = async ({
  MDXProps: { color, children, className, ...MDXProps },
  markup,
}) => {
  const t = await getTranslations("components.MDXHeading");

  if (markup === "h1") {
    throw new Error("h1 is not allowed in MDX.");
  }

  return match([MDXProps.id, markup])
    .with([P.string, "h2"], ({ 0: id, 1: markup }) => (
      <Text markup={markup} className={cx(styles.heading, className)} {...MDXProps}>
        <Text
          href={`#${id}`}
          variant="title2"
          color="primary-500"
          underlined={false}
          style={{ display: "inline-flex" }}
          className={styles.headingLink}
        >
          {children}
          <Icon name="link" title={t("link_to", { id })} className={styles.headingLinkIcon} />
        </Text>
      </Text>
    ))
    .with([P.nullish, "h2"], ({ 1: markup }) => (
      <Text
        variant="title2"
        markup={markup}
        className={cx(styles.heading, className)}
        color="primary-500"
        {...MDXProps}
      >
        {children}
      </Text>
    ))
    .with([P.string, "h3"], ({ 0: id, 1: markup }) => (
      <Text markup={markup} className={cx(styles.heading, className)} {...MDXProps}>
        <Text
          href={`#${id}`}
          variant="title3"
          color="primary-500"
          underlined={false}
          style={{ display: "inline-flex" }}
          className={styles.headingLink}
        >
          {children}
          <Icon name="link" title={t("link_to", { id })} className={styles.headingLinkIcon} />
        </Text>
      </Text>
    ))
    .with([P.nullish, "h3"], () => (
      <Text
        variant="title3"
        markup="h3"
        color="primary-500"
        className={cx(styles.heading, className)}
        {...MDXProps}
      >
        {children}
      </Text>
    ))
    .with([P.string, "h4"], ({ 0: id, 1: markup }) => (
      <Text markup={markup} className={cx(styles.heading, className)} {...MDXProps}>
        <Text
          href={`#${id}`}
          variant="body"
          color="primary-500"
          underlined={false}
          style={{ display: "inline-flex" }}
          className={styles.headingLink}
        >
          {children}
          <Icon name="link" title={t("link_to", { id })} className={styles.headingLinkIcon} />
        </Text>
      </Text>
    ))
    .with([P.nullish, "h4"], () => (
      <Text
        variant="body"
        markup="h4"
        color="primary-500"
        className={cx(styles.heading, className)}
        {...MDXProps}
      >
        {children}
      </Text>
    ))
    .with([P.string, "h5"], ({ 0: id, 1: markup }) => (
      <Text markup={markup} className={cx(styles.heading, className)} {...MDXProps}>
        <Text
          href={`#${id}`}
          variant="body"
          color="primary-500"
          underlined={false}
          style={{ display: "inline-flex" }}
          className={styles.headingLink}
        >
          {children}
          <Icon name="link" title={t("link_to", { id })} className={styles.headingLinkIcon} />
        </Text>
      </Text>
    ))
    .with([P.nullish, "h5"], () => (
      <Text
        variant="body"
        markup="h5"
        color="primary-500"
        className={cx(styles.heading, className)}
        {...MDXProps}
      >
        {children}
      </Text>
    ))
    .with([P.string, "h6"], ({ 0: id, 1: markup }) => (
      <Text markup={markup} className={cx(styles.heading, className)} {...MDXProps}>
        <Text
          href={`#${id}`}
          variant="body"
          color="primary-500"
          underlined={false}
          style={{ display: "inline-flex" }}
          className={styles.headingLink}
        >
          {children}
          <Icon name="link" title={t("link_to", { id })} className={styles.headingLinkIcon} />
        </Text>
      </Text>
    ))
    .with([P.nullish, "h6"], () => (
      <Text
        variant="body"
        markup="h6"
        color="primary-500"
        className={cx(styles.heading, className)}
        {...MDXProps}
      >
        {children}
      </Text>
    ))
    .exhaustive();
};

type Props = {
  code: string;
};

export const MDXContent: React.FC<Props> = ({ code }) => {
  const MDXContent = getMDXComponent(code);

  return (
    <MDXContent
      components={{
        h1: (props) => <MDXHeading markup="h1" MDXProps={props} />,
        h2: (props) => <MDXHeading markup="h2" MDXProps={props} />,
        h3: (props) => <MDXHeading markup="h3" MDXProps={props} />,
        h4: (props) => <MDXHeading markup="h4" MDXProps={props} />,
        h5: (props) => <MDXHeading markup="h5" MDXProps={props} />,
        h6: (props) => <MDXHeading markup="h6" MDXProps={props} />,
        p: (props) => <Text variant="body" markup="p" {...props} color="primary-600" />,
        ol: (props) => <ol className={styles.list} {...props} />,
        ul: (props) => <ul className={styles.list} {...props} />,
        li: (props) => <li className={styles.listItem} {...props} />,
        strong: (props) => <Text variant="body" markup="strong" {...props} color="primary-500" />,
        b: (props) => <Text variant="body" markup="strong" {...props} color="primary-500" />,
        em: (props) => <Text variant="body" markup="em" {...props} color="primary-600" />,
        s: (props) => <Text variant="body" markup="s" {...props} color="primary-600" />,
        small: (props) => <Text variant="small" markup="small" {...props} color="primary-600" />,
        figcaption: (props) => (
          <Text variant="small" markup="small" {...props} color="primary-700" />
        ),
      }}
    />
  );
};

MDXContent.displayName = "MDXContent";
