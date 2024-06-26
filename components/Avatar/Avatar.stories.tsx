import fred from "@/public/images/avatars/fred.webp";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    src: fred,
    alt: "Fred",
    placeholder: "blur",
    firstName: "Fred",
    lastName: "Godin",
    position: "Co-fondateur",
    disableTooltip: false,
    twitterProfileUrl: "https://twitter.com/epimodev",
  },
  render: (props) => <Avatar {...props} />,
};
