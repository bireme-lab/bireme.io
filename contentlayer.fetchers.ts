import { Array, Option } from "@swan-io/boxed";
import { DocumentTypes, allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { P, match } from "ts-pattern";
import { sortDateDesc } from "./utils/date";
import { Locale } from "./utils/i18n";

type FindFn = (slug: string) => Option<DocumentTypes>;

export const findPostBySlug: FindFn = (slug: string) => {
  return Array.find(allPosts, (post) => post.slug === slug);
};

export const getLatestPost = (locale: Locale) => {
  return Option.Some(
    allPosts
      .filter((post) => post.locale === locale)
      .sort((a, b) => sortDateDesc(a.publishedAt, b.publishedAt))[0],
  );
};

export const getPostsBySlugs = (slugs: string[]) => {
  return Option.Some(allPosts.filter((post) => slugs.includes(post.slug)));
};

export const getPostsByLocale = (locale: Locale) => {
  return Option.Some(allPosts.filter((post) => post.locale === locale));
};

export const findRecordOrNotFound =
  (fn: FindFn) =>
  (slug: string): DocumentTypes | never => {
    return match(fn(slug))
      .with(Option.P.Some(P.select(P.when((record) => record.type === "Post"))), (post) => post)
      .otherwise(() => notFound());
  };
