import {
  ImportedStep,
  KeyWorkflowEvents,
  QueueActive,
  TransformedDatabaseWorkItemType,
  TransformedDatabaseWorkItemTypeStep,
} from '../interfaces/interfaces';

export function getReorderedSteps<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
export const getCategory = (step: { category?: string; name?: string; }) =>
  (step.category ?? step.name ?? '').toLowerCase();


/**
 * This function builds a composite id for a workflow step. 
 * 
 * 
 * When a workflow step is edited in Jira to have a different name, 
 * there will be two steps with the same id but with different names
 * 
 * Example:
 * 
 * This workflow step was changed from capital case to lower case
 * But the id is still the same
 * 
 * - Before: 
 * `{id: 10001, name: "TO DO"}`
 * 
 * - After: 
 * `{id: 10001, name: "To Do"}`
 * 
 */
export const getCompositeIdForWorkFlowStep = (step: ImportedStep): string => {
  return `${step.id}#${step.name}`;
};

export const getDatabaseStepFromImportedStep = (
  remainStep: ImportedStep,
): TransformedDatabaseWorkItemTypeStep => ({
  ...remainStep,
  compositeId: getCompositeIdForWorkFlowStep(remainStep),
  category: getCategory(remainStep),
  isUnmapped: false,
  type: QueueActive.active,
});

export const filterChecked = (data: TransformedDatabaseWorkItemType[]) =>
  data.filter(({ projects }) => projects.some(({ isUnmapped }) => !isUnmapped));

export function getSubmitPayload(
  filteredValues: TransformedDatabaseWorkItemType[],
) {
  return filteredValues.map((value) => {
    const stepIds = value.steps.map(({ compositeId }) => compositeId);
    const getStepOrder = (key: keyof KeyWorkflowEvents) => {
      const order = stepIds.indexOf(value[key] ?? '');
      return order === -1 ? undefined : order;
    };
    return {
      ...value,
      serviceLevelExpectationInDays: Number(
        value.serviceLevelExpectationInDays,
      ),
      arrivalPointOrder: getStepOrder('arrivalId'),
      commitmentPointOrder: getStepOrder('commitmentId'),
      departurePointOrder: getStepOrder('departureId'),
    };
  });
}
