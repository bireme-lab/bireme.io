import { envs } from "@/publicEnvs";
import { PROTOCOL } from "@/utils/vars";
import { Fragment } from "react";
import { BreadcrumbList, WithContext } from "schema-dts";
import { Text } from "../Text/Text";
import * as styles from "./Breadcrumb.css";

export type Step = {
  href: string;
  label: string;
};

type Props = {
  steps: Step[];
};

export const Breadcrumb: React.FC<Props> = ({ steps }) => {
  const stepsLength = steps.length;
  const lastIndex = stepsLength - 1;

  if (stepsLength === 0) {
    return null;
  }

  return (
    <>
      <div style={{ display: "inline-flex" }}>
        {steps.map(({ label, href }, index) => (
          <Fragment key={label}>
            <Text
              href={href}
              title={label}
              variant="anchor-flat"
              className={styles.link({ isLast: index === lastIndex })}
            >
              {label}
            </Text>
            {index !== lastIndex && (
              <Text
                variant="small-flat"
                color="primary-800"
                className={styles.separator}
                aria-hidden={true}
              >
                //
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
};

Breadcrumb.displayName = "Breadcrumb";
