export const getTimeDistributionTitleByPerspective = (
  perspective: string
): string => {
  switch (perspective) {
    case 'past':
      return 'Lead Time Distribution';
    case 'present':
      return 'WIP Age Distribution';
    case 'future':
      return 'Inventory Age Distribution';
    default:
      return 'Time Distribution';
  }
};
