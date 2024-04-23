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
import {
  getCategory,
  getCompositeIdForWorkFlowStep,
  getDatabaseStepFromImportedStep,
} from './utils/utils';
import WorkflowsPage from './WorkFlowsPage';

const fetcher = (
  key: string,
): Promise<{ databaseData: DatabaseWorkItemType[], datasourceData: ImportedWorkItemType[]; }> => {
  // Fetch the saved config from the database
  const databaseFetcher = fetch.get<Required<DatabaseWorkItemType>[]>(`${key}/kanbanize-workflows`);
  // Fetch config for all projects from /statuses Jira API
  const datasourceFetcher = fetch.get<ImportedWorkItemType[]>(`${key}/import`);
  return Promise.all([datasourceFetcher, databaseFetcher]).then(
    ([datasourceValues, databaseValues]) => {
      return { databaseData: databaseValues.data, datasourceData: datasourceValues.data };
    },
  );
};
const WorkItemTypesPageWithData = withWizardFetcher(
  WorkflowsPage,
  fetcher,
  WizardEndpoints.workflows,
  {
    databaseData: [],
    datasourceData: [],
  },
  false,
  (provider: Providers, namespace: string, data: any) => {
    return postAndMutate<SubmitResponseData>(
      getWizardApiUrl(provider, namespace, `${WizardEndpoints.workflows}/kanbanize-post`),
      data,
    );
  },
);

export default WorkItemTypesPageWithData;

const emptyWorkItemType = {
  serviceLevelExpectationInDays: 0,
  arrivalId: '',
  commitmentId: '',
  departureId: '',
};

export const combineDatabaseAndImportedData = (
  databaseValues: DatabaseWorkItemType[],
  importedValues: ImportedWorkItemType[],
  organisation?: string,
) => {
  const transformedImportedValues = importedValues.map((values) => ({
    ...values,
    datasourceWorkflowId: ''
  }));
  const transformedDatabaseValues = databaseValues.map(
    ({
      datasourceWorkItemId,
      steps,
      workspace,
      ...fields
    }) => {

      return {
        ...fields,
        steps,
        workspace,
        id: datasourceWorkItemId,
        name: fields.displayName
      };
    },
  );

  const transformedData: TransformedDatabaseWorkItemType[] = transformedImportedValues.map(
    ({ ...importedValue }) => {
      const importedSteps = importedValue.steps.map(
        getDatabaseStepFromImportedStep,
      );

      const databaseValue = transformedDatabaseValues.find(
        ({ datasourceWorkflowId }) =>
          datasourceWorkflowId === importedValue.id,
      );

      const projects = importedValue.projects.map((projectId, i) => ({
        id: projectId,
        name: importedValue.projectNames[i],
        isUnmapped: !transformedDatabaseValues.find(
          ({ projectId: dbProjectId, id: workflowId }) =>
            workflowId === importedValue.id && dbProjectId === projectId,
        ),
      }));

      if (!databaseValue) {
        return {
          ...emptyWorkItemType,
          ...importedValue,
          projects,
          steps: importedSteps,
          displayName: importedValue.name,
          projectId: importedValue.projects[0],
          workflowId: slugify(`${databaseValues[0]?.orgId || organisation}.${importedValue.projects[0]}.${importedValue.name}`).toLowerCase()
        };
      }
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
      return {
        ...importedValue,
        projects,
        ...databaseValue,
        id: importedValue.id,
        name: importedValue.name,
        steps: allSteps,
      };
    },
  );

  return sortBy(transformedData, "workspace");
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
