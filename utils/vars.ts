import { envs } from "../publicEnvs";

export const IS_DEV = envs.IS_DEV === "true";
export const PROTOCOL = IS_DEV ? "http" : "https";
export const VERCEL_URL =
  envs.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? envs.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : envs.NEXT_PUBLIC_VERCEL_URL;
export const ORIGIN = `${PROTOCOL}://${VERCEL_URL ?? "localhost"}${IS_DEV ? ":3000" : ""}`;
