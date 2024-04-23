import { Story, Meta } from '@storybook/react';
import { v4 as uuid } from 'uuid';

import Component, { Props } from './Contexts';
import { Tree } from './Contexts.data';

export default {
  title: 'Pages/DataSource',
  component: Component,
} as Meta;

const dataset: Tree = [
  {
    positionInHierarchy: '1',
    contextId: uuid(),
    name: 'Parent',
    cost: 0,
    children: [
      {
        positionInHierarchy: '1.1',
        contextId: uuid(),
        name: 'Child - 1',
        children: [],
        cost: 0,
      },
      {
        positionInHierarchy: '1.2',
        contextId: uuid(),
        name: 'Child - 3',
        cost: 0,
        children: [
          {
            positionInHierarchy: '1.2.1',
            contextId: uuid(),
            name: 'Child - 4',
            cost: 0,
          },
        ],
      },
    ],
  },
  {
    positionInHierarchy: '1',
    contextId: uuid(),
    name: 'Sibling',
    cost: 0,
    children: [
      {
        positionInHierarchy: '1.1',
        contextId: uuid(),
        name: 'Child - 1',
        cost: 0,
        children: [],
      },
      {
        positionInHierarchy: '1.2',
        contextId: uuid(),
        name: 'Child - 3',
        cost: 0,
        children: [
          {
            positionInHierarchy: '1.2.1',
            contextId: uuid(),
            name: 'Child - 4',
            cost: 0,
          },
        ],
      },
    ],
  },
];

const Template: Story<Props> = (args) => <Component {...args} />;

export const ContextsPage = Template.bind({});
ContextsPage.args = { initialValues: dataset };
