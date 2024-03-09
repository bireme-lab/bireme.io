import { ORIGIN } from "@/utils/vars";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/_next",
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
