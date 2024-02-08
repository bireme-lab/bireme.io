import type { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";
import type en from "./en.json";
import type fr from "./fr.json";

type EnTranslationKeys = keyof typeof en;
export type Dictionary = typeof fr;
export type TranslationKey = keyof typeof fr;
export type TranslationParams =
  | Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  | undefined;

type Extends<A, B> = A extends B ? true : false;
type Expect<T extends true> = T;

/* eslint-disable @typescript-eslint/no-unused-vars */
type EnDiff = Exclude<TranslationKey, EnTranslationKeys>;
type IsEnDiff = Expect<Extends<TranslationKey, EnTranslationKeys>>;
/* eslint-enable @typescript-eslint/no-unused-vars */
