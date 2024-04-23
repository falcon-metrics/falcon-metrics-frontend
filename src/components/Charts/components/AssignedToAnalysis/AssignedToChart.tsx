import useOrganizationSettings from 'hooks/useOrganizationSettings';
import { Optional } from 'utils/typescript/types';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard, {
  ChartConfigFlags,
} from '../DefaultDashboardCard';
import AssignedToAnalysis, { AssignedToAnalysisProps } from './';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

export type Props = 
  Optional<AssignedToAnalysisProps, 'data'> & 
  ChartConfigFlags & 
  { size?: ChartSizes } & 
  { widgetInfo?: WidgetInformation[]};

function AssignedToChart({
  data = [],
  unassignedColor,
  label,
  size = ChartSizes.full,
  widgetInfo,
  ...chartConfigFlags
}: Props) {
  const { data: { ingestAssignee } = {} } = useOrganizationSettings();

  return (
    <DefaultDashboardCard
      {...chartConfigFlags}
      title="Assigned To"
      Component={AssignedToAnalysis}
      data={data}
      size={size}
      additionalProps={{
        unassignedColor,
        label,
        widgetInfo
      }}
      shouldBeHidden={!ingestAssignee}
    />
  );
}

export default AssignedToChart;
