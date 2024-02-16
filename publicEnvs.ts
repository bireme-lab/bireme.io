import { z } from "zod";

export const envs = z
  .object({
    NEXT_PUBLIC_HOST: z.union([z.literal("localhost"), z.literal("bireme.io")]),
  })
  .parse({
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  });
