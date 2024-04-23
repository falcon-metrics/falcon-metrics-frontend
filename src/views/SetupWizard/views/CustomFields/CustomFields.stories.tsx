import { Story, Meta } from '@storybook/react';
import CustomFields, { Props } from './CustomFields';

export default {
  title: 'Pages/Datasource',
  component: CustomFields,
} as Meta;

const Template: Story<Props> = (args) => <CustomFields {...args} />;

export const CustomFieldsStep = Template.bind({});

CustomFieldsStep.args = {
  submit: (values) => Promise.resolve(console.debug('stories: ', values)),
};
