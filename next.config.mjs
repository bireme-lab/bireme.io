import createNextIntlPlugin from 'next-intl/plugin';
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();
const withNextIntl = createNextIntlPlugin('./utils/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withVanillaExtract(withNextIntl(nextConfig));
