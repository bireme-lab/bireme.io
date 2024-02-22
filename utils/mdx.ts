import { slugifyWithCounter } from "@sindresorhus/slugify";
import { Option } from "@swan-io/boxed";
import fm from "front-matter";
import fs from "fs-extra";
import GithubSlugger from "github-slugger";
import { notFound } from "next/navigation";
import path from "path";
import { P, match } from "ts-pattern";
import { z } from "zod";
import { authorSlugSchema } from "../content/authors";
import { sortDateDesc } from "./date";
import { Locale } from "./i18n";

type DocumentType = "Post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

const FILES: Record<
  DocumentType,
  Record<
    Locale,
    Record<
      string,
      {
        slug: string;
        file: string;
      }
    >
  >
> = {
  Post: {
    fr: {},
    en: {},
  },
};

// Schemas
// ---------------------------------------- o

const FILE_NAME_SCHEMA = z.string().regex(/^[a-z0-9-]+_[a-z0-9-]+\.mdx$/);

const SEO_SCHEMA = z.object({
  title: z.string(),
  description: z.string(),
});

const POST_ATTRIBUTES_SCHEMA = z.object({
  title: z.string(),
  publishedAt: z.string(),
  modifiedAt: z.string().optional(),
  authors: z.array(authorSlugSchema),
  seo: SEO_SCHEMA,
});

// Generic functions
// ---------------------------------------- o

const getMDXSlug = (fileName: string) => {
  const slugify = slugifyWithCounter();

  return slugify(fileName.replace(".mdx", "").split("_")[1]);
};

const getMDXId = (fileName: string) => {
  return fileName.split("_")[0];
};

const getFilename = (filePath: string) => {
  return FILE_NAME_SCHEMA.parse(path.basename(filePath));
};

const getMDXFiles = (filesDir: string) => {
  return fs.readdirSync(filesDir).filter((file) => path.extname(file) === ".mdx");
};

type MDXFile = {
  id: string;
  slug: string;
  file: string;
};

const findMDXfileBySlug = (
  slug: string,
  locale: Locale,
  documentType: DocumentType,
): Option<MDXFile> => {
  for (const [id, { slug: fileSlug, file }] of Object.entries(FILES[documentType][locale])) {
    if (fileSlug === slug) {
      return Option.Some({
        id,
        slug: fileSlug,
        file,
      });
    }
  }

  return Option.None();
};

const findMDXfileById = (
  id: string,
  locale: Locale,
  documentType: DocumentType,
): Option<MDXFile> => {
  for (const [fileId, { slug, file }] of Object.entries(FILES[documentType][locale])) {
    if (fileId === id) {
      return Option.Some({
        id: fileId,
        slug,
        file,
      });
    }
  }

  return Option.None();
};

const getMDXFilesByLocale = (locale: Locale, documentType: DocumentType) => {
  return Option.Some(
    Object.entries(FILES[documentType][locale]).map(([id, { slug, file }]) => ({ id, slug, file })),
  );
};

const readMDXFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

export const generateMDXFilesRecord = () => {
  const frPosts = getMDXFiles(`${POSTS_DIR}/fr`);
  const enPosts = getMDXFiles(`${POSTS_DIR}/en`);

  const storeFiles = (locale: Locale, file: string) => {
    const fileName = getFilename(file);
    const id = getMDXId(fileName);
    const slug = getMDXSlug(fileName);

    if (!FILES.Post[locale][id]) {
      FILES.Post[locale][id] = {
        file,
        slug,
      };
    }
  };

  for (const filePath of frPosts) {
    storeFiles("fr", filePath);
  }

  for (const filePath of enPosts) {
    storeFiles("en", filePath);
  }
};

export type Alternates =
  | {
      "x-default": string;
      fr: string;
      en: string;
    }
  | {
      "x-default": string;
      fr: string;
      en: undefined;
    }
  | {
      "x-default": string;
      fr: undefined;
      en: string;
    }
  | {
      "x-default": undefined;
      fr: string | undefined;
      en: string | undefined;
    };

const generateAlternates = (hrefs: Record<"fr" | "en", string | undefined>): Alternates => {
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

// Post
// ---------------------------------------- o

export type Post = {
  type: "Post";
  href: string;
  slug: string;
  alternates: Alternates;
  headings: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
    slug: string;
  }[];
  body: string;
} & z.infer<typeof POST_ATTRIBUTES_SCHEMA>;

export const generatePostHref = (slug: string, locale: Locale) => {
  return `/${locale}/blog/${slug}`;
};

const generatePostAlternateHref = (fileOption: Option<MDXFile>, locale: Locale) => {
  if (fileOption.isNone()) {
    return undefined;
  }

  return generatePostHref(fileOption.get().slug, locale);
};

const getPostHeadings = (body: string) => {
  const headingsRegex = /(?<flag>#{1,6})\s+(?<content>.+)/g;
  const slugger = new GithubSlugger();
  const iterable = Array.from(body.matchAll(headingsRegex));

  const headings = [];

  for (const match of iterable) {
    const flag = match.groups?.flag;
    const content = match.groups?.content;

    if (flag && content) {
      headings.push({
        level: flag.length as 1 | 2 | 3 | 4 | 5 | 6,
        text: content,
        slug: slugger.slug(content),
      });
    }
  }

  return headings;
};

const processPostMDX = ({
  slug,
  locale,
  file,
  id,
}: {
  slug: string;
  locale: Locale;
  id: string;
  file: string;
}) => {
  const rawContent = fm(readMDXFile(`${POSTS_DIR}/${locale}/${file}`));
  const attributes = POST_ATTRIBUTES_SCHEMA.parse(rawContent.attributes);

  const alternates = generateAlternates({
    fr:
      locale === "fr"
        ? `/fr/blog/${slug}`
        : generatePostAlternateHref(findMDXfileById(id, "fr", "Post"), "fr"),
    en:
      locale === "en"
        ? `/en/blog/${slug}`
        : generatePostAlternateHref(findMDXfileById(id, "en", "Post"), "en"),
  });

  return {
    type: "Post" as const,
    href: generatePostHref(slug, locale),
    slug,
    alternates,
    headings: getPostHeadings(rawContent.body),
    ...attributes,
    body: rawContent.body,
  };
};

export const Post = {
  findBySlug: (slug: string, locale: Locale) => {
    const fileOption = findMDXfileBySlug(slug, locale, "Post");

    if (fileOption.isNone()) {
      return Option.None();
    }

    const { file, id } = fileOption.get();

    return Option.Some(processPostMDX({ slug, locale, file, id }));
  },
  all: (locale: Locale) => {
    const filesOption = getMDXFilesByLocale(locale, "Post");

    if (filesOption.isNone()) {
      return Option.None();
    }

    const files = filesOption.get();

    const posts: Post[] = [];

    for (const { id, slug, file } of files) {
      posts.push(processPostMDX({ slug, locale, file, id }));
    }

    return Option.Some(posts.sort((a, b) => sortDateDesc(a.publishedAt, b.publishedAt)));
  },
  latest: (locale: Locale) => {
    const postsOption = Post.all(locale);

    if (postsOption.isNone()) {
      return Option.None();
    }

    return Option.Some(postsOption.get()[0]);
  },
};

type FindFn = typeof Post.findBySlug;

export const findBySlugOrNotFound =
  (fn: FindFn) =>
  (slug: string, locale: Locale): Post | never => {
    return match(fn(slug, locale))
      .with(Option.P.Some(P.select(P.when((record) => record.type === "Post"))), (post) => post)
      .otherwise(() => notFound());
  };
