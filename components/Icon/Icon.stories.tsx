import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "./Icon";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Icon",
  component: Icon,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    name: {
      type: { name: "string", required: true },
      defaultValue: "github",
      description: "The name of the icon to display",
    },
    title: {
      type: { name: "string", required: true },
      defaultValue: "Github",
      description: "The title of the icon",
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Github: Story = {
  args: {
    name: "github",
    title: "Github",
  },
};
