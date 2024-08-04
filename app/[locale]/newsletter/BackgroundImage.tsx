"use client";

import { Image } from "@/components/Image/Image";
import { useEffect, useState } from "react";
import * as styles from "./page.css";

export const BackgroundImage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={styles.backgroundImageContainer}>
      <Image
        src="/images/waves.webp"
        className={styles.backgroundImage({ loaded })}
        alt=""
        fill={true}
        fetchPriority="high"
        priority={true}
      />
    </div>
  );
};

BackgroundImage.displayName = "BackgroundImage";
