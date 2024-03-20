import { Text } from "@/components/Text/Text";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import * as styles from "./not-found.css";

const NotFound: React.FC = () => {
  const t = useTranslations("pages.NotFound");

  return (
    <div className={styles.container}>
      <Text markup="h1" variant="title1">
        {t("title")}
      </Text>
      <Text color="neutral-100" className={styles.description}>
        {t("content")}
      </Text>
      <Link href="/" className={styles.legalLink}>
        {t("get_back")}
      </Link>
    </div>
  );
};

export default NotFound;
