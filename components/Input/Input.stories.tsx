import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "louis.pasteur@gmail.com",
    errorMessage: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius turpis nibh, id aliquet dui feugiat ut. Nulla dictum accumsan mollis. Pellentesque lacus massa, tempus eu finibus a, elementum et lorem. Praesent at consectetur arcu, eget hendrerit dui. Quisque a ullamcorper risus.",
    hideError: false,
    isDisabled: false,
    isRequired: false,
    label: "Adresse email",
  },
  render: (props) => (
    <div style={{ width: 600, height: 400, padding: 50, backgroundColor: "#0E0E0E" }}>
      <Input {...props} />
      <Input {...props} />
    </div>
  ),
};
