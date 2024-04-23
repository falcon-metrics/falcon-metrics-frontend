import { WithAuth0Props } from '@auth0/auth0-react';
import { Story, Meta } from '@storybook/react';
import RegistrationError from './RegistrationError';

export default {
  title: 'Pages/RegistrationError',
  component: RegistrationError,
} as Meta;

const Template: Story<WithAuth0Props> = (args) => (
  <RegistrationError {...args} />
);

export const Page = Template.bind({});
