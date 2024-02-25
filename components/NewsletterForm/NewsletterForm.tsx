import { cx } from "@/styles/mixins";
import { isEmpty } from "@/utils/types";
import { AsyncData, Result } from "@swan-io/boxed";
import { useTranslations } from "next-intl";
import React, { CSSProperties, FormEvent, useState } from "react";
import { useForm } from "react-ux-form";
import { match } from "ts-pattern";
import { isEmail } from "validator";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Input } from "../Input/Input";
import { Text } from "../Text/Text";
import * as styles from "./NewsletterForm.css";

type Props = {
  autofocus?: boolean;
  className?: string;
  style?: CSSProperties;
};

const NewsletterForm: React.FC<Props> = ({ className, style, autofocus = false }) => {
  const [requestState, setRequestState] = useState<AsyncData<Result<boolean, boolean>>>(
    AsyncData.NotAsked(),
  );

  const t = useTranslations("components.NewsletterForm");
  const { Field, submitForm, FieldsListener } = useForm({
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
    optInContent: {
      initialValue: true,
      strategy: "onSuccessOrBlur",
    },
    optInMarketing: {
      initialValue: false,
      strategy: "onSuccessOrBlur",
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setRequestState(AsyncData.Loading());

    submitForm(
      async (values) => {
        await new Promise((resolve) => {
          setTimeout(() => resolve(true), 2000);
        });

        console.log("values", values);
        setRequestState(AsyncData.Done(Result.Ok(true)));
      },
      (errors) => {
        console.log("errors", errors);
      },
    );
  };

  const isFormSubmitSuccess = match(requestState)
    .with(AsyncData.P.Done(Result.P.Ok(true)), () => true)
    .otherwise(() => false);

  return (
    <form onSubmit={onSubmit} className={cx(styles.form, className)} style={style}>
      <Text variant="title3" markup="h3">
        {t("headline")}
      </Text>
      <div className={styles.inputsWrapper}>
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
            />
          )}
        </Field>
        <Field name="optInContent">
          {({ value, onChange, onBlur }) => (
            <Checkbox isSelected={value} onChange={onChange} onBlur={onBlur}>
              {t("optInContent.label")}
            </Checkbox>
          )}
        </Field>
        <Field name="optInMarketing">
          {({ value, onChange, onBlur }) => (
            <Checkbox isSelected={value} onChange={onChange} onBlur={onBlur}>
              {t("optInMarketing.label")}
            </Checkbox>
          )}
        </Field>
        <FieldsListener names={["email"]}>
          {({ email }) => (
            <Button
              type="submit"
              showArrow={true}
              isDisabled={isEmpty(email.value) || !isEmail(email.value) || requestState.isLoading()}
              isLoading={requestState.isLoading()}
              isSuccess={isFormSubmitSuccess}
              className={styles.submitButton}
            >
              {t("subscribe")}
            </Button>
          )}
        </FieldsListener>
      </div>
      <Text variant="small" markup="p" className={styles.mention} color="primary-700">
        {t.rich("disclaimer", {
          privacy: (chunk) => (
            <Text href="/" style={{ display: "inline" }}>
              {chunk}
            </Text>
          ),
          gdpr: (chunk) => (
            <Text
              href="https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique"
              style={{ display: "inline" }}
            >
              {chunk}
            </Text>
          ),
          asterisk: (chunk) => (
            <Text variant="small" color="negative-500">
              {chunk}
            </Text>
          ),
        })}
      </Text>
    </form>
  );
};

NewsletterForm.displayName = "NewsletterForm";

export default NewsletterForm;
