import {
  Meta,
  Story,
} from '@storybook/react';

import SettingsForm, { Props } from './SettingsForm';

export default {
  title: 'Pages/Datasource/SettingsForm',
  component: SettingsForm,
} as Meta;

const Template: Story<Props> = (args) => <SettingsForm {...args} />;

export const OrgSettingsStep = Template.bind({
  defaultValues: {
    initialDate: '2021-12-16 12:21:13',
    expression: "workItemType = 'Features'",
    blockersExpression: "state = 'inprogress'",
    discardedExpression: "state = 'Discarded'",
    includeChildrenExclude: false,
    includeChildrenBlockers: false,
    includeChildrenDiscarded: false,
  },
});

OrgSettingsStep.args = {
  submit: (values) => Promise.resolve(console.debug('stories: ', values)),
};
