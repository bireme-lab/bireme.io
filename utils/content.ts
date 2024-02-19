import type { Post } from "contentlayer/generated";
import { glob } from "glob";
import path from "path";
import slugify from "slugify";
import { P, match } from "ts-pattern";
import { P_hasRecord } from "./types";

export const POSTS_DIR = path.join(process.cwd(), "content/mdx/posts");
export const PAGES_DIR = path.join(process.cwd(), "content/mdx/pages");

const findRecordFile = async (id: string, location: string) => {
  const searchPattern = path.join(location, `${id}-*.mdx`);

  try {
    return glob(searchPattern);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error while searching for file: ${searchPattern}`, error);

    throw error;
  }
};

export const getRecordLocale = (post: Post) => {
  if (post._raw.flattenedPath.includes("/en/")) {
    return "en";
  }

  return "fr";
};

export const generatePostSlug = (post: Post) => {
  const locale = getRecordLocale(post);
  const postName = post._raw.sourceFileName.replace(".mdx", "").split("-").slice(1).join("-");

  return slugify(postName, { strict: true, lower: true, trim: true, locale });
};

export const generatePostUrl = (post: Post) => {
  const locale = getRecordLocale(post);
  const slug = generatePostSlug(post);

  return `/${locale}/blog/${slug}`;
};

const getAlternatePostUrl = async (id: string, locale: string) => {
  const files = await findRecordFile(id, `${POSTS_DIR}/${locale}`);

  return match(files)
    .with(P_hasRecord, (files) => {
      const postName = path.basename(files[0]).replace(".mdx", "").split("-").slice(1).join("-");
      return `/${locale}/blog/${slugify(postName, { strict: true, lower: true, trim: true, locale })}`;
    })
    .otherwise(() => undefined);
};

export const generateAlternates = async (hrefs: Record<"fr" | "en", string | undefined>) => {
  return match(hrefs)
    .with({ fr: P.string, en: P.string }, (alternates) => {
      return {
        ...alternates,
        "x-default": alternates.fr,
      };
    })
    .with({ fr: P.string, en: P.nullish }, (alternates) => {
      return {
        ...alternates,
        "x-default": alternates.fr,
      };
    })
    .with({ fr: P.nullish, en: P.string }, (alternates) => {
      return {
        ...alternates,
        "x-default": alternates.en,
      };
    })
    .otherwise((alternates) => {
      return {
        ...alternates,
        "x-default": undefined,
      };
    });
};

export const generatePostAlternates = async (post: Post) => {
  const locale = getRecordLocale(post);
  const id = post._raw.sourceFileName.split("-")[0];

  return generateAlternates({
    fr: locale === "fr" ? generatePostUrl(post) : await getAlternatePostUrl(id, "fr"),
    en: locale === "en" ? generatePostUrl(post) : await getAlternatePostUrl(id, "en"),
  });
};
