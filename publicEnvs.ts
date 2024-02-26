import { z } from "zod";

export const envs = z
  .object({
    NEXT_PUBLIC_HOST: z.union([z.literal("localhost"), z.literal("bireme.io")]),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
  })
  .parse({
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  });
