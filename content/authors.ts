import { z } from "zod";

export const authorSlugSchema = z.union([z.literal("frederic-godin"), z.literal("antoine-lin")]);
export type AuthorSlug = z.infer<typeof authorSlugSchema>;

export type Author = {
  slug: AuthorSlug;
  avatar: string;
  firstName: string;
  lastName: string;
  fullName: string;
  position: string;
  twitterProfileUrl: string;
};

export const authors: Record<AuthorSlug, Author> = {
  "frederic-godin": {
    slug: "frederic-godin",
    avatar: "/images/avatars/antoine.webp",
    firstName: "Frédéric",
    lastName: "Godin",
    fullName: "Frédéric Godin",
    position: "Co-fondateur",
    twitterProfileUrl: "https://twitter.com/epimodev",
  },
  "antoine-lin": {
    slug: "antoine-lin",
    avatar: "/images/avatars/fred.webp",
    firstName: "Antoine",
    lastName: "Lin",
    fullName: "Antoine Lin",
    position: "Co-fondateur",
    twitterProfileUrl: "https://twitter.com/imvahill",
  },
};
