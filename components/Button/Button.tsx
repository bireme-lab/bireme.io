import { AriaButtonProps } from "react-aria";
import * as styles from "./Button.css";

export type ButtonVariant = "plain" | "outline";

type Props = Omit<AriaButtonProps, "elementType"> & {
  variant?: ButtonVariant;
};

export const Button: React.FC<Props> = ({ variant, children }) => {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button({ variant })}>{children}</button>
    </div>
  );
};

Button.displayName = "Button";
