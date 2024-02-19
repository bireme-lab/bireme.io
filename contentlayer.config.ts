import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { authors } from "./content/authors";
import {
  generatePostAlternates,
  generatePostSlug,
  generatePostUrl,
  getRecordLocale,
} from "./utils/content";

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
    excerpt: {
      type: "mdx",
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
  },
}));

export default makeSource({ contentDirPath: "content/mdx", documentTypes: [Post] });
