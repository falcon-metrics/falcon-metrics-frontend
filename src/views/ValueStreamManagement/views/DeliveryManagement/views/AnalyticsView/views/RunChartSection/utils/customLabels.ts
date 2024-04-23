import { AggregationKey } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';

export const getRunChartTitleByPerspective = (
  perspective: string
): string => {
  switch (perspective) {
    case 'past':
      return 'Throughput';
    case 'present':
      return 'Work in Progress';
    case 'future':
      return 'Inventory';
    default:
      return 'Run Chart';
  }
};

export const getRunChartTooltipByPerspective = (
  perspective: string,
  aggregation: AggregationKey,
  isRateChart: boolean,
): string => {
  const dateLabel = aggregation === 'day'
    ? '%kt'
    : `the ${aggregation} of %kt`
  
  const datePreposition = aggregation === 'day'
    ? 'on'
    : 'in';

  switch (perspective) {
    case 'past': {
      const pastTooltip = isRateChart
        ? `%vt flow items completed ${datePreposition} ${dateLabel}`
        : `A total of %vt flow items have been completed by ${dateLabel}`;

      return pastTooltip;
    }
    case 'present': {
      const presentTooltip = isRateChart
        ? `%vt flow items entered into WIP ${datePreposition} ${dateLabel}`
        : `%vt total flow items in progress ${datePreposition} ${dateLabel}`;

      return presentTooltip;
    }
    case 'future': {
      const futureTooltip = isRateChart
        ? `%vt flow items were added to the inventory ${datePreposition} ${dateLabel}`
        : `%vt total flow items in inventory ${datePreposition} ${dateLabel}`;

      return futureTooltip;
    }
    default: {
      const defaultTooltip = isRateChart
        ? `%vt flow items completed ${datePreposition} ${dateLabel}`
        : `A total of %vt flow items have been completed by ${dateLabel}`;

      return defaultTooltip;
    }
  }
}
