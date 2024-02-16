import antoine from "@/public/images/avatars/antoine.webp";
import fred from "@/public/images/avatars/fred.webp";
import type { Meta, StoryObj } from "@storybook/react";

import { Authors } from "./Authors";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Authors",
  component: Authors,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Authors>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    disableTooltips: false,
    authors: [
      {
        avatar: fred,
        firstName: "Fred",
        lastName: "Godin",
        position: "Co-fondateur",
        twitterProfileUrl: "https://twitter.com/epimodev",
      },
      {
        avatar: antoine,
        firstName: "Antoine",
        lastName: "Lin",
        position: "Co-fondateur",
        twitterProfileUrl: "https://twitter.com/imvahill",
      },
    ],
  },
  render: (props) => <Authors {...props} />,
};
