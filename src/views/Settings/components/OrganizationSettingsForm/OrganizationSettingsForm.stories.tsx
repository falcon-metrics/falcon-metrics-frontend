import { Story, Meta } from '@storybook/react';
import { Props } from './OrganizationSettingsForm.data';
import OrganizationSettingsForm from './OrganizationSettingsForm';

export default {
  title: 'Pages/Datasource',
  component: OrganizationSettingsForm,
} as Meta;

const Template: Story<Props> = (args) => <OrganizationSettingsForm {...args} />;

export const OrgSettingsStep = Template.bind({});

OrgSettingsStep.args = {
  submit: (values) => Promise.resolve(console.debug('stories: ', values)),
};
