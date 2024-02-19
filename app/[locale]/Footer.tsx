"use client";

import { Button } from "@/components/Button/Button";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { Container } from "@/components/Container/Container";
import { Grid } from "@/components/Grid/Grid";
import { Icon } from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input";
import { Text } from "@/components/Text/Text";
import { isEmpty } from "@/utils/types";
import { AsyncData, Result } from "@swan-io/boxed";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useForm } from "react-ux-form";
import { match } from "ts-pattern";
import { isEmail } from "validator";
import * as styles from "./Footer.css";

export const resolveAfter = <T,>(delay: number, value?: T): Promise<T | void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

export const Footer: React.FC = () => {
  const [requestState, setRequestState] = useState<AsyncData<Result<boolean, boolean>>>(
    AsyncData.NotAsked(),
  );
  const t = useTranslations("components.Footer");
  const { Field, submitForm, FieldsListener } = useForm({
    email: {
      initialValue: "",
      strategy: "onSuccessOrBlur",
      sanitize: (value) => value.trim(),
      validate: async (value) => {
        if (value === "") {
          return t("form.email.empty");
        }

        if (!isEmail(value)) {
          return t("form.email.invalid");
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
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Icon name="logo_with_reflection" title={t("homepage")} className={styles.logo} />
        </Link>
        <Grid>
          <form onSubmit={onSubmit} className={styles.form}>
            <Text variant="title3" markup="h3">
              {t("headline")}
            </Text>
            <div className={styles.inputsWrapper}>
              <Field name="email">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    label={t("form.email.label")}
                    placeholder={t("form.email.placeholder")}
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
                    {t("form.optInContent.label")}
                  </Checkbox>
                )}
              </Field>
              <Field name="optInMarketing">
                {({ value, onChange, onBlur }) => (
                  <Checkbox isSelected={value} onChange={onChange} onBlur={onBlur}>
                    {t("form.optInMarketing.label")}
                  </Checkbox>
                )}
              </Field>
              <FieldsListener names={["email"]}>
                {({ email }) => (
                  <Button
                    type="submit"
                    showArrow={true}
                    isDisabled={
                      isEmpty(email.value) || !isEmail(email.value) || requestState.isLoading()
                    }
                    isLoading={requestState.isLoading()}
                    isSuccess={isFormSubmitSuccess}
                    className={styles.submitButton}
                  >
                    {t("form.subscribe")}
                  </Button>
                )}
              </FieldsListener>
            </div>
          </form>
        </Grid>
        <Grid>
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
        </Grid>
        <ul className={styles.legalLinks}>
          <li>
            <Text
              href="/mentions-legales"
              variant="small-flat"
              translateOnHover={true}
              color="primary-700"
            >
              {t("legal_links.legal_notice")}
            </Text>
          </li>
          <li>
            <Text
              href="/politique-de-confidentialite"
              variant="small-flat"
              translateOnHover={true}
              color="primary-700"
            >
              {t("legal_links.privacy_policy")}
            </Text>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

Footer.displayName = "Footer";
