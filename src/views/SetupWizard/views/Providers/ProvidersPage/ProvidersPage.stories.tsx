import { Story, Meta } from '@storybook/react';
import ProvidersPage from './ProvidersPage';

export default {
  title: 'Pages/Datasources',
  component: ProvidersPage,
} as Meta;

const Template: Story = (args) => <ProvidersPage {...args} />;

export const ProvidersPageTemplate = Template.bind({});

ProvidersPageTemplate.args = {};
