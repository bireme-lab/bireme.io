"use client";

import { usePreviousValue } from "@/hooks/usePreviousValue";
import { cx } from "@/styles/mixins";
import { useTranslations } from "next-intl";
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  AriaModalOverlayProps,
  Overlay,
  mergeProps,
  useFocusRing,
  useHover,
  useModalOverlay,
  usePress,
} from "react-aria";
import { OverlayTriggerState } from "react-stately";
import { Dialog } from "../Dialog/Dialog";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";
import * as styles from "./Sidepanel.css";

const ANIMATION_DURATION = 500;

type SidepanelProps = PropsWithChildren<
  {
    title: string;
    overlayTriggerState: OverlayTriggerState;
    close: () => void;
    style?: CSSProperties;
    className?: string;
  } & AriaModalOverlayProps
>;

type SidepanelState = "opened" | "closing" | "closed";

export const Sidepanel: React.FC<PropsWithChildren<SidepanelProps>> = ({
  title,
  overlayTriggerState,
  children,
  style,
  close,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const t = useTranslations("components.Sidepanel");
  const { isFocusVisible, focusProps } = useFocusRing();
  const { isHovered, hoverProps } = useHover({});
  const { isPressed, pressProps } = usePress({
    onPress: close,
  });
  const [state, setState] = useState<SidepanelState>("closed");
  const { modalProps, underlayProps } = useModalOverlay(
    props,
    {
      ...overlayTriggerState,
      isOpen: state === "opened",
    },
    ref,
  );
  const wasOpened = usePreviousValue(overlayTriggerState.isOpen);

  useEffect(() => {
    if (!overlayTriggerState.isOpen && wasOpened.current) {
      setState("closing");

      const timeout = setTimeout(() => {
        setState("closed");
      }, ANIMATION_DURATION);

      return () => {
        clearTimeout(timeout);
      };
    }

    if (overlayTriggerState.isOpen) {
      setState("opened");
    }
    // I want to run this effect only when the tooltip state is opened or closed, wasOpened is used to trigger closing state for animation purposes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayTriggerState.isOpen]);

  const isOpen = ["opened", "closing"].includes(state);

  return (
    <>
      {isOpen && (
        <Overlay>
          <div className={styles.overlay({ state })} {...underlayProps}>
            <div {...modalProps} style={style} ref={ref}>
              <Dialog
                className={cx(styles.container({ state }), className)}
                style={style}
                header={(titleProps) => (
                  <header className={styles.header} {...titleProps}>
                    <Text variant="small-mono">{title}</Text>
                    <div
                      role="button"
                      tabIndex={0}
                      className={styles.close({
                        isHovered,
                        isFocused: isFocusVisible,
                        isPressed,
                      })}
                      {...mergeProps(hoverProps, focusProps, pressProps)}
                    >
                      <Icon name="cross" title={t("close")} className={styles.closeIcon} />
                    </div>
                  </header>
                )}
              >
                {children}
              </Dialog>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

Sidepanel.displayName = "Sidepanel";
