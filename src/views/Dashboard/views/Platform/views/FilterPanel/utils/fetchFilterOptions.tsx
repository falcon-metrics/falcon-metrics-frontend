import {
  IdropdownItems,
} from 'components/UI/FluentUI/BaseDropdown/BaseDropdown';
import fetch from 'core/api/fetch';
import {
  getCustomFields,
  getWorkItemTypes,
} from 'core/api/FetchConfigurations';
import camelCase from 'lodash/camelCase';
import sortBy from 'lodash/sortBy';
import startCase from 'lodash/startCase';
import uniq from 'lodash/uniq';
import {
  getWizardApiUrl,
  WizardEndpoints,
} from 'views/SetupWizard/components/withWizardFetcher/withWizardFetcher';
import Providers from 'views/SetupWizard/interfaces/Providers';
import {
  fetcher as normalizationFetch,
} from 'views/SetupWizard/views/Normalization/components/NormalizationForm/NormalizationForm.data';
import { DatabaseWorkItemType } from 'views/SetupWizard/views/WorkItemTypes';
import {
  sortWorkItemTypeLevels,
} from 'views/SetupWizard/views/WorkItemTypes/interfaces/WorkItemTypeLevels';

import { DropdownMenuItemType } from '@fluentui/react';

import {
  DropDownConfig,
} from '../views/FilterPanelContent/components/FilterDropdown/FilterDropdown';
import {
  FilterGroupConfig,
} from '../views/FilterPanelContent/components/FilterGroup/interfaces/FilterGroupConfig';
import { flatten } from 'lodash';

const datasourceCache: {
  loadedAt: Date | null;
  currentPromise: Promise<any> | null;
  data: { namespace: string; datasourceType: Providers; }[] | null;
} = {
  loadedAt: null,
  currentPromise: null,
  data: null,
};

async function fetchDatasources() {
  // Check if there is a datasource cache
  if (datasourceCache.data && datasourceCache.loadedAt) {
    // Check if it has been less than 10 seconds since it was loaded
    const secondsElapsed = ((new Date()).getTime() - datasourceCache.loadedAt.getTime()) / 1000;
    if (secondsElapsed < 10) {
      // Return the cached data source array
      return datasourceCache.data;
    }
  }

  // If there is no ongoing promise, create one
  if (!datasourceCache.currentPromise) {
    datasourceCache.currentPromise = fetch('/datasources');
  }

  // Wait for the ongoing promise to finish
  const response = await datasourceCache.currentPromise;

  datasourceCache.currentPromise = null;

  if (!response.data) {
    throw new Error("Missing datasource data");
  }

  if (!(response.data instanceof Array)) {
    throw new Error("Datasource endpoint did not return an array with sources");
  }

  if (response.data.length >= 0 && typeof response.data[0].namespace !== "string") {
    throw new Error("Datasource endpoint did not return valid array with namespace information");
  }

  const datasources: { namespace: string; datasourceType: Providers; }[] = response.data;

  datasourceCache.loadedAt = new Date();
  datasourceCache.data = datasources;
  return datasources;
}

const cacheForDevelopment: { [endpoint: string]: any; } = {};
const isDevEnv = process.env.NODE_ENV === 'development';
export async function fetchForEachDatasource<T>(
  endpoint: WizardEndpoints,
  fetcher: (url: string) => Promise<T>,
) {

  if (isDevEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${individualDatasourceDevelopmentCache[endpoint] ? 'cached' : 'uncached'}] fetchForEachDatasource: Endpoint "${endpoint}" requested`);
    if (cacheForDevelopment[endpoint]) {
      return cacheForDevelopment[endpoint];
    }
  }

  const dataSources = await fetchDatasources();
  const categoriesRaw: any[] = await Promise.all(
    dataSources.map(({ namespace, datasourceType }) => {
      if (!namespace) {
        return new Promise(resolve => resolve(null));
      }
      const url = getWizardApiUrl(datasourceType, namespace, endpoint);
      return fetcher(url) as Promise<T>;
    }),
  );

  const categories = categoriesRaw.filter(cat => cat !== null && cat !== undefined) as T[];

  // Populate cache to avoid sending a lot of requests to api while developing
  if (isDevEnv) {
    cacheForDevelopment[endpoint] = categories;
  }

  return categories;
}

export const normalizationFiltersFetcher = async (): Promise<FilterGroupConfig> => {
  const endpoint = WizardEndpoints.normalization;
  const fetcher = (url: string) => normalizationFetch(url).then(({ dataset }) => dataset);
  const normalizationListForEachDatasource = await fetchForEachDatasource(endpoint, fetcher);

  type Category = {
    key: string;
    fields: {
      id: string;
      displayName: string;
      flomatikaQuery: string;
      parsedQuery: string;
      contextId: null | string;
      datasourceId: string;
      orgId: string;
      target: number;
      SLE: number;
      tags?: string;
      colorHex: string;
      onlyIncludeChildren: boolean;
      alsoIncludeChildren: boolean;
      category: string;
      deletedAt?: null | string;
      isFavorite: boolean;
    }[];
  };

  const categories: Category[] = flatten(normalizationListForEachDatasource);
  const configs = categories
    .filter((category) => category.fields.length)
    .map((category) => {
      const customField: CustomFieldConfig = {
        displayName: startCase(category.key),
        key: category.key,
        options: category.fields.map((field) => ({
          key: field.id,
          text: field["filter"] || field["displayName"],
        }))
      };
      return customField;
    });
  return {
    title: 'Normalisation',
    groupKey: 'normalization',
    dropDownConfigCollection: getDropDownConfigsForVariableField(configs),
  };
};

const workFlowsFetcher = async () => {
  const fetcher = (url: string) =>
    fetch
      .get<Required<DatabaseWorkItemType>[]>(url)
      .then(({ data }) => data)
      .then((array) => array.flatMap((workItemType) => workItemType.steps))
      .then((steps) => steps.map(({ name }) => name))
      .then((namesArray) => sortBy(uniq(namesArray)));

  return fetchForEachDatasource(WizardEndpoints.workflows, fetcher);
};

export const workItemFiltersFetcher = async (): Promise<FilterGroupConfig> => {
  const workItemLevelDropDowmItems = [
    { key: 'Portfolio', text: 'Portfolio' },
    { key: 'Team', text: 'Team' },
    { key: 'Individual Contributor', text: 'Individual Contributor' },
  ];

  return Promise.all([getWorkItemTypes(), workFlowsFetcher(), fetchAssignees(), fetchResolutions()]).then(
    ([workItemTypes, workflows, assignees, resolutions]) => {
      const sortedWorkItemTypes = sortWorkItemTypeLevels(workItemTypes);

      return {
        title: 'Work Item',
        dropDownConfigCollection: {
          workItemLevels: {
            multiSelect: true,
            options: workItemLevelDropDowmItems,
          },
          workItemTypes: {
            multiSelect: true,
            options: getOptionsWithGrouping(sortedWorkItemTypes),
          },
          workflowSteps: {
            // Why is this a 2D array? Couldnt figure it out
            // It should be a 1D array according to the logic above
            options: workflows[0],
            multiSelect: true,
          },
          assignedTo: {
            multiSelect: true,
            options: assignees
          },
          resolution: {
            multiSelect: true,
            options: resolutions
          },
          flagged: {
            multiSelect: true,
            options: ['Yes', 'No']
          }
        },
      };
    },
  );
};

export const customFieldsFilterFetcher = async (): Promise<FilterGroupConfig> => {
  const { customFields } = await getCustomFields();

  const customFieldConfigs = customFields.map(
    ({ displayName, customFieldName, values }) => ({
      key: customFieldName,
      displayName,
      options: values,
      shouldShowEmptyOption: true,
      multiSelect: true,
    }),
  );

  return {
    title: 'Custom Filters',
    groupKey: 'customFields',
    dropDownConfigCollection: getDropDownConfigsForVariableField(
      customFieldConfigs,
    ),
  };
};

type ItemForGrouping = {
  id: string;
  name: string;
  level: string;
};

const getOptionsWithGrouping = (
  sortedItems: Array<ItemForGrouping>,
): IdropdownItems[] => {
  const dropdownItems = new Array<IdropdownItems>();
  let currLevel = '';
  const pushNormalItem = (workItemType: ItemForGrouping) =>
    dropdownItems.push({
      key: workItemType.id,
      text: workItemType.name,
      itemType: DropdownMenuItemType.Normal,
    });
  for (const workItemType of sortedItems) {
    if (currLevel === workItemType.level) {
      pushNormalItem(workItemType);
    } else {
      currLevel = workItemType.level;
      dropdownItems.push({
        key: currLevel,
        text: currLevel,
        itemType: DropdownMenuItemType.Header,
      });
      pushNormalItem(workItemType);
    }
  }
  return dropdownItems;
};

type CustomFieldConfig = {
  displayName: string;
  key: string;
} & Omit<DropDownConfig, 'emptyOptionPreffix' | 'onSelect'>;

const getDropDownConfigsForVariableField = (
  configs: CustomFieldConfig[],
  shouldUseSeparator = true,
) => {
  return configs.reduce((result, config) => {
    const { displayName, key, options, multiSelect = true, ...rest } = config;
    result[camelCase(displayName)] = {
      multiSelect,
      options: getDropDownOptionsForVariableField(
        key,
        options,
        shouldUseSeparator,
      ),
      emptyOptionPreffix: `${key}#`,
      ...rest,
    };
    return result;
  }, {} as Record<string, DropDownConfig>);
};

export const getDropDownOptionsForVariableField = (
  fieldName: string,
  options: string[] | Array<IdropdownItems>,
  shouldUseSeparator = true,
) =>
  options.map((option: string | IdropdownItems) => {
    const optionValue = typeof option === 'string' ? option : option.key;
    const key = shouldUseSeparator
      ? `${fieldName}#${optionValue}`
      : optionValue;
    const text = typeof option === 'string' ? option : option.text;
    return { key, text };
  });



export const fetchAssignees = async (): Promise<string[]> => {
  const endpoint = '/configuration/assignees';
  if (isDevEnv && cacheForDevelopment[endpoint]) {
    console.info(`Returning cached response for GET ${endpoint}`);
    return cacheForDevelopment[endpoint];
  }
  const result = await fetch(endpoint);
  const assignees = result.data ?? [];
  cacheForDevelopment[endpoint] = assignees;
  return assignees;
};

export const fetchResolutions = async (): Promise<string[]> => {
  const endpoint = '/configuration/resolutions';
  if (isDevEnv && cacheForDevelopment[endpoint]) {
    console.info(`Returning cached response for GET ${endpoint}`);
    return cacheForDevelopment[endpoint];
  }
  const result = await fetch(endpoint);
  const resolutions = result.data ?? [];
  cacheForDevelopment[endpoint] = resolutions;
  return resolutions;
};
