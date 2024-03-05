import { getMeta } from "@/content/meta";
import { i18n } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { Option } from "@swan-io/boxed";
import { getTranslations } from "next-intl/server";
import RSS from "rss";
import { match, P } from "ts-pattern";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const url = new URL(request.url);

  const locale = match(url.searchParams.get("locale"))
    .with(P.string.regex("fr"), () => i18n.locales["0"])
    .with(P.string.regex("en"), () => i18n.locales["1"])
    .otherwise(() => i18n.defaultLocale);

  const meta = await getMeta(locale);

  const t = await getTranslations({ locale, namespace: "route.rss" });

  const feed = new RSS({
    title: meta.title as string,
    description: meta.description as string,
    site_url: `${url.origin}/${locale}`,
    feed_url: url.href,
    copyright: `© ${new Date().getFullYear()} Bireme Lab. ${
      locale === "fr" ? "Tous droits réservés." : "All rights reserved."
    }`,
    language: locale,
    pubDate: new Date().toUTCString(),
    ttl: 60,
    image_url: `${url.origin}/images/logo.png`,
  });

  match(await MDX.Post.all(locale))
    .with(Option.P.Some(P.select()), (posts) => {
      posts.map((post) => {
        feed.item({
          title: post.title,
          description: `<p>tl;dr</br></br>${post.tldr}</p></br><a href="${url.origin}/${locale}/blog/${post.slug}" title="${t("read_more")}">${t("read_more")}</a>`,
          url: `${url.origin}/${locale}/blog/${post.slug}`,
          guid: post.slug,
          date: post.publishedAt,
          author: "Bireme Lab",
        });
      });
    })
    .otherwise(() => null);

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=86400",
    },
  });
}
