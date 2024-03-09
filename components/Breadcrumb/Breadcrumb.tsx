import { Link } from "@/navigation";
import { envs } from "@/publicEnvs";
import { cx } from "@/styles/mixins";
import { pathnames } from "@/utils/i18n";
import { PROTOCOL } from "@/utils/vars";
import { ComponentProps, Fragment } from "react";
import { BreadcrumbList, WithContext } from "schema-dts";
import { Text } from "../Text/Text";
import { text as textStyle } from "../Text/Text.css";
import * as styles from "./Breadcrumb.css";

export type Step<Pathname extends keyof typeof pathnames = keyof typeof pathnames> = {
  label: string;
} & ComponentProps<typeof Link<Pathname>>;

type Props<Pathname extends keyof typeof pathnames> = {
  steps: Step<Pathname>[];
};

export function Breadcrumb<Pathname extends keyof typeof pathnames = keyof typeof pathnames>({
  steps,
}: Props<Pathname>) {
  const stepsLength = steps.length;
  const lastIndex = stepsLength - 1;

  if (stepsLength === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.container}>
        {steps.map(({ label, href }, index) => (
          <Fragment key={label}>
            <Link
              href={href}
              title={label}
              className={cx(
                textStyle({ variant: "body-flat" }),
                styles.link({ isLast: index === lastIndex }),
              )}
            >
              {label}
            </Link>
            {index !== lastIndex && (
              <Text
                variant="small-flat"
                color="primary-800"
                className={styles.separator}
                aria-hidden={true}
              >
                /
              </Text>
            )}
          </Fragment>
        ))}
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: steps.map(({ label, href }, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@id": href,
                name: label,
                url: `${PROTOCOL}://${envs.NEXT_PUBLIC_HOST}${href}`,
              },
            })),
          } as WithContext<BreadcrumbList>),
        }}
      />
    </>
  );
}

Breadcrumb.displayName = "Breadcrumb";
