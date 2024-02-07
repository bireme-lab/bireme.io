import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Text",
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      type: { name: "string", required: true },
      defaultValue: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui.",
      description: "The text to display",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: "Hello, World!",
  },
  render: (props) => (
    <>
      <Text variant="comment" {...props} />
      <Text variant="small-mono" {...props} />
      <Text variant="small-flat" {...props} />
      <Text variant="small" {...props} />
      <Text variant="paragraph" {...props} />
      <Text variant="section-heading" {...props} />
      <Text variant="heading3" {...props} />
      <Text variant="heading2" {...props} />
      <Text variant="heading1" {...props} />
    </>
  ),
};
