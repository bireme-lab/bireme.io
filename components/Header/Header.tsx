"use client";

import { Icon } from "@/components/Icon/Icon";
import { Text } from "@/components/Text/Text";
import { Link } from "@/navigation";
import { Pathname } from "@/utils/i18n";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { match, P } from "ts-pattern";
import { Container } from "../Container/Container";
import * as styles from "./Header.css";

type NavLinkProps = PropsWithChildren<{
  href: Pathname;
}>;

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link href={href} className={styles.navLink}>
      <Text variant="small-flat" color="inherit">
        {children}
      </Text>
    </Link>
  );
};

export const Header: React.FC = () => {
  const t = useTranslations("components.Header");

  const pathname = usePathname();

  return (
    <header>
      <Container variant="header" className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoLink}>
            {match(pathname)
              .with(P.string.includes("/dedale"), () => (
                <Icon name="dedale" title="Dédale" className={styles.dedaleLogo} />
              ))
              .otherwise(() => (
                <Icon name="logo" title={t("homepage")} className={styles.biremeLabLogo} />
              ))}
          </Link>
          {/* <div className={styles.wrapper}>
            <ul className={styles.navLinks}>
              {match(pathname)
                .with(P.string.includes("/dedale"), () => (
                  <>
                    <li>
                      <NavLink href="/">
                        Docs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/">
                        Changelog
                      </NavLink>
                    </li>
                  </>
                ))
                .otherwise(() => (
                  <>
                    <li>
                      <NavLink href="/">
                        Docs
                      </NavLink>
                    </li>
                  </>
                ))}
            </ul>
            {match(pathname)
              .with(P.string.includes("/dedale"), () => (
                <>
                  <Button variant="plain" size="small">Essayer gratuitement</Button>
                </>
              ))
              .otherwise(() => null)}
          </div> */}
        </nav>
      </Container>
    </header>
  );
};

Header.displayName = "Header";
