import { Story, Meta } from '@storybook/react';
import { normalizationFormDefaultData } from '../../utils/normalizationFormDefaultData';
import Component, { Props } from './NormalizationForm';

export default {
  title: 'Pages/DataSource/NormalizationForm',
  component: Component,
} as Meta;

const Template: Story<Props> = (args) => <Component {...args} />;

export const Normalization = Template.bind({});
Normalization.args = normalizationFormDefaultData;
