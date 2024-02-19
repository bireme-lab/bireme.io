/* eslint-disable @typescript-eslint/no-var-requires */
const createNextIntlPlugin = require('next-intl/plugin');
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const { withContentlayer } = require('next-contentlayer');

const withVanillaExtract = createVanillaExtractPlugin();
const withNextIntl = createNextIntlPlugin('./utils/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withVanillaExtract(withNextIntl(withContentlayer(nextConfig)));
