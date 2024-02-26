import { Result } from "@swan-io/boxed";

type FetchError = {
  message: string;
  error: unknown;
  status: "error";
  code: "fetch_error";
};

export const request = async <A, E>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<Result<A, E | FetchError>> => {
  try {
    const promiseResponse = await fetch(input, init);
    const json = await promiseResponse.json();

    if (!promiseResponse.ok) {
      return Result.Error(json);
    }

    return Result.Ok(json);
  } catch (error) {
    return Result.Error({
      status: "error",
      code: "fetch_error",
      message: "An error occurred while fetching the data",
      error,
    });
  }
};
