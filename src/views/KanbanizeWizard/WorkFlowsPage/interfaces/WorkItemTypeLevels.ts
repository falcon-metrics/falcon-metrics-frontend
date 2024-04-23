//If value is changed, should be updated in the database:
//In July 28th 2021 this is done through: UPDATE public."workItemTypes" set level = '<NEW-VALUE>' WHERE level in('<OLD-VALUE>')

import { WorkItemType } from 'core/api/ApiClient/WorkItemTypesClient';

enum WorkItemTypeLevels {
  portfolio = 'Portfolio',
  team = 'Team',
  individualContributor = 'Individual Contributor',
}

export const sortWorkItemTypeLevels = (levels: WorkItemType[]) => {
  const orderedLevels: WorkItemTypeLevels[] = Object.keys(
    WorkItemTypeLevels,
  ).map((key) => WorkItemTypeLevels[key]);
  const getIndex = (level: WorkItemTypeLevels) => orderedLevels.indexOf(level);
  return levels.sort((a, b) => getIndex(a.level) - getIndex(b.level));
};

export default WorkItemTypeLevels;
