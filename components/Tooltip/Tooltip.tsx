"use client";

import { usePreviousValue } from "@/hooks/usePreviousValue";
import { cx } from "@/styles/mixins";
import { CSSProperties, PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import {
  mergeProps,
  useTooltip,
  useTooltipTrigger,
  type AriaTooltipProps,
  type TooltipTriggerProps,
} from "react-aria";
import { useTooltipTriggerState, type TooltipTriggerState } from "react-stately";
import * as styles from "./Tooltip.css";

const ANIMATION_DURATION = 300;

type TooltipState = "opened" | "closing" | "closed";

type Props = PropsWithChildren<
  {
    tooltip: () => ReactNode;
    tooltipClassName?: string;
    tooltipStyle?: CSSProperties;
    triggerClassName?: string;
    triggerStyle?: CSSProperties;
  } & TooltipTriggerProps
>;

export const TooltipTrigger: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TooltipState>(props.defaultOpen ? "opened" : "closed");
  const tooltipTriggerState = useTooltipTriggerState(props);
  const wasOpened = usePreviousValue(tooltipTriggerState.isOpen);

  useEffect(() => {
    if (!tooltipTriggerState.isOpen && wasOpened.current) {
      setState("closing");

      const timeout = setTimeout(() => {
        setState("closed");
      }, ANIMATION_DURATION);

      return () => {
        clearTimeout(timeout);
      };
    }

    if (tooltipTriggerState.isOpen) {
      setState("opened");
    }
    // I want to run this effect only when the tooltip state is opened or closed, wasOpened is used to trigger closing state for animation purposes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipTriggerState.isOpen]);

  const { triggerProps, tooltipProps } = useTooltipTrigger(props, tooltipTriggerState, ref);
  const isOpen = ["opened", "closing"].includes(state);

  return (
    <div className={styles.container}>
      <div ref={ref} className={props.triggerClassName} {...triggerProps}>
        {props.children}
      </div>
      {isOpen && (
        <Tooltip
          state={state}
          triggerState={{ ...tooltipTriggerState, isOpen }}
          className={props.tooltipClassName}
          style={props.tooltipStyle}
          {...tooltipProps}
        >
          {props.tooltip()}
        </Tooltip>
      )}
    </div>
  );
};

TooltipTrigger.displayName = "TooltipTrigger";

type TooltipProps = PropsWithChildren<
  {
    state: TooltipState;
    triggerState: TooltipTriggerState;
    className?: string;
    style?: CSSProperties;
  } & AriaTooltipProps
>;

const Tooltip: React.FC<TooltipProps> = ({ state, triggerState, className, ...props }) => {
  const { tooltipProps } = useTooltip(props, triggerState);

  return (
    <div className={cx(styles.tooltip({ state }), className)} {...mergeProps(tooltipProps, props)}>
      {props.children}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
