import { Breadcrumb, Step } from "@/components/Breadcrumb/Breadcrumb";
import { Container } from "@/components/Container/Container";
import { CustomMDX } from "@/components/CustomMDX/CustomMDX";
import { Grid } from "@/components/Grid/Grid";
import { TableOfContent } from "@/components/TableOfContent/TableOfContent";
import { Text } from "@/components/Text/Text";
import { cx } from "@/styles/mixins";
import { Locale } from "@/utils/i18n";
import * as MDX from "@/utils/mdx";
import { Option } from "@swan-io/boxed";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { P, match } from "ts-pattern";
import * as styles from "./page.css";

type PageParams = {
  params: {
    page_slug: string;
    locale: Locale;
  };
};

export const generateStaticParams = async ({ params }: PageParams) => {
  return match(await MDX.Page.all(params.locale))
    .with(Option.P.Some(P.select()), (pages) =>
      pages.filter((page) => !["home", "accueil"].includes(page.slug)).map((page) => page.slug),
    )
    .otherwise(() => []);
};

export const generateMetadata = async ({ params }: PageParams) => {
  const page = await MDX.Page.findBySlug(params.page_slug, params.locale);

  return match(page)
    .with(Option.P.Some(P.select()), (page) => ({
      title: page.title,
    }))
    .otherwise(() => {});
};

const Page = async ({ params }: PageParams) => {
  unstable_setRequestLocale(params.locale);

  const t = await getTranslations("pages.Page");
  const page = await MDX.findPageBySlugOrNotFound(params.page_slug, params.locale);

  const breadcrumbSteps: Step[] = [
    {
      label: t("breadcrumb.homepage"),
      href: "/",
    },
    {
      label: page.title,
      href: MDX.generateHref(params.page_slug, params.locale, "Page"),
    },
  ];

  return (
    <Container>
      <Breadcrumb steps={breadcrumbSteps} />
      <Grid className={styles.grid}>
        <div className={styles.threeCols}>
          <TableOfContent headings={page.headings} />
        </div>
        <div className={cx(styles.fiveCols, styles.postBodyWrapper)}>
          <Text markup="h1" variant="title1" className={styles.title}>
            {page.title}
          </Text>
          <CustomMDX source={page.body} />
        </div>
      </Grid>
    </Container>
  );
};

export default Page;
