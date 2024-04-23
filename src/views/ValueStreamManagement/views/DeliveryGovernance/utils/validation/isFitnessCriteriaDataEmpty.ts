import { isUndefined, values } from 'lodash';
import { FitnessCriteriaData } from '../../interfaces/fitnessCriteria';

export const isFitnessCriteriaDataEmpty = (data: FitnessCriteriaData | null): boolean => {
  if (!data) {
    return true;
  }

  const isEmpty: boolean = values(data).every(isUndefined);
  return isEmpty;
}
