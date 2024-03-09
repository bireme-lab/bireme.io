"use client";

import { vars } from "@/styles/theme/index.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const NProgress: React.FC = () => {
  return (
    <ProgressBar
      height="0px"
      color={vars.color.secondary[500]}
      options={{ showSpinner: true }}
      shallowRouting
      delay={200}
    />
  );
};

NProgress.displayName = "NProgress";
