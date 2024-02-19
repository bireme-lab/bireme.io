import { envs } from "@/publicEnvs";
import { PROTOCOL } from "@/utils/vars";
import { Fragment } from "react";
import { BreadcrumbList, WithContext } from "schema-dts";
import { Text } from "../Text/Text";
import * as styles from "./Breadcrumb.css";

export type Step = {
  url: string;
  label: string;
};

type Props = {
  steps: Step[];
};

export const Breadcrumb: React.FC<Props> = ({ steps }) => {
  const lastIndex = steps.length - 1;

  return (
    <>
      <div>
        {steps.map(({ label, url }, index) => (
          <Fragment key={label}>
            <Text
              href={url}
              title={label}
              variant="anchor-flat"
              translateOnHover={true}
              className={styles.link({ isLast: index === lastIndex })}
            >
              {label}
            </Text>
            {index !== lastIndex && (
              <Text variant="small-flat" color="primary-700" className={styles.separator}>
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
            itemListElement: steps.map(({ label, url }, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@id": url,
                name: label,
                url: `${PROTOCOL}://${envs.NEXT_PUBLIC_HOST}${url}`,
              },
            })),
          } as WithContext<BreadcrumbList>),
        }}
      />
    </>
  );
};

Breadcrumb.displayName = "Breadcrumb";
