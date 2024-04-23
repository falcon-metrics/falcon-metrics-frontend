import { AssignedToDatum, ProfileOfWorkData, WorkItemGroupCount} from '../../interfaces/profileOfWork';

const isWorkItemGroupEmpty = (group: WorkItemGroupCount | undefined): boolean => {
  if (!group) {
    return true;
  }

  return group.count === 0;
}

export const areWorkItemGroupsEmpty = (groups: WorkItemGroupCount[] | undefined): boolean => {
  if (!groups) {
    return true;
  }

  if (groups.length === 0) {
    return true;
  }

  return groups.every(isWorkItemGroupEmpty);
}

export const isAssignedToEmpty = (data: AssignedToDatum[] | undefined): boolean => {
  if (!data) {
    return true;
  }

  if (data.length === 0) {
    return true;
  }

  const isEmpty: boolean = data.every(
    ({ workItems }: AssignedToDatum) => workItems.length === 0
  );

  return isEmpty;
}

export const isProfileOfWorkDataEmpty = (data: ProfileOfWorkData | undefined): boolean => {
  if (!data) {
    return true;
  }

  if (!data.systemFields) {
    return true;
  }

  return false;
}
