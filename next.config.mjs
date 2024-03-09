import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import createNextIntlPlugin from "next-intl/plugin";

const withVanillaExtract = createVanillaExtractPlugin();
const withNextIntl = createNextIntlPlugin("./utils/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/rss",
      },
      {
        source: "/en/rss.xml",
        destination: "/api/rss",
      },
    ];
  },
};

export default withVanillaExtract(withNextIntl(nextConfig));
