import { IS_DEV, PROTOCOL } from "@/utils/vars";
import { MetadataRoute } from "next";
import { envs } from "../publicEnvs";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${PROTOCOL}://${envs.NEXT_PUBLIC_HOST}${IS_DEV ? ":3000" : ""}/sitemap.xml`,
  };
}
