import { Story, Meta } from '@storybook/react';
import ProviderConnectionPage, { Props } from './ProviderConnectionPage';
import JiraCloudConnection from './interfaces/JiraCloudConnection';

export default {
  title: 'Pages/Datasource',
  component: ProviderConnectionPage,
} as Meta;

const Template: Story<Props> = (args) => <ProviderConnectionPage {...args} />;

export const ProviderConnectionPageStep = Template.bind({});

ProviderConnectionPageStep.args = {
  submit: (values) => Promise.resolve(console.debug(values)),
  connection: new JiraCloudConnection(),
};
