"use client";

import { Node, Orientation } from "@react-types/shared";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  AriaTabListProps,
  AriaTabPanelProps,
  AriaTabProps,
  mergeProps,
  useFocusRing,
  useHover,
  useTab,
  useTabList,
  useTabPanel,
} from "react-aria";
import { useInView } from "react-intersection-observer";
import { Item, TabListState, useTabListState } from "react-stately";
import { Grid } from "../Grid/Grid";
import { Icon } from "../Icon/Icon";
import { Section } from "../Section/Section";
import { Text } from "../Text/Text";
import * as styles from "./ReactEmailSection.css";

const Tab: React.FC<{
  item: Node<AriaTabProps>;
  state: TabListState<AriaTabProps>;
  orientation?: Orientation;
}> = ({ item, state }) => {
  const { key, rendered } = item;
  const ref = React.useRef(null);
  const { tabProps } = useTab({ key }, state, ref);
  const { isHovered, hoverProps } = useHover({});
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      {...mergeProps(tabProps, hoverProps, focusProps)}
      ref={ref}
      className={styles.tab({
        isHovered,
        isActive: state.selectedKey === item.key,
        isFocused: isFocusVisible,
      })}
    >
      <div className={styles.tabIconContainer}>
        <Icon name="check" className={styles.tabIcon} />
      </div>
      <Text variant="body" color="white-a100">
        {rendered}
      </Text>
    </div>
  );
};

Tab.displayName = "Tab";

const TabPanel: React.FC<AriaTabPanelProps & { state: TabListState<AriaTabProps> }> = ({
  state,
  ...props
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [ref, isVideoInViewport] = useInView();
  const { tabPanelProps } = useTabPanel(
    props,
    state,
    ref as unknown as React.RefObject<HTMLDivElement>,
  );

  useEffect(() => {
    const video = videoRef.current;

    if (isVideoInViewport && video) {
      video.play();
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [isVideoInViewport]);

  return (
    <div {...tabPanelProps} ref={ref} className={styles.videoContainer}>
      <video
        ref={videoRef}
        poster="/videos/poster.webp"
        muted={true}
        className={styles.video}
        loop={true}
      >
        <source src={`/videos/${state.selectedItem.key}.webm`} type="video/webm" />
        <source src={`/videos/${state.selectedItem.key}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

TabPanel.displayName = "TabPanel";

export const Tabs: React.FC<AriaTabListProps<AriaTabProps>> = (props) => {
  const state = useTabListState(props);
  const ref = React.useRef(null);
  const { tabListProps } = useTabList(props, state, ref);

  return (
    <>
      <div {...tabListProps} ref={ref}>
        <Grid>
          <div className={styles.tabsDummy} />
          {[...state.collection].map((item) => (
            <Tab key={item.key} item={item} state={state} />
          ))}
          <div className={styles.tabsDummy} />
        </Grid>
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </>
  );
};

Tabs.displayName = "Tabs";

export const ReactEmailSection: React.FC = () => {
  const t = useTranslations("pages.Dedale");
  const firstItemKey = "video";

  return (
    <Section>
      <Grid>
        <div className={styles.sectionTitleDummy} />
        <div className={styles.sectionTitleWrapper}>
          <Text markup="h2" variant="title1" color="white-a100" className={styles.centeredText}>
            {t("react_email_title")}
          </Text>
          <Text markup="p" variant="body" className={styles.centeredText}>
            {t("react_email_description")}
          </Text>
          <Link
            href="https://react.email/docs"
            target="_blank"
            rel="noopener noreferrer"
            title={t("react_email_explore_docs")}
            className={styles.reactEmailLink}
          >
            <Text variant="body-flat" color="primary-500" className={styles.reactEmailLinkText}>
              {t("react_email_explore_docs")}
              <Icon name="new_tab" className={styles.reactEmailLinkIcon} />
            </Text>
          </Link>
        </div>
        <div className={styles.sectionTitleDummy} />
      </Grid>
      <Tabs aria-label="History of Ancient Rome" defaultSelectedKey={firstItemKey}>
        <Item key={firstItemKey} title={t("react_email_tab1")}>
          <Text variant="body">{t("react_email_tab1")}</Text>
        </Item>
        <Item key="video2" title={t("react_email_tab2")}>
          <Text variant="body">{t("react_email_tab2")}</Text>
        </Item>
      </Tabs>
    </Section>
  );
};

ReactEmailSection.displayName = "ReactEmailSection";
