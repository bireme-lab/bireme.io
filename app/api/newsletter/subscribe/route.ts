import { localeEnum } from "@/utils/i18n";
import { Result } from "@swan-io/boxed";
import { NextResponse } from "next/server";
import { z } from "zod";

export const bodySchema = z.object({
  email: z.string().email(),
  optInContent: z.boolean(),
  optInMarketing: z.boolean(),
  locale: localeEnum,
  recaptchaResponse: z.string(),
});

export type NewsletterSubscriptionResponseSuccess = {
  status: "success";
  message: "Ok";
};

export type NewsletterSubscriptionResponseError = {
  status: "error";
  code: "invalid_request_body" | "recaptcha_validation_error" | "unauthorized";
  message: string;
  errors?: {
    field: "email" | "optInContent" | "optInMarketing" | "locale" | "recaptchaResponse";
    message: string;
  }[];
};

export type NewsletterSubscriptionResponse =
  | NewsletterSubscriptionResponseSuccess
  | NewsletterSubscriptionResponseError;

export async function POST(
  request: Request,
): Promise<NextResponse<NewsletterSubscriptionResponse>> {
  const res = await request.json();
  const body = await bodySchema.safeParseAsync(res);

  if (!body.success) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "invalid_request_body",
        message: "Data parsed from request body does not match awaited schema",
        errors: body.error.errors.map((error) => ({
          field: error.path[0],
          message: error.message,
        })),
      }),
      { status: 400 },
    );
  }

  const recaptchaValidation = await Result.fromPromise(
    fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SITE_SECRET}&response=${body.data.recaptchaResponse}`,
    }).then((res) => res.json()),
  );

  if (recaptchaValidation.isError()) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "recaptcha_validation_error",
        message: "An error occured while validating recaptcha response",
        error: recaptchaValidation.getError(),
      }),
      { status: 500 },
    );
  }

  if (recaptchaValidation.get().success === false) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "unauthorized",
        message: "Recaptcha validation failed",
      }),
      { status: 401 },
    );
  }

  return new NextResponse(JSON.stringify({ status: "success", message: "Ok" }), { status: 200 });
}
