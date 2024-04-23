import { useEffect } from 'react';
import { Box } from '@material-ui/core';

import DefaultDashboardCard from 'components/Charts/components/DefaultDashboardCard';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';

import { ServiceLevelData } from '../../interfaces/serviceLevel';
import ServiceLevelTable from './views/ServiceLevelTable';
import { isServiceLevelDataEmpty } from '../../utils/validation/isServiceLevelDataEmpty';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';
export interface ServiceLevelProps {
  data: ServiceLevelData;
  flowLens: ServiceLevelData;
  isValidating: boolean;
  changeLoading: (_: boolean) => void;
  perspective: string;
  widgetInfo?: WidgetInformation[];
}

const ServiceLevelSection = ({
  data,
  isValidating,
  changeLoading,
  perspective,
  widgetInfo,
  flowLens
}: ServiceLevelProps) => {
  useEffect(() => {
    changeLoading(isValidating ?? false);
  }, [isValidating]);

  return (
    <Box className="full-width-chart">
      <DefaultDashboardCard
        title={''}
        Component={ServiceLevelTable}
        data={data}
        isLoading={isValidating}
        dataIsUnavailable={isServiceLevelDataEmpty}
        hideDefaultLoadingAnimation={true}
        additionalProps={{
          perspective,
          isValidating,
          widgetInfo,
          flowLens
        }}
        size={ChartSizes.large}
        fullScreen={true}
      />
    </Box>
  );
};

export default ServiceLevelSection;
