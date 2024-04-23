import { Story, Meta } from '@storybook/react';
import SignupPage, { Props } from './SignupPage';

export default {
  title: 'Pages/Signup',
  component: SignupPage,
} as Meta;

const Template: Story<Props> = (args) => <SignupPage {...args} />;

export const Page = Template.bind({ onSubmit: console.debug });
