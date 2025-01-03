import { localeEnum } from "@/utils/i18n";
import { request } from "@/utils/request";
import { Result } from "@swan-io/boxed";
import { NextResponse } from "next/server";
import { P, match } from "ts-pattern";
import { z } from "zod";

export type NewsletterSubscriptionResponseSuccess = {
  status: "success" | "already_subscribed";
  message: "Ok";
};

export type NewsletterSubscriptionResponseError = {
  status: "error";
  code: "invalid_request_body" | "recaptcha_validation_error" | "unauthorized" | "server_error";
  message: string;
  errors?: {
    field: "email" | "optIn" | "locale" | "recaptchaResponse";
    message: string;
  }[];
};

export type NewsletterSubscriptionResponse =
  | NewsletterSubscriptionResponseSuccess
  | NewsletterSubscriptionResponseError;

type CreatePlunkContact = {
  success: boolean;
  id: string;
  email: string;
  subscribed: boolean;
  data: {
    optIn: boolean;
    locale: string;
  };
  createdAt: string;
  updatedAt: string;
};

export async function POST(req: Request) {
  const res = await req.json();
  const body = await z
    .object({
      email: z.string().email(),
      marketing_opted_in: z.boolean(),
      locale: localeEnum,
      recaptcha_response: z.string(),
    })
    .safeParseAsync(res);

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
      } as NewsletterSubscriptionResponseError),
      { status: 400 },
    );
  }

  const recaptchaValidation = await request<{ success: boolean }, unknown>(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SITE_SECRET}&response=${body.data.recaptcha_response}`,
    },
  );

  if (recaptchaValidation.isError()) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "recaptcha_validation_error",
        message: "An error occured while validating recaptcha response",
        error: recaptchaValidation.getError(),
      } as NewsletterSubscriptionResponseError),
      { status: 500 },
    );
  }

  if (recaptchaValidation.get().success === false) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        code: "unauthorized",
        message: "Recaptcha validation failed",
      } as NewsletterSubscriptionResponseError),
      { status: 401 },
    );
  }

  const createContact = await request<CreatePlunkContact, unknown>(
    "https://api.useplunk.com/v1/track",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PLUNK_SECRET_API_KEY}`,
      },
      body: JSON.stringify({
        event:
          body.data.locale === "fr" ? "newsletter-subscription-fr" : "newsletter-subscription-en",
        email: body.data.email,
        subscribed: true,
        data: {
          opted_in: body.data.marketing_opted_in,
          locale: body.data.locale,
        },
      }),
    },
  );

  return match(createContact)
    .with(Result.P.Ok(P.select({ success: true })), () => {
      return new NextResponse(
        JSON.stringify({
          status: "success",
          message: "Ok",
        } as NewsletterSubscriptionResponseSuccess),
        { status: 200 },
      );
    })
    .with(Result.P.Error(P.select({ code: 409, message: "Contact already exists" })), () => {
      return new NextResponse(
        JSON.stringify({
          status: "already_subscribed",
          message: "Ok",
        } as NewsletterSubscriptionResponseSuccess),
        { status: 200 },
      );
    })
    .otherwise(() => {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          code: "server_error",
          message: "An error occured while creating contact",
        } as NewsletterSubscriptionResponseError),
        { status: 500 },
      );
    });
}
