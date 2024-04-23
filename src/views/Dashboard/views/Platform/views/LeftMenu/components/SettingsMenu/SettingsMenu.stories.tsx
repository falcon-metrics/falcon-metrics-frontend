// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import SettingsMenu, { Props } from './SettingsMenu';

export default {
  title: 'Pages/Datasources/SettingsMenu',
  component: SettingsMenu,
} as Meta;

const Template: Story<Props> = (args) => <SettingsMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
