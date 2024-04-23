import { isUndefined, values } from 'lodash';
import { SourcesOfDelayAndWasteData } from '../../interfaces/sourceOfDelay';

export const isSourcesOfDelayDataEmpty = (data: SourcesOfDelayAndWasteData | null): boolean => {
  if (!data) {
    return true;
  }

  const isEmpty: boolean = values(data).every(isUndefined);
  return isEmpty;
}
