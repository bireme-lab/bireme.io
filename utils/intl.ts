import "server-only";

import type { Dictionary, TranslationKey, TranslationParams } from "@/dictionaries/types";
import type { MessageFormatElement } from "@formatjs/icu-messageformat-parser/types";
import { createIntl, createIntlCache, type IntlShape } from "@formatjs/intl";
import { i18n, type Locale } from "./i18n";

export let intl: IntlShape<string>;

export const initIntl = async (locale: Locale) => {
  const cache = createIntlCache();
  const getDictionary = () =>
    import(`../dictionaries/${locale}.json`).then(
      (module) => module.default satisfies Dictionary,
    ) as Promise<Dictionary>;
  const dictionary = await getDictionary();

  intl = createIntl(
    {
      locale: locale,
      defaultLocale: i18n.defaultLocale,
      fallbackOnEmptyString: false,
      messages: dictionary,
    },
    cache,
  );
};

export const getIntl = async () => {
  if (!intl) {
    await initIntl(i18n.defaultLocale);
  }

  return {
    t: (
      key: TranslationKey,
      defaultMessage?: string | MessageFormatElement[] | undefined,
      params?: TranslationParams,
    ) => intl.formatMessage({ id: key, defaultMessage }, params).toString(),
  };
};
