import fetch from 'core/api/fetch';
import ContextsPage from './Contexts';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import withWizardFetcher, { WizardEndpoints } from 'views/SetupWizard/components/withWizardFetcher';

export type Context = {
  contextAddress: string;
  contextId: string;
  createdAt: string;
  datasourceId: string;
  name: string;
  orgId: string;
  positionInHierarchy: string;
  projectId: string;
  updatedAt: string;
  cost?: number;
};

export type Option = {
  id: string;
  workspace: string;
  name: string;
  projects: string[];
};

export type TreeLevel<Children = undefined> = {
  positionInHierarchy: string;
  name: string;
  address?: string | string[];
  contextId: string;
  cost?: number;
} & (Children extends Record<string, unknown>
  ? {
    children: Children[];
  }
  : { children?: never; });

export type Tree = TreeLevel<TreeLevel<TreeLevel>>[];

const defaultDataset: Tree = [
  {
    positionInHierarchy: '1',
    name: 'Portfolio',
    contextId: uuid(),
    cost: 0,
    children: [
      {
        positionInHierarchy: '1.1',
        name: 'Initiative',
        contextId: uuid(),
        cost: 0,
        children: [
          {
            positionInHierarchy: '1.1.1',
            name: 'Team',
            contextId: uuid(),
            cost: 0,
          },
        ],
      },
    ],
  },
];

const fetcher = (key: string) => {
  const initialFetcher = fetch.get<Context[]>(key);
  const importFetcher = fetch.get<Option[]>(`${key}/import`);
  return Promise.all([importFetcher, initialFetcher]).then(
    ([importedValues, storedValues]): {
      options: Option[];
      initialValues: Tree;
    } => {
      const leaves = _.chain(storedValues.data)
        .filter(
          ({ positionInHierarchy }) =>
            positionInHierarchy.split('.').length === 3,
        )
        .map(({ positionInHierarchy, name, contextAddress, contextId, cost }) => ({
          positionInHierarchy,
          name,
          contextId,
          cost,
          address: contextAddress ? contextAddress.split(',') : [""],
        }))
        .sortBy(c => Number.parseInt(c.positionInHierarchy.split('.')[2]))
        .value();

      const branchs = _.chain(storedValues.data)
        .filter(
          ({ positionInHierarchy }) =>
            positionInHierarchy.split('.').length === 2,
        )
        .map(({ positionInHierarchy, name, contextAddress, contextId, cost }) => ({
          positionInHierarchy,
          name,
          address: contextAddress ? contextAddress.split(',') : [""],
          contextId,
          cost,
          children: leaves
            .filter(({ positionInHierarchy: positionInHierarchy_inner }) =>
              positionInHierarchy_inner.startsWith(`${positionInHierarchy}.`),
            )
        }))
        .sortBy(c => Number.parseInt(c.positionInHierarchy.split('.')[1]))
        .value();

      const root = _.chain(storedValues.data)
        .filter(
          ({ positionInHierarchy }) =>
            positionInHierarchy.split('.').length === 1,
        )
        .map(({ positionInHierarchy, name, contextId, cost }) => ({
          positionInHierarchy,
          name,
          contextId,
          cost,
          children: branchs
            .filter(({ positionInHierarchy: positionInHierarchy_inner }) =>
              positionInHierarchy_inner.startsWith(`${positionInHierarchy}.`),
            )
        }))
        .sortBy(c => Number.parseInt(c.positionInHierarchy.split('.')[0]))
        .value();
      // Sort the contexts by position in hierarchy
      root.sort((c1, c2) => c1.positionInHierarchy.localeCompare(c2.positionInHierarchy));

      return {
        options: importedValues.data,
        initialValues: root.length > 0 ? root : defaultDataset,
      };
    },
  );
};

const ContextsPageWithData = withWizardFetcher(
  ContextsPage,
  fetcher,
  WizardEndpoints.contexts,
  {
    options: [],
    initialValues: [],
  },
  false,
);

export default ContextsPageWithData;
