import { AuthorSlug, authors } from "@/content/authors";
import { CSSProperties } from "react";
import { match } from "ts-pattern";
import { Avatar } from "../Avatar/Avatar";
import * as styles from "./Authors.css";

// Authors avatar
import antoine from "@/public/images/avatars/antoine.webp";
import fred from "@/public/images/avatars/fred.webp";
import { cx } from "@/styles/mixins";

type Props = {
  disableTooltips?: boolean;
  authorSlugs: AuthorSlug[];
  className?: string;
  style?: CSSProperties;
};

const getAuthorAvatar = (slug: AuthorSlug) => {
  return match(slug)
    .with("frederic-godin", () => fred)
    .with("antoine-lin", () => antoine)
    .exhaustive();
};

export const Authors: React.FC<Props> = ({ disableTooltips, authorSlugs, className, style }) => {
  const lastIndex = authorSlugs.length - 1;

  return (
    <div className={cx(styles.container, className)} style={style}>
      {authorSlugs.map((authorSlug, index) => {
        const author = authors[authorSlug];

        return (
          <div key={index} className={index !== 0 ? styles.authorWrapper : ""}>
            <Avatar
              src={getAuthorAvatar(author.slug)}
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
        );
      })}
    </div>
  );
};

Authors.displayName = "Authors";
