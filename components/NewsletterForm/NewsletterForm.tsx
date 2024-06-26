"use client";

import {
  NewsletterSubscriptionResponseError,
  NewsletterSubscriptionResponseSuccess,
} from "@/app/api/newsletter/subscribe/route";
import { useGoogleReCaptcha } from "@/hooks/useGoogleReCaptcha";
import { Link } from "@/navigation";
import { cx } from "@/styles/mixins";
import { Locale } from "@/utils/i18n";
import { request } from "@/utils/request";
import { AsyncData, Result } from "@swan-io/boxed";
import { useLocale, useTranslations } from "next-intl";
import { CSSProperties, FormEvent, useState } from "react";
import { hasDefinedKeys, useForm } from "react-ux-form";
import { P, match } from "ts-pattern";
import isEmail from "validator/lib/isEmail";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";
import { Text } from "../Text/Text";
import * as styles from "./NewsletterForm.css";

type Props = {
  autofocus?: boolean;
  className?: string;
  style?: CSSProperties;
  onSuccess?: () => void;
};

type FormResponseMessage =
  | "fetch_error"
  | "recaptcha_error"
  | "server_error"
  | "success"
  | "already_subscribed";

const NewsletterForm: React.FC<Props> = ({ className, style, autofocus = false, onSuccess }) => {
  const [requestState, setRequestState] = useState<AsyncData<Result<boolean, boolean>>>(
    AsyncData.NotAsked(),
  );
  const [focused, setFocused] = useState(false);
  const [formResponseMessage, setFormResponseMessage] = useState<FormResponseMessage | undefined>(
    undefined,
  );
  const locale = useLocale();
  const { executeRecaptcha } = useGoogleReCaptcha({ enabled: focused, language: locale });
  const t = useTranslations("components.NewsletterForm");
  const { Field, submitForm, FieldsListener, setFieldError } = useForm({
    email: {
      initialValue: "",
      strategy: "onSuccessOrBlur",
      sanitize: (value) => value.trim(),
      validate: async (value) => {
        if (value === "") {
          return t("email.empty");
        }

        // TODO: Replace with Zod schema
        if (!isEmail(value)) {
          return t("email.invalid");
        }

        return undefined;
      },
    },
    marketingOptIn: {
      initialValue: false,
      strategy: "onSuccessOrBlur",
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setRequestState(AsyncData.Loading());

    submitForm(
      async (values) => {
        if (!hasDefinedKeys(values, ["email"])) {
          setFieldError("email", t("email.empty"));
        }

        const recaptchaResponse = await executeRecaptcha("newsletter");
        const subscription = await request<
          NewsletterSubscriptionResponseSuccess,
          NewsletterSubscriptionResponseError
        >("/api/newsletter/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locale,
            marketing_opted_in: values.marketingOptIn,
            recaptcha_response: recaptchaResponse,
            email: values.email === "" ? undefined : values.email,
          }),
        });

        match(subscription)
          .with(Result.P.Ok(P.select()), ({ status }) => {
            setFormResponseMessage(status);
            setRequestState(AsyncData.Done(Result.Ok(true)));
            onSuccess?.();
          })
          .with(Result.P.Error(P.select({ code: "invalid_request_body" })), (response) => {
            response.errors?.forEach((error) => {
              if (error.field === "email") {
                const message =
                  error.message === "Required" ? t("email.empty") : t("email.invalid");
                setFieldError(error.field, message);
              }
            });

            setRequestState(AsyncData.Done(Result.Error(true)));
          })
          .with(Result.P.Error(P.select({ code: "recaptcha_validation_error" })), () => {
            setFormResponseMessage("recaptcha_error");
            setRequestState(AsyncData.Done(Result.Error(true)));
          })
          .with(Result.P.Error(P.select({ code: "unauthorized" })), () => {
            setFormResponseMessage("recaptcha_error");
            setRequestState(AsyncData.Done(Result.Error(true)));
          })
          .with(Result.P.Error(P.select({ code: "fetch_error" })), () => {
            setFormResponseMessage("fetch_error");
            setRequestState(AsyncData.Done(Result.Error(true)));
          })
          .with(Result.P.Error(P.select({ code: "server_error" })), () => {
            setFormResponseMessage("server_error");
            setRequestState(AsyncData.Done(Result.Error(true)));
          })
          .otherwise(() => {
            setFormResponseMessage("server_error");
            setRequestState(AsyncData.Done(Result.Error(true)));
          });
      },
      () => {
        setFormResponseMessage("fetch_error");
        setRequestState(AsyncData.Done(Result.Error(true)));
      },
    );
  };

  const setFormFocusState = () => {
    if (!focused) {
      setFocused(true);
    }
  };

  const isFormSubmitSuccess = match(requestState)
    .with(AsyncData.P.Done(Result.P.Ok(true)), () => true)
    .otherwise(() => false);

  return (
    <form onSubmit={onSubmit} className={cx(styles.form, className)} style={style}>
      <div className={styles.header}>
        <Text variant="title1" markup="h2" color="primary-500" className={styles.centeredText}>
          {t("headline")}
        </Text>
        <Text variant="body" className={styles.centeredText}>
          {t("subtitle")}
        </Text>
      </div>
      <div className={styles.inputsWrapper}>
        <div className={styles.inputWrapper}>
          <Field name="email">
            {({ value, error, onChange, onBlur }) => (
              <Input
                autoFocus={autofocus}
                value={value}
                label={t("email.label")}
                placeholder={t("email.placeholder")}
                errorMessage={error}
                onChange={onChange}
                onBlur={onBlur}
                isRequired={true}
                hideError={true}
                className={styles.input}
                onFocus={setFormFocusState}
              />
            )}
          </Field>
          <Field name="marketingOptIn">
            {({ value, onChange, onBlur }) => (
              <Checkbox
                isSelected={value}
                onChange={onChange}
                onBlur={onBlur}
                isDisabled={requestState.isLoading() || isFormSubmitSuccess}
              >
                {t("optIn.label")}
              </Checkbox>
            )}
          </Field>
        </div>
        <FieldsListener names={["email"]}>
          {({ email }) => (
            <div className={styles.buttonWrapper}>
              <Button
                type="submit"
                isLoading={requestState.isLoading()}
                isSuccess={isFormSubmitSuccess}
              >
                {t("subscribe")}
              </Button>
              {(email.error || formResponseMessage) && (
                <Text
                  variant="small"
                  markup="p"
                  className={styles.mention}
                  color={isFormSubmitSuccess ? "positive-500" : "negative-500"}
                >
                  {match([formResponseMessage, email.error])
                    .with([P._, P.string], ([, error]) => error)
                    .with(["fetch_error", P._], () => t("fetch_error"))
                    .with(["recaptcha_error", P._], () => t("recaptcha_error"))
                    .with(["server_error", P._], () => t("server_error"))
                    .with(["success", P._], () => t("success"))
                    .with(["already_subscribed", P._], () => t("already_subscribed"))
                    .with([P.nullish, P.nullish], () => null)
                    .exhaustive()}
                </Text>
              )}
            </div>
          )}
        </FieldsListener>
      </div>
      <div className={styles.mentionsWrapper}>
        <Text variant="small" markup="p" className={styles.mention} color="neutral-200">
          {t.rich("disclaimer", {
            privacy: (chunk) => (
              <Link
                href={{
                  pathname: "/[page_slug]",
                  params: {
                    page_slug: match(locale as Locale)
                      .with("fr", () => "politique-de-confidentialite")
                      .with("en", () => "privacy-policy")
                      .exhaustive(),
                  },
                }}
                style={{ display: "inline" }}
                className={styles.link}
              >
                {chunk}
              </Link>
            ),
          })}
        </Text>
        <Text variant="small" markup="p" className={styles.mention} color="neutral-200">
          {t.rich("google_disclaimer", {
            privacy: (chunk) => (
              <Text
                href="https://policies.google.com/privacy"
                style={{ display: "inline" }}
                target="_blank"
                className={styles.link}
              >
                {chunk}
              </Text>
            ),
            terms: (chunk) => (
              <Text
                href="https://policies.google.com/terms"
                style={{ display: "inline" }}
                target="_blank"
                className={styles.link}
              >
                {chunk}
              </Text>
            ),
          })}
        </Text>
      </div>
    </form>
  );
};

NewsletterForm.displayName = "NewsletterForm";

export default NewsletterForm;
