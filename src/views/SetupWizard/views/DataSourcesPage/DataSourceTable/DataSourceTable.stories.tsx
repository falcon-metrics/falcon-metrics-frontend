import { Story, Meta } from '@storybook/react';

import DataSourceTable, { Props } from './DataSourceTable';

export default {
  title: 'Pages/Datasources/DataSourceTable',
  component: DataSourceTable,
} as Meta;

const dataset = [
  { id: 'demo', name: 'Demo Data', enable: true, visible: true },
  { id: 'sample-01', name: 'Sample Data', enable: false, visible: false },
];
const Template: Story<Props> = (args) => <DataSourceTable {...args} />;

export const SampleData = Template.bind({});
SampleData.args = {
  dataset,
};
