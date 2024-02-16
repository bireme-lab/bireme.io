import { Avatar } from "../Avatar/Avatar";
import type { ImageSrc } from "../Image/Image";
import * as styles from "./Authors.css";

type Props = {
  disableTooltips?: boolean;
  authors: {
    avatar: ImageSrc;
    firstName: string;
    lastName: string;
    position: string;
    twitterProfileUrl: string;
  }[];
};

export const Authors: React.FC<Props> = ({ disableTooltips, authors }) => {
  const lastIndex = authors.length - 1;

  return (
    <div className={styles.container}>
      {authors.map((author, index) => (
        <div key={index} className={styles.authorWrapper}>
          <Avatar
            src={author.avatar}
            placeholder="empty"
            alt={`${author.firstName} ${author.lastName}`}
            firstName={author.firstName}
            lastName={author.lastName}
            position={author.position}
            twitterProfileUrl={author.twitterProfileUrl}
            disableTooltip={disableTooltips}
            className={styles.author({ isLast: index === lastIndex })}
          />
        </div>
      ))}
    </div>
  );
};

Authors.displayName = "Authors";
