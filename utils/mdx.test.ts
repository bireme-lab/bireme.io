import path from "path";
import { describe, expect, test } from "vitest";
import { z } from "zod";
import { Locale, localeEnum } from "./i18n";
import {
  DocumentType,
  FILES,
  FILE_NAME_SCHEMA,
  generateAlternates,
  generateMDXFilesRecord,
  getFilesFromRecord,
  getHeadings,
  getMDXId,
  getMDXSlug,
} from "./mdx";

const documentTypeSchema = z.enum(["Post", "Page"]);

describe("getMDXSlug", () => {
  test("should return the correct slug from filename", () => {
    const input = "20240223-01_first-post.mdx";
    const expected = "first-post";

    expect(getMDXSlug(input)).toBe(expected);
  });
});

describe("getMDXId", () => {
  test("should return the correct ID from filename", () => {
    const input = "20240223-01_first-post.mdx";
    const expected = "20240223-01";

    expect(getMDXId(input)).toBe(expected);
  });
});

describe("generateMDXFilesRecord", () => {
  test("ensure FILES is empty before testing", () => {
    const expected = {
      Post: {
        fr: {},
        en: {},
      },
      Page: {
        fr: {},
        en: {},
      },
    };

    expect(FILES).toMatchObject(expected);
  });

  test("should return the correct record of MDX files", async () => {
    await generateMDXFilesRecord();

    const recordSchema = z.record(
      documentTypeSchema,
      z.record(
        localeEnum,
        z.record(
          z.string(),
          z.object({
            file: z.string(),
            slug: z.string(),
          }),
        ),
      ),
    );

    expect(recordSchema.safeParse(FILES).success).toBe(true);
  });

  test("all MDX files should follow convention of id_filename.mdx", async () => {
    await generateMDXFilesRecord();

    for (const type of ["Post", "Page"]) {
      for (const locale of ["fr", "en"]) {
        for (const { file } of Object.values(FILES[type as DocumentType][locale as Locale])) {
          expect(FILE_NAME_SCHEMA.safeParse(path.basename(file)).success).toBe(true);
        }
      }
    }
  });
});

describe("getFilesFromRecord", () => {
  const mdxFileSchema = z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      file: z.string(),
    }),
  );

  test("ensure FILES is empty before testing", () => {
    const expected = {
      Post: {
        fr: {},
        en: {},
      },
      Page: {
        fr: {},
        en: {},
      },
    };

    expect(FILES).toMatchObject(expected);
  });

  test("should return Posts from the FILES record", async () => {
    const [fr, en] = await Promise.all([
      getFilesFromRecord("fr", "Post"),
      getFilesFromRecord("en", "Post"),
    ]);
    const [frTest, enTest] = await Promise.all([
      mdxFileSchema.safeParseAsync(fr),
      mdxFileSchema.safeParseAsync(en),
    ]);

    expect(frTest.success).toBe(true);
    expect(enTest.success).toBe(true);
  });

  test("should return Pages from the FILES record", async () => {
    const [fr, en] = await Promise.all([
      getFilesFromRecord("fr", "Page"),
      getFilesFromRecord("en", "Page"),
    ]);
    const [frTest, enTest] = await Promise.all([
      mdxFileSchema.safeParseAsync(fr),
      mdxFileSchema.safeParseAsync(en),
    ]);

    expect(frTest.success).toBe(true);
    expect(enTest.success).toBe(true);
  });
});

describe("generateAlternates", () => {
  test("should return right alternates if FR and EN URLs are defined", async () => {
    const input = {
      fr: "/fr/page",
      en: "/en/page",
    };

    const expected = {
      fr: "/fr/page",
      en: "/en/page",
      "x-default": "/fr/page",
    };

    const output = await generateAlternates(input);

    expect(output).toMatchObject(expected);
  });

  test("should return undefined if EN URLs are not defined", async () => {
    const input = {
      fr: "/fr/page",
      en: undefined,
    };

    const output = await generateAlternates(input);

    expect(output).toBeUndefined();
  });

  test("should return undefined if FR URLs are not defined", async () => {
    const input = {
      fr: undefined,
      en: "/en/page",
    };

    const output = await generateAlternates(input);

    expect(output).toBeUndefined();
  });
});

describe("getHeadings", () => {
  test("should return the correct headings from the MDX file", async () => {
    const input = `## Heading 2\nlorem ipsum\n### Heading 3\nlorem ipsum\n## Heading 2\nlorem ipsum\n#### Heading 4\nlorem ipsum\n##### Heading 5\nlorem ipsum\n###### Heading 6\nlorem ipsum`;

    const expected = [
      { level: 2, text: "Heading 2", slug: "heading-2" },
      { level: 3, text: "Heading 3", slug: "heading-3" },
      { level: 2, text: "Heading 2", slug: "heading-2-1" },
      { level: 4, text: "Heading 4", slug: "heading-4" },
      { level: 5, text: "Heading 5", slug: "heading-5" },
      { level: 6, text: "Heading 6", slug: "heading-6" },
    ];

    const output = await getHeadings(input);

    expect(output).toMatchObject(expected);
  });
});
