import { formatDateForSitemap } from "@/utils/date";
import { i18n, Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { ORIGIN } from "@/utils/vars";
import { Option } from "@swan-io/boxed";
import { MetadataRoute } from "next";
import { match, P } from "ts-pattern";

const generatePostsSiteMap = async (locale: Locale) => {
  return match(await MDX.Post.all(locale))
    .with(Option.P.Some(P.select()), (posts) => {
      return posts.map((post) => ({
        url: `${ORIGIN}${MDX.generateHref(post.slug, locale, "Post")}`,
        lastModified: post.modifiedAt
          ? formatDateForSitemap(post.modifiedAt)
          : formatDateForSitemap(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 1,
      }));
    })
    .otherwise(() => []);
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const getUrl = (locale: string, path: string) =>
    match(path)
      .with("/", () => (locale === i18n.defaultLocale ? ORIGIN : `${ORIGIN}/${locale}`))
      .otherwise(() =>
        locale === i18n.defaultLocale ? `${ORIGIN}${path}` : `${ORIGIN}/${locale}${path}`,
      );

  return [
    {
      url: getUrl("fr", "/"),
      lastModified: formatDateForSitemap("2024-03-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getUrl("en", "/"),
      lastModified: formatDateForSitemap("2024-03-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: getUrl("fr", "/mentions-legales"),
      lastModified: formatDateForSitemap("2024-03-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: getUrl("en", "/legal-notive"),
      lastModified: formatDateForSitemap("2024-03-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: getUrl("fr", "/politique-de-confidentialite"),
      lastModified: formatDateForSitemap("2024-03-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: getUrl("en", "/privacy-policy"),
      lastModified: formatDateForSitemap("2024-03-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...(await generatePostsSiteMap("fr")),
    ...(await generatePostsSiteMap("en")),
  ];
};

export default sitemap;
