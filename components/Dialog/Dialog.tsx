import { FocusableElement } from "@react-types/shared";
import { CSSProperties, DOMAttributes, PropsWithChildren, useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

export type DialogProps = PropsWithChildren<
  {
    header: (titleProps: DOMAttributes<FocusableElement>) => React.ReactNode;
    className?: string;
    style?: CSSProperties;
  } & AriaDialogProps
>;

export const Dialog: React.FC<DialogProps> = ({ header, className, style, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div ref={ref} {...dialogProps} className={className} style={style}>
      {header(titleProps)}
      {props.children}
    </div>
  );
};

Dialog.displayName = "Dialog";
