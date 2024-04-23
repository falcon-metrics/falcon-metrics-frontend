import omit from 'lodash/omit';
import pick from 'lodash/pick';
import sortBy from 'lodash/sortBy';

import { TransformedDatabaseWorkItemType } from '../interfaces/interfaces';
import { filterChecked } from './utils';

const keysRelevantForDirtyAssesment: (keyof TransformedDatabaseWorkItemType)[] = [
  'id',
  'projects',
  'displayName',
  'level',
  'serviceLevelExpectationInDays',
  'steps',
  'arrivalId',
  'commitmentId',
  'departureId',
];
export const getValuesForComparison = (
  values: TransformedDatabaseWorkItemType[],
) => {
  const filteredValues = filterChecked(values);
  const parsedValues = filteredValues.map(getDataParsedForComparison);
  const pickedValues = parsedValues.map((v) =>
    pick(v, keysRelevantForDirtyAssesment),
  );
  return sortBy(pickedValues, keysRelevantForDirtyAssesment);
};

export const getDataParsedForComparison = ({
  serviceLevelExpectationInDays,
  steps,
  ...rest
}: TransformedDatabaseWorkItemType) => ({
  ...rest,
  steps: steps.map((s) => omit(s, ['workflowId', 'order'])),
  serviceLevelExpectationInDays: String(serviceLevelExpectationInDays),
});
