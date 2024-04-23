
import AssignedToChart from 'components/Charts/components/AssignedToAnalysis/AssignedToChart';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import { ErrorMessageInfo } from 'components/Charts/components/DashboardCard/views/Content/components/ErrorMessage';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart/SkeletonBarChart';
import { DEFAULT_EMPTY_DATA_TEXT } from 'views/ValueStreamManagement/utils/constants';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';
import { isAssignedToEmpty } from '../../../../utils/validation/isProfileOfWorkDataEmpty';

interface AssignedToPanelProps {
  data: any[];
  unassignedColor: string;
  label: string;
  size: ChartSizes;
  isValidating: boolean;
  widgetInfo?: WidgetInformation[];
}

const AssignedToPanel = ({
  data,
  unassignedColor,
  label,
  size,
  isValidating,
  widgetInfo
}: AssignedToPanelProps) => {
  const noAssignedToDataInfo = new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    !isValidating && isAssignedToEmpty(data),
  );
  const noAssignedToDataMessages: ErrorMessageInfo[] = [noAssignedToDataInfo];

  return (
    <>
      {isValidating
        ? <DashboardCard
            title="Assigned To"
            size={size}
            errorMessagesInfo={noAssignedToDataMessages}
            hideDefaultLoadingAnimation={true}
          >
            <SkeletonBarChart />
          </DashboardCard>
        : <AssignedToChart
            data={data}
            unassignedColor={unassignedColor}
            label={label}
            size={ChartSizes.large}
            widgetInfo={widgetInfo}
          />
      }
      

    </>
  );
};

export default AssignedToPanel;
