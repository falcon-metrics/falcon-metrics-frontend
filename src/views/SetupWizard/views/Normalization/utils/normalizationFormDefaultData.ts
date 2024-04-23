import NormalizationCategories, { fixedNormalizationCategoriesDisplayNameRecord } from '../interfaces/NormalizationCategories';
import { Category, FormData } from '../interfaces/FormData';
import { getRoundedTarget } from '../components/NormalizationForm/utils/getRoundedTarget';
import cloneDeep from 'lodash/cloneDeep';

export const normalizationFormDefaultData: FormData = {
  dataset: [
    {
      key: NormalizationCategories.DEMAND,
      displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.DEMAND],
      fields: [
        {
          id: '1',
          displayName: 'Features',
          flomatikaQuery:
            "workItemType = 'Squad Backlog Item' OR workItemType = 'Feature' OR workItemType = 'Release' OR workItemType = 'Epic'",
          SLE: 0,
          colorHex: '#008674',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        {
          id: '2',
          displayName: 'Risks & Compliances',
          flomatikaQuery:
            "workItemType = 'Project Risk' OR workItemType = 'Project Issue'",
          SLE: 0,
          colorHex: '#F2C75C',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        {
          id: '3',
          displayName: 'Enhancements & Optimisations',
          flomatikaQuery:
            "workItemType = 'Work Items' OR workItemType = 'Features Collection'",
          SLE: 0,
          colorHex: '#64CCC9',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        {
          id: '4',
          displayName: 'Enablers & Tech Debt',
          flomatikaQuery: "workItemType = 'Bug'",
          SLE: 0,
          colorHex: '#003594',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        {
          id: '5',
          displayName: 'Defects & Incidents',
          flomatikaQuery: "workItemType = 'release' OR workItemType = 'Feature'",
          SLE: 0,
          colorHex: '#FF585D',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        // {
        //   id: '6',
        //   displayName: 'Management Activities',
        //   flomatikaQuery:
        //     "workItemType = 'Project risk' OR workItemType = 'Project issue'",
        //   colorHex: '#99C9E9',
        //   alsoIncludeChildren: false,
        //   onlyIncludeChildren: false,
        // },
      ],
    },
    {
      key: NormalizationCategories.QUALITY,
      displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.QUALITY],
      fields: [
        {
          id: '1',
          displayName: 'Value Demand',
          flomatikaQuery:
            "workItemType = 'epic' OR workItemType = 'feature' OR workItemType = 'Work items' OR workItemType = 'Features collection' OR workItemType = 'features collection' OR workItemType = 'squad backlog item' OR workItemType = 'release'",
          colorHex: '#00BEB2',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        {
          id: '2',
          displayName: 'Non-Value Demand',
          flomatikaQuery:
            "workItemType = 'project risk' OR workItemType = 'project issue'",
          colorHex: '#F5AF3E',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
        {
          id: '3',
          displayName: 'Failure Demand',
          flomatikaQuery: "workItemType = 'Bug'",
          colorHex: '#FF585D',
          alsoIncludeChildren: false,
          onlyIncludeChildren: false,
        },
      ],
    },
    // {
    //   key: NormalizationCategories.CLASS_OF_SERVICE,
    //   displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.CLASS_OF_SERVICE],
    //   fields: [
    //     {
    //       id: '1',
    //       displayName: 'Expedite',
    //       flomatikaQuery: "workItemType = 'Bug'",
    //       colorHex: '#E03C31',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '2',
    //       displayName: 'Fixed Date',
    //       flomatikaQuery: "workItemType = 'release' OR workItemType = 'Feature'",
    //       colorHex: '#10CFC9',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '3',
    //       displayName: 'Intangible',
    //       flomatikaQuery: "workItemType = 'release'",
    //       colorHex: '#A2C4C9',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '4',
    //       displayName: 'Standard',
    //       flomatikaQuery:
    //         "workItemType = 'epic' OR workItemType = 'feature' OR workItemType = 'Work items' OR workItemType = 'Features collection' OR workItemType = 'features collection' OR workItemType = 'squad backlog item' OR workItemType = 'release'",
    //       colorHex: '#00BFB2',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //   ],
    // },
    // {
    //   key: NormalizationCategories.VALUE_AREA,
    //   displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.VALUE_AREA],
    //   fields: [
    //     {
    //       id: '1',
    //       displayName: 'Business',
    //       flomatikaQuery: "workItemType = 'squad backlog item'",
    //       colorHex: '#6686BF',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '2',
    //       displayName: 'Architecture',
    //       flomatikaQuery: "workItemType = 'DevOps'",
    //       colorHex: '#850094',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '3',
    //       displayName: 'Customer',
    //       flomatikaQuery: "workItemType = 'release' OR workItemType = 'Feature'",
    //       colorHex: '#00BEB2',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '4',
    //       displayName: 'Infrastructure',
    //       flomatikaQuery: "workItemType = 'release'",
    //       colorHex: '#F2C75C',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //   ],
    // },
    // {
    //   key: NormalizationCategories.PLANNED_UNPLANNED,
    //   displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.PLANNED_UNPLANNED],
    //   fields: [
    //     {
    //       id: '1',
    //       displayName: 'Planned',
    //       flomatikaQuery: "workItemType = 'release' OR workItemType = 'Feature'",
    //       colorHex: '#00BFB2',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '2',
    //       displayName: 'Unplanned',
    //       flomatikaQuery: "workItemType = 'Bug'",
    //       colorHex: '#E03C31',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //   ],
    // },
    // {
    //   key: NormalizationCategories.REFUTABLE_IRREFUTABLE,
    //   displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.REFUTABLE_IRREFUTABLE],
    //   fields: [
    //     {
    //       id: '1',
    //       displayName: 'Refutable',
    //       flomatikaQuery: "workItemType = 'release' OR workItemType = 'Feature'",
    //       colorHex: '#0BFB2',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '2',
    //       displayName: 'Irrefutable',
    //       flomatikaQuery: "workItemType = 'Bug'",
    //       colorHex: '#E03C31',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //   ],
    // },
    // {
    //   key: NormalizationCategories.DELAYABLE_NONDELAYABLE,
    //   displayName: fixedNormalizationCategoriesDisplayNameRecord[NormalizationCategories.DELAYABLE_NONDELAYABLE],
    //   fields: [
    //     {
    //       id: '1',
    //       displayName: 'Delayable',
    //       flomatikaQuery: "workItemType = 'release' OR workItemType = 'Feature'",
    //       colorHex: '#00BFB2',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //     {
    //       id: '2',
    //       displayName: 'Non-delayable',
    //       flomatikaQuery: "workItemType = 'Bug'",
    //       colorHex: '#E03C31',
    //       alsoIncludeChildren: false,
    //       onlyIncludeChildren: false,
    //     },
    //   ],
    // },
  ],
};

export const getDefaultCategoriesWithoutQueries = () => {
  const result: Category[] = [];
  for (const originCategory of normalizationFormDefaultData.dataset) {
    const category: Category = {
      key: originCategory.key,
      displayName: originCategory.displayName,
      fields: originCategory.fields.map(field => ({
        id: field.id,
        displayName: field.displayName,
        flomatikaQuery: '',
        parsedQuery: field.parsedQuery,
        contextId: field.contextId,
        datasourceId: field.datasourceId,
        orgId: field.orgId,
        target: getRoundedTarget(originCategory.fields.length),
        SLE: field.SLE,
        tags: field.tags || ('normalisation, ' + originCategory.key),
        colorHex: field.colorHex,
        alsoIncludeChildren: field.alsoIncludeChildren,
        onlyIncludeChildren: field.onlyIncludeChildren,
      }))
    }
    result.push(category);
  }
  return result;
};

export const getDefaultEmptyCategories = () => {
  const defaultData = cloneDeep(normalizationFormDefaultData);
  return defaultData.dataset.map((category) => ({
    ...category,
    fields: [],
  }));
};
