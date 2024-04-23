import useOrganizationSettings from 'hooks/useOrganizationSettings';
import { Optional } from 'utils/typescript/types';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';

import AssignedToAnalysis from '../';
import { Props as AssignedToAnalysisProps } from '../AssignedToAnalysis';

type AssignedChartParams = Optional<AssignedToAnalysisProps, 'data'> & { chartSize: ChartSizes };

export function useAssignedToChartConfig({
  data = [],
  unassignedColor,
  label,
  chartSize
}: AssignedChartParams) {
  const { data: { ingestAssignee } = {} } = useOrganizationSettings();

  return {
    title: 'Assigned To',
    contentId: 'assigned-to-chart',
    Component: AssignedToAnalysis,
    data,
    size: chartSize,
    additionalProps: {
      unassignedColor,
      label,
    },
    shouldBeHidden: !ingestAssignee,
  };
}
