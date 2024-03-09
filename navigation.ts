import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { i18n, pathnames } from "./utils/i18n";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ ...i18n, pathnames });
