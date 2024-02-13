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
export const Variants: Story = {
  args: {
    children: "Hello, World!",
  },
  render: (props) => (
    <>
      <Text variant="comment" {...props} />
      <Text variant="small-mono" {...props} />
      <Text variant="small-flat" {...props} />
      <Text variant="small" {...props} />
      <Text variant="body" {...props} />
      <Text variant="section-heading" {...props} />
      <Text variant="title3" {...props} />
      <Text markup="h2" variant="title2" {...props} />
      <Text markup="h1" variant="title1" {...props} />
    </>
  ),
};

export const BlockNodes: Story = {
  args: {
    children: (
      <>
        <Text variant="comment">Super commentaire</Text>
        <Text markup="strong">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui.
        </Text>
      </>
    ),
  },
  render: (props) => (
    <>
      <Text {...props} />
    </>
  ),
};

export const InlineNodes: Story = {
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui.",
  },
  render: (props) => (
    <>
      <Text {...props} />
    </>
  ),
};

export const RelativeLink: Story = {
  render: () => (
    <Text href="https://google.com" translateOnHover>
      Revenir en arrière
    </Text>
  ),
};

export const AbsoluteLink: Story = {
  render: () => (
    <Text markup="p" style={{ maxWidth: 500 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue sapien ut ex pretium
      finibus. Mauris sed lorem interdum, tristique mi tristique, aliquam justo. Aliquam ut accumsan
      eros. Donec eu libero id est semper pretium eget vitae turpis. Fusce pharetra commodo ligula
      non consequat. Donec egestas a lectus laoreet luctus. Praesent efficitur sodales aliquam. Nunc
      quis lectus euismod nunc finibus ullamcorper eu eu ipsum. Nullam luctus, leo in cursus
      faucibus, purus lorem luctus ipsum, sit amet pretium magna risus id purus.{" "}
      <Text href="/#">This is a relative link with a long text to try with two lines.</Text> Donec
      id enim felis. Suspendisse euismod massa turpis, viverra tempor odio egestas sit amet.
      Praesent imperdiet blandit arcu, sit amet placerat nulla gravida quis. Aliquam laoreet nisi
      nec lacus laoreet molestie. Sed eleifend nec lectus a dapibus. Nullam felis elit, malesuada a
      congue sit amet, malesuada sed turpis. Vivamus interdum varius urna, mollis venenatis diam
      aliquet eu. Fusce sit amet dapibus mauris. Cras ornare rhoncus nunc vel facilisis. Etiam id ex
      cursus, facilisis ante ac, varius libero. Vestibulum sed lorem est. Cras vel enim vel nisi
      volutpat commodo.
    </Text>
  ),
};
