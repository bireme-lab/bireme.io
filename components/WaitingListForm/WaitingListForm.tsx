"use client";

import {
  WaitingListSubscriptionResponseError,
  WaitingListSubscriptionResponseSuccess,
} from "@/app/api/waiting-list/subscribe/route";
import { useGoogleReCaptcha } from "@/hooks/useGoogleReCaptcha";
import { cx } from "@/styles/mixins";
import { request } from "@/utils/request";
import { AsyncData, Result } from "@swan-io/boxed";
import { useLocale, useTranslations } from "next-intl";
import { CSSProperties, FormEvent, useState } from "react";
import { hasDefinedKeys, useForm } from "react-ux-form";
import { P, match } from "ts-pattern";
import isEmail from "validator/lib/isEmail";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Text } from "../Text/Text";
import * as styles from "./WaitingListForm.css";

type Props = {
  autofocus?: boolean;
  className?: string;
  style?: CSSProperties;
  onSuccess?: () => void;
  displayDisclaimer?: boolean;
};

type FormResponseMessage =
  | "fetch_error"
  | "recaptcha_error"
  | "server_error"
  | "success"
  | "already_subscribed";

const WaitingListForm: React.FC<Props> = ({
  className,
  style,
  autofocus = false,
  onSuccess,
  displayDisclaimer = false,
}) => {
  const [requestState, setRequestState] = useState<AsyncData<Result<boolean, boolean>>>(
    AsyncData.NotAsked(),
  );
  const [focused, setFocused] = useState(false);
  const [formResponseMessage, setFormResponseMessage] = useState<FormResponseMessage | undefined>(
    undefined,
  );
  const locale = useLocale();
  const { executeRecaptcha } = useGoogleReCaptcha({ enabled: focused, language: locale });
  const t = useTranslations("components.WaitingListForm");
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
          WaitingListSubscriptionResponseSuccess,
          WaitingListSubscriptionResponseError
        >("/api/waiting-list/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            locale,
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
      <div className={styles.container}>
        <Field name="email">
          {({ value, error, onChange, onBlur }) => (
            <Input
              hideLabel={true}
              label={t("email.label")}
              autoFocus={autofocus}
              value={value}
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
        <Button
          type="submit"
          isLoading={requestState.isLoading()}
          isSuccess={isFormSubmitSuccess}
          containerClassName={styles.buttonContainer}
          className={styles.button}
        >
          {t("subscribe")}
        </Button>
      </div>
      <FieldsListener names={["email"]}>
        {({ email }) => (
          <>
            {(email.error || formResponseMessage) && (
              <Text
                variant="body"
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
          </>
        )}
      </FieldsListener>
      {displayDisclaimer && (
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
      )}
    </form>
  );
};

WaitingListForm.displayName = "WaitingListForm";

export default WaitingListForm;
