import { Icon } from "@/components/Icon/Icon";
import * as styles from "./page.css";

export default function Home() {
  return (
    <main>
      <h1 className={styles.h1}>toto</h1>
      <div className={styles.page}>
        <Icon name="github" title="Github" />
      </div>
    </main>
  );
}
