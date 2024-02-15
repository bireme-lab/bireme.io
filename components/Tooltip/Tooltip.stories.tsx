import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../Text/Text";

import { TooltipTrigger } from "./Tooltip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Tooltip",
  component: TooltipTrigger,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TooltipTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Hover me</Text>,
    tooltip: () => <Text>Bouuuuuh!</Text>,
    delay: 0,
    closeDelay: 0,
  },
  render: (props) => <TooltipTrigger {...props} />,
};
