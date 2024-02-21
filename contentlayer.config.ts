import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import GithubSlugger from "github-slugger";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { authors } from "./content/authors";
import {
  generatePostAlternates,
  generatePostSlug,
  generatePostUrl,
  getRecordLocale,
} from "./utils/content";

const SEO = defineNestedType(() => ({
  name: "SEO",
  fields: {
    title: { type: "string" },
    description: { type: "string" },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    modifiedAt: { type: "date" },
    authors: {
      type: "list",
      of: {
        type: "enum",
        options: Object.keys(authors),
      },
      required: true,
    },
    seo: {
      type: "nested",
      of: SEO,
      required: true,
    },
  },
  computedFields: {
    locale: {
      type: "enum",
      options: ["fr", "en"],
      resolve: getRecordLocale,
    },
    url: { type: "string", resolve: generatePostUrl },
    slug: { type: "string", resolve: generatePostSlug },
    alternates: { type: "json", resolve: generatePostAlternates },
    headings: {
      type: "json",
      resolve: (doc) => {
        const headingsRegex = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(headingsRegex)).map(({ groups }) => {
          const flag = groups?.flag;
          const content = groups?.content;

          return {
            level: flag?.length,
            text: content,
            slug: content ? slugger.slug(content) : undefined,
          };
        });

        return headings;
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "content/mdx",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});
