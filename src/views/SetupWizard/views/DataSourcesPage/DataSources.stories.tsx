// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react';

import DataSources, { Props } from './DataSourcesPage';

export default {
  title: 'Pages/Datasources/DataSources',
  component: DataSources,
} as Meta;

const Template: Story<Props> = (args) => <DataSources {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
