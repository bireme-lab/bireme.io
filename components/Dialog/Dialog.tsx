import { PropsWithChildren, cloneElement, useRef } from "react";
import { AriaDialogProps, useDialog } from "react-aria";

export const Dialog: React.FC<PropsWithChildren<AriaDialogProps>> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div ref={ref} {...dialogProps}>
      {cloneElement(props.children as React.ReactElement, { ...titleProps })}
    </div>
  );
};

Dialog.displayName = "Dialog";
