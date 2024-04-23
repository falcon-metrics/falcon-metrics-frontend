import { morphism } from 'morphism';
import { Story, Meta } from '@storybook/react';

import ProjectsPage, { Props } from './Projects';
import data from './interfaces/jira-projects.json';

export default {
  title: 'Pages/Datasource',
  component: ProjectsPage,
} as Meta;

const Template: Story<Props> = (args) => <ProjectsPage {...args} />;

const schema = {
  id: 'id',
  name: 'name',
};

const dataset = morphism(schema, data) as [];

export const ProjectsPageStep = Template.bind({});
ProjectsPageStep.args = { importedValues: dataset };
