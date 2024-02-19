import { P } from "ts-pattern";

export const isNotNullish = <T>(x: T | null | undefined): x is T => {
  return x != null;
};

export const isNotEmpty = <T extends string>(value: T): value is Exclude<T, ""> => value !== "";

export const isEmpty = <T extends string>(value: T | ""): value is "" => value === "";

export const P_hasRecord = P.when(
  (records: unknown[]): records is [unknown, ...unknown[]] => records.length > 0,
);
