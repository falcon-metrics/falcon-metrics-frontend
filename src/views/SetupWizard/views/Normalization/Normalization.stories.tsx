import { Story, Meta } from '@storybook/react';
import Component, { Props } from './Normalization';

export default {
  title: 'Pages/DataSource',
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Normalization = Template.bind({});
