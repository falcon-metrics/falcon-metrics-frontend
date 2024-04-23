// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import LoadingScreen from './LoadingScreen';

export default {
  title: 'Pages/LoadingScreen',
  component: LoadingScreen,
} as Meta;

const Template: Story = (args) => <LoadingScreen {...args} />;

export const Screen = Template.bind({});
