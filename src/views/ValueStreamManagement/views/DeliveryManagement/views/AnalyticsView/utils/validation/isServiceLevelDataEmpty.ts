import { ServiceLevelData } from '../../interfaces/serviceLevel';

export const isServiceLevelDataEmpty = (data: ServiceLevelData | undefined): boolean => {
  if (!data) {
    return true;
  }

  const { normalisedDemands, workItemTypes } = data;

  const isEmpty: boolean =
    normalisedDemands.length === 0 &&
    workItemTypes.length === 0;

  return isEmpty;
}
