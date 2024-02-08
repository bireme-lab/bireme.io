import { Text } from "@/components/Text/Text";
import type { Meta, StoryObj } from "@storybook/react";
import { columnStyleExample } from "./Grid.css";

import { Grid } from "./Grid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Grid",
  component: Grid,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => (
    <div style={{ width: "calc(100vw - 2rem)" }}>
      <Grid style={{ background: "red" }}>
        <div className={columnStyleExample} style={{ background: "green" }}>
          <Text variant="title1">Grid</Text>
        </div>
      </Grid>
    </div>
  ),
};
