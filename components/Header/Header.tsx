"use client";

import { Icon } from "@/components/Icon/Icon";
import { Text } from "@/components/Text/Text";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { match, P } from "ts-pattern";
import { Button } from "../Button/Button";
import { Container } from "../Container/Container";
import * as styles from "./Header.css";

type NavLinkProps = PropsWithChildren<{
  href: string;
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
          {match(pathname)
            .with(P.string.includes("/dedale"), () => (
              <Link href="/dedale" className={styles.logoLink}>
                <Icon name="dedale" title="Dédale" className={styles.dedaleLogo} />
              </Link>
            ))
            .otherwise(() => (
              <Link href="/" className={styles.logoLink}>
                <Icon name="logo" title={t("homepage")} className={styles.biremeLabLogo} />
              </Link>
            ))}
          <div className={styles.wrapper}>
            <ul className={styles.navLinks}>
              {match(pathname)
                .with(P.string.includes("/dedale"), () => (
                  <>
                    <li>
                      <NavLink href="https://docs.bireme.io">Docs</NavLink>
                    </li>
                    <li>
                      <NavLink href="https://docs.bireme.io/changelog/dedale">Changelog</NavLink>
                    </li>
                  </>
                ))
                .otherwise(() => (
                  <>
                    <li>
                      <NavLink href="https://docs.bireme.io">Docs</NavLink>
                    </li>
                  </>
                ))}
            </ul>
            {match(pathname)
              .with(P.string.includes("/dedale"), () => (
                <>
                  <Button variant="plain" size="small">
                    {t("test_for_free")}
                  </Button>
                </>
              ))
              .otherwise(() => null)}
          </div>
        </nav>
      </Container>
    </header>
  );
};

Header.displayName = "Header";
