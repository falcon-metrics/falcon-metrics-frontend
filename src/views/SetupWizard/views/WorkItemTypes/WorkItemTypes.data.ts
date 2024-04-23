import fetch from 'core/api/fetch';
import postAndMutate from 'core/api/postAndMutate';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import withWizardFetcher, {
  getWizardApiUrl,
  WizardEndpoints,
} from 'views/SetupWizard/components/withWizardFetcher';
import Providers from 'views/SetupWizard/interfaces/Providers';

import {
  getUniqueStepIdentifier,
} from './components/DataTable/components/WorkItemTypeRow/components/StepRow/utils/getUniqueStepIdentifier';
import {
  DatabaseWorkItemType,
  DatabaseWorkItemTypeStep,
  ImportedStep,
  ImportedWorkItemType,
  SubmitResponseData,
  TransformedDatabaseWorkItemType,
  TransformedDatabaseWorkItemTypeStep,
} from './interfaces/interfaces';
import { getRowKey } from './utils/getRowKey';
import {
  getCategory,
  getCompositeIdForWorkFlowStep,
  getDatabaseStepFromImportedStep,
} from './utils/utils';
import WorkItemTypes from './WorkItemTypes';

const fetcher = (
  key: string,
): Promise<{ databaseData: DatabaseWorkItemType[], datasourceData: ImportedWorkItemType[]; }> => {
  // Fetch the saved config from the database
  const databaseFetcher = fetch.get<Required<DatabaseWorkItemType>[]>(key);
  // Fetch config for all projects from /statuses Jira API
  const datasourceFetcher = fetch.get<ImportedWorkItemType[]>(`${key}/import`);
  return Promise.all([datasourceFetcher, databaseFetcher]).then(
    ([datasourceValues, databaseValues]) => {
      return { databaseData: databaseValues.data, datasourceData: datasourceValues.data };
    },
  );
};
const WorkItemTypesPageWithData = withWizardFetcher(
  WorkItemTypes,
  fetcher,
  WizardEndpoints.workflows,
  {
    databaseData: [],
    datasourceData: [],
  },
  false,
  (provider: Providers, namespace: string, data: any) => {
    return postAndMutate<SubmitResponseData>(
      getWizardApiUrl(provider, namespace, WizardEndpoints.workflows),
      data,
    );
  },
);

export default WorkItemTypesPageWithData;

const emptyWorkItemType = {
  level: '',
  serviceLevelExpectationInDays: 0,
  arrivalId: '',
  commitmentId: '',
  departureId: '',
  isDistinct: false
};

export const combineDatabaseAndImportedData = (
  databaseValues: DatabaseWorkItemType[],
  importedValues: ImportedWorkItemType[],
  organisation?: string,
  ignoreIsDistinct = false
) => {
  console.log(ignoreIsDistinct);
  const transformedImportedValues = importedValues.map((values) => ({
    ...values,
  }));
  const transformedDatabaseValues = databaseValues.map(
    ({
      datasourceWorkItemId,
      arrivalPointOrder,
      commitmentPointOrder,
      departurePointOrder,
      steps,
      ...fields
    }) => {
      const getPointByOrder = (pointOrder: number) => {
        const step = steps.find(({ order }) => parseInt(order) === pointOrder);
        if (step) {
          return getCompositeIdForWorkFlowStep(step);
        }
        // Return undefined if step not found. Throwing error causes the UI to crash
      };
      return {
        ...fields,
        steps,
        id: datasourceWorkItemId,
        name: fields.displayName,
        arrivalId: getPointByOrder(arrivalPointOrder),
        commitmentId: getPointByOrder(commitmentPointOrder),
        departureId: getPointByOrder(departurePointOrder),
      };
    },
  );

  const transformedData: TransformedDatabaseWorkItemType[] = [];
  transformedImportedValues.forEach(
    ({ ...importedValue }) => {
      const importedSteps = importedValue.steps.map(
        getDatabaseStepFromImportedStep,
      );

      const shouldSplit = transformedDatabaseValues.filter(x => x.id === importedValue.id &&
        importedValue.projects.includes(x.projectId)).some(x => x.isDistinct);

      const projects = importedValue.projects.map((projectId, i) => ({
        id: projectId,
        name: importedValue.projectNames[i],
        isUnmapped: !transformedDatabaseValues.find(
          ({ projectId: dbProjectId, id: workflowId }) =>
            workflowId === importedValue.id && dbProjectId === projectId,
        ),
      }));
      if (shouldSplit && !ignoreIsDistinct) {
        projects.forEach(project => {
          const databaseValue = transformedDatabaseValues.find(
            ({ id, projectId }) =>
              id === importedValue.id && project.id === projectId
          );
          if (!databaseValue) {
            transformedData.push({
              ...emptyWorkItemType,
              ...importedValue,
              projects: [project],
              steps: importedSteps,
              displayName: importedValue.name,
              projectId: project.id,
              workflowId: slugify(`${databaseValues[0]?.orgId || organisation}.${project.id}.${importedValue.name}`).toLowerCase(),
              isDistinct: true
            });
          } else {
            const databaseSteps: TransformedDatabaseWorkItemTypeStep[] = combineDatabaseAndImportedSteps(
              databaseValue.steps,
              importedValue.steps,
            );
            //also add steps not in the database but in the record,
            //add at this step so that we can ensure that they go to the end of the line
            const databaseStepIds = databaseSteps.map(({ id }) => id);
            const importedStepsNotInDB = importedSteps.filter(
              ({ id }) => !databaseStepIds.includes(id),
            );
            const allSteps = [...databaseSteps, ...importedStepsNotInDB];
            transformedData.push({
              ...importedValue,
              projects: [project],
              ...databaseValue,
              name: importedValue.name,
              steps: allSteps,
              isDistinct: true
            });
          }
        });
      } else {
        const databaseValue = transformedDatabaseValues.find(
          ({ id, projectId }) =>
            id === importedValue.id &&
            importedValue.projects.includes(projectId ?? ''),
        );
        if (!databaseValue) {
          transformedData.push({
            ...emptyWorkItemType,
            ...importedValue,
            projects,
            steps: importedSteps,
            displayName: importedValue.name,
            projectId: importedValue.projects[0],
            workflowId: slugify(`${databaseValues[0]?.orgId || organisation}.${importedValue.projects[0]}.${importedValue.name}`).toLowerCase(),
            isDistinct: false
          });
        } else {
          const databaseSteps: TransformedDatabaseWorkItemTypeStep[] = combineDatabaseAndImportedSteps(
            databaseValue.steps,
            importedValue.steps,
          );
          //also add steps not in the database but in the record,
          //add at this step so that we can ensure that they go to the end of the line
          const databaseStepIds = databaseSteps.map(({ id }) => id);
          const importedStepsNotInDB = importedSteps.filter(
            ({ id }) => !databaseStepIds.includes(id),
          );
          const allSteps = [...databaseSteps, ...importedStepsNotInDB];
          transformedData.push({
            ...importedValue,
            projects,
            ...databaseValue,
            name: importedValue.name,
            steps: allSteps,
            isDistinct: false
          });
        }
      }
    },
  );
  return sortBy(transformedData, getRowKey);
};

export function combineDatabaseAndImportedSteps(
  databaseSteps: DatabaseWorkItemTypeStep[],
  importedSteps: ImportedStep[],
): TransformedDatabaseWorkItemTypeStep[] {
  return databaseSteps.map((step) => {
    const matchedStep = importedSteps.find(
      (importedStep) =>
        getUniqueStepIdentifier(importedStep) === getUniqueStepIdentifier(step),
    );
    const mergedStep = {
      ...step,
      ...matchedStep,
    };
    return {
      ...mergedStep,
      compositeId: getCompositeIdForWorkFlowStep(mergedStep),
      category: getCategory(mergedStep),
      isUnmapped: !matchedStep,
    };
  });
}
