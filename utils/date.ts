import dayjs, { extend, locale as setLocale } from "dayjs";
import en from "dayjs/locale/en";
import fr from "dayjs/locale/fr";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { match } from "ts-pattern";
import type { Locale } from "./i18n";

extend(localizedFormat);
extend(relativeTime);

export const configDayJS = (locale: Locale) => {
  match(locale)
    .with("en", () => setLocale(en))
    .with("fr", () => setLocale(fr))
    .exhaustive();
};

export const getCurrentYear = (): string => {
  return dayjs().format("YYYY");
};

export const getRelativeDate = (date: string): string => {
  return dayjs().to(date);
};

export const formatDateForSchema = (date: string): string => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatDateForDisplay = (date: string): string => {
  return dayjs(date).format("LL");
};

export const isSameDate = (date1: string, date2: string): boolean => {
  return dayjs(date1).isSame(date2, "day");
};

export const sortDateDesc = (date1: string, date2: string): -1 | 0 | 1 => {
  return dayjs(date1).isBefore(date2) ? 1 : -1;
};

export const sortDateAsc = (date1: string, date2: string): -1 | 0 | 1 => {
  return dayjs(date1).isAfter(date2) ? 1 : -1;
};
