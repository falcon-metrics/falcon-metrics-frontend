import {
  FieldCount,
} from 'views/Dashboard/views/AnalyticsDashboard/interfaces/fieldCounts';

export const areEmptyFieldCounts = (groups: FieldCount[] | undefined): boolean => {
  if (!groups) {
    return true;
  }

  const areEmptyGroups: boolean = groups.every(
    ({ count }: FieldCount)=> count === 0
  );

  return areEmptyGroups;
}
