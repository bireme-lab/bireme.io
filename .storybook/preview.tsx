import React from "react";
import type { Preview } from "@storybook/react";
import { Sprite } from "../components/Icon/Icon";
import "../design/theme.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Sprite />
        <Story />
      </>
    ),
  ],
};

export default preview;
