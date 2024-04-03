import { getPathname } from "@/navigation";
import { slugifyWithCounter } from "@sindresorhus/slugify";
import { Option } from "@swan-io/boxed";
import fm from "front-matter";
import fs from "fs-extra";
import GithubSlugger from "github-slugger";
import { RedirectType, notFound, redirect } from "next/navigation";
import path from "path";
import { P, match } from "ts-pattern";
import { z } from "zod";
import { authorSlugSchema } from "../content/authors";
import { sortDateDesc } from "./date";
import { Locale, i18n } from "./i18n";
import { ORIGIN } from "./vars";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const PAGES_DIR = path.join(process.cwd(), "content/pages");

export type DocumentType = "Post" | "Page";

export const FILES: Record<
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
  Page: {
    fr: {},
    en: {},
  },
};

export type Alternates =
  | {
      "x-default": string;
      fr: string;
      en: string;
    }
  | undefined;

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

export type Page = {
  type: "Page";
  href: string;
  slug: string;
  alternates: Alternates;
  headings: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
    slug: string;
  }[];
  body: string;
} & z.infer<typeof PAGE_ATTRIBUTES_SCHEMA>;

// Schemas
// ---------------------------------------- o

export const FILE_NAME_SCHEMA = z.string().regex(/^[a-z0-9-]+_[a-z0-9-]+\.mdx$/);

const SEO_SCHEMA = z.object({
  title: z.string(),
  description: z.string(),
});

const POST_ATTRIBUTES_SCHEMA = z.object({
  title: z.string(),
  publishedAt: z.string(),
  modifiedAt: z.string().optional(),
  authors: z.array(authorSlugSchema),
  tags: z.array(z.string()),
  seo: SEO_SCHEMA,
  tldr: z.string(),
});

type PostValidationSchema = typeof POST_ATTRIBUTES_SCHEMA;

const PAGE_ATTRIBUTES_SCHEMA = z.object({
  title: z.string(),
  publishedAt: z.string(),
  modifiedAt: z.string().optional(),
  seo: SEO_SCHEMA,
});

type PageValidationSchema = typeof PAGE_ATTRIBUTES_SCHEMA;

type ValidationSchema = PostValidationSchema | PageValidationSchema;

// Generic functions
// ---------------------------------------- o

export const getMDXSlug = (fileName: string) => {
  const slugify = slugifyWithCounter();

  return slugify(fileName.replace(".mdx", "").split("_")[1]);
};

export const getMDXId = (fileName: string) => {
  return fileName.split("_")[0];
};

const getFilename = (filePath: string) => {
  return FILE_NAME_SCHEMA.parse(path.basename(filePath));
};

export const getMDXFiles = async (filesDir: string) => {
  const dir = await fs.readdir(filesDir);

  return dir.filter((file) => path.extname(file) === ".mdx");
};

type MDXFile = {
  id: string;
  slug: string;
  file: string;
};

export const getFilesFromRecord = async (
  locale: Locale,
  documentType: DocumentType,
): Promise<MDXFile[]> => {
  if (Object.keys(FILES[documentType][locale]).length <= 0) {
    await generateMDXFilesRecord();
  }

  return Object.entries(FILES[documentType][locale]).map(([id, { slug, file }]) => ({
    id,
    slug,
    file,
  }));
};

const findMDXidBySlug = async (
  slug: string,
  documentType: DocumentType,
): Promise<Option<string>> => {
  const files = (
    await Promise.all(i18n.locales.map((locale) => getFilesFromRecord(locale, documentType)))
  ).flat();
  const foundedFile = files.find((file) => file.slug === slug);

  return Option.fromNullable(foundedFile?.id);
};

const findMDXfileBySlug = async (
  slug: string,
  locale: Locale,
  documentType: DocumentType,
): Promise<Option<MDXFile>> => {
  const files = await getFilesFromRecord(locale, documentType);
  const foundedFile = files.find((file) => file.slug === slug);

  if (foundedFile != null) {
    return Option.Some(foundedFile);
  }

  const id = await findMDXidBySlug(slug, documentType);

  if (id.isNone()) {
    return Option.None();
  }

  return findMDXfileById(id.get(), locale, documentType);
};

const findMDXfileById = async (
  id: string,
  locale: Locale,
  documentType: DocumentType,
): Promise<Option<MDXFile>> => {
  const files = await getFilesFromRecord(locale, documentType);
  const foundedFile = files.find((file) => file.id === id);

  return foundedFile ? Option.Some(foundedFile) : Option.None();
};

const getMDXFilesByLocale = async (
  locale: Locale,
  documentType: DocumentType,
): Promise<Option<MDXFile[]>> => {
  return Option.Some(await getFilesFromRecord(locale, documentType));
};

const readMDXFile = async (filePath: string) => {
  return fs.readFile(filePath, "utf-8");
};

export const generateMDXFilesRecord = async () => {
  const [postsFr, postsEn, pagesFr, pagesEn] = await Promise.all([
    getMDXFiles(`${POSTS_DIR}/fr`),
    getMDXFiles(`${POSTS_DIR}/en`),
    getMDXFiles(`${PAGES_DIR}/fr`),
    getMDXFiles(`${PAGES_DIR}/en`),
  ]);

  const storeFiles = (locale: Locale, file: string, documentType: DocumentType) => {
    const fileName = getFilename(file);
    const id = getMDXId(fileName);
    const slug = getMDXSlug(fileName);

    if (!FILES[documentType][locale][id]) {
      FILES[documentType][locale][id] = {
        file,
        slug,
      };
    }
  };

  for (const filePath of postsFr) {
    storeFiles("fr", filePath, "Post");
  }

  for (const filePath of postsEn) {
    storeFiles("en", filePath, "Post");
  }

  for (const filePath of pagesFr) {
    storeFiles("fr", filePath, "Page");
  }

  for (const filePath of pagesEn) {
    storeFiles("en", filePath, "Page");
  }

  return FILES;
};

export const generateHref = (slug: string, locale: Locale, documentType: DocumentType) => {
  return match(documentType)
    .with("Post", () => {
      return `${locale === i18n.defaultLocale ? "" : `/${locale}`}${getPathname({ locale, href: { pathname: "/blog/[post_slug]", params: { post_slug: slug } } })}`;
    })
    .with("Page", () => {
      return `${locale === i18n.defaultLocale ? "" : `/${locale}`}${getPathname({ locale, href: { pathname: "/[page_slug]", params: { page_slug: slug } } })}`;
    })
    .exhaustive();
};

export const generateAlternates = (hrefs: Record<Locale, string | undefined>): Alternates => {
  return match(hrefs)
    .with({ fr: P.string, en: P.string }, (alternates) => {
      return {
        fr: `${ORIGIN}${alternates.fr}`,
        en: `${ORIGIN}${alternates.en}`,
        "x-default": alternates.fr,
      };
    })
    .otherwise(() => {
      return undefined;
    });
};

const generateAlternateHref = (
  fileOption: Option<MDXFile>,
  locale: Locale,
  documentType: DocumentType,
) => {
  if (fileOption.isNone()) {
    return undefined;
  }

  return generateHref(fileOption.get().slug, locale, documentType);
};

export const getHeadings = (body: string) => {
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

type PageOrPost<T> = T extends "Page" ? Page : T extends "Post" ? Post : never;

type parseMDXArgs<T extends DocumentType> = {
  filePath: string;
  validationSchema: ValidationSchema;
  documentType: T;
  locale: Locale;
  slug: string;
  id: string;
};

const parseMDX: <T extends DocumentType>(args: parseMDXArgs<T>) => Promise<PageOrPost<T>> = async ({
  filePath,
  validationSchema,
  documentType,
  locale,
  slug,
  id,
}) => {
  const fileContent = await readMDXFile(filePath);
  const rawContent = fm(fileContent);
  const attributes = validationSchema.parse(rawContent.attributes);
  const href = generateHref(slug, locale, documentType);

  const alternates = generateAlternates({
    fr:
      locale === "fr"
        ? href
        : generateAlternateHref(await findMDXfileById(id, "fr", documentType), "fr", documentType),
    en:
      locale === "en"
        ? href
        : generateAlternateHref(await findMDXfileById(id, "en", documentType), "en", documentType),
  });

  return {
    ...attributes,
    type: documentType,
    href,
    slug,
    alternates,
    headings: getHeadings(rawContent.body),
    body: rawContent.body,
  } as PageOrPost<typeof documentType>;
};

// Post
// ---------------------------------------- o

export const Post = {
  findBySlug: async (slug: string, locale: Locale) => {
    const fileOption = await findMDXfileBySlug(slug, locale, "Post");

    if (fileOption.isNone()) {
      return Option.None();
    }

    const { file, slug: fileSlug, id } = fileOption.get();
    const post = await parseMDX({
      slug: fileSlug,
      locale,
      filePath: `${POSTS_DIR}/${locale}/${file}`,
      validationSchema: POST_ATTRIBUTES_SCHEMA,
      documentType: "Post",
      id,
    });

    return Option.Some(post);
  },
  all: async (locale: Locale) => {
    const filesOption = await getMDXFilesByLocale(locale, "Post");

    if (filesOption.isNone()) {
      return Option.None();
    }

    const files = filesOption.get();

    const posts: Post[] = [];

    for (const { id, slug, file } of files) {
      const post = await parseMDX({
        slug,
        locale,
        filePath: `${POSTS_DIR}/${locale}/${file}`,
        validationSchema: POST_ATTRIBUTES_SCHEMA,
        documentType: "Post",
        id,
      });

      posts.push(post);
    }

    return Option.Some(posts.sort((a, b) => sortDateDesc(a.publishedAt, b.publishedAt)));
  },
  latest: async (locale: Locale) => {
    const postsOption = await Post.all(locale);

    if (postsOption.isNone()) {
      return Option.None();
    }

    return Option.Some(postsOption.get()[0]);
  },
};

// Page
// ---------------------------------------- o

export const Page = {
  findBySlug: async (slug: string, locale: Locale) => {
    const fileOption = await findMDXfileBySlug(slug, locale, "Page");

    if (fileOption.isNone()) {
      return Option.None();
    }

    const { file, slug: fileSlug, id } = fileOption.get();
    const page = await parseMDX({
      slug: fileSlug,
      locale,
      filePath: `${PAGES_DIR}/${locale}/${file}`,
      validationSchema: PAGE_ATTRIBUTES_SCHEMA,
      documentType: "Page",
      id,
    });

    return Option.Some(page);
  },
  all: async (locale: Locale) => {
    const filesOption = await getMDXFilesByLocale(locale, "Page");

    if (filesOption.isNone()) {
      return Option.None();
    }

    const files = filesOption.get();

    const pages: Page[] = [];

    for (const { id, slug, file } of files) {
      const page = await parseMDX({
        slug,
        locale,
        filePath: `${PAGES_DIR}/${locale}/${file}`,
        validationSchema: PAGE_ATTRIBUTES_SCHEMA,
        documentType: "Page",
        id,
      });

      pages.push(page);
    }

    return Option.Some(pages.sort((a, b) => sortDateDesc(a.publishedAt, b.publishedAt)));
  },
  latest: async (locale: Locale) => {
    const pagesOption = await Page.all(locale);

    if (pagesOption.isNone()) {
      return Option.None();
    }

    return Option.Some(pagesOption.get()[0]);
  },
};

export const findPostBySlugOrNotFound = async (slug: string, locale: Locale) => {
  return match(await Post.findBySlug(slug, locale))
    .with(Option.P.Some(P.select()), (post) =>
      post.slug === slug ? post : redirect(`/blog/${post.slug}`, RedirectType.replace),
    )
    .otherwise(() => notFound());
};

export const findPageBySlugOrNotFound = async (slug: string, locale: Locale) => {
  return match(await Page.findBySlug(slug, locale))
    .with(Option.P.Some(P.select()), (page) => page)
    .otherwise(() => notFound());
};
