import { camelCase, startCase } from 'lodash';

import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DefaultDashboardCard from 'components/Charts/components/DefaultDashboardCard';
import {
  DonutGeneratorOptions,
  processFieldGroups,
} from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/utils/processFieldGroups';
import { FieldCountGroup } from 'views/Dashboard/views/AnalyticsDashboard/interfaces/fieldCounts';

import { areEmptyFieldCounts } from '../../utils/validation';
import DynamicDonutChart from '../DynamicDonutChart';

export interface DonutChartListProps {
  fieldGroups: FieldCountGroup[];
  isLoading: boolean;
  options?: DonutGeneratorOptions;
  sectionId?: string;
  getColorByDisplayName?: (displayName: string) => string | undefined;
}

const DonutChartList = ({
  fieldGroups,
  isLoading,
  options,
  sectionId = 'donut',
  getColorByDisplayName,
}: DonutChartListProps) => {
  const processedGroups: FieldCountGroup[] = processFieldGroups(
    fieldGroups,
    options
  );

  return (
    <>
      {
        processedGroups.map(
          ({ columnName, data }: FieldCountGroup, idx) => 
            <DefaultDashboardCard
              key={`${sectionId}-section-donut-chart-${idx}`}
              title={startCase(camelCase(columnName))}
              Component={DynamicDonutChart}
              data={data}
              dataIsUnavailable={areEmptyFieldCounts}
              hideDefaultLoadingAnimation={true}
              size={ChartSizes.medium}
              additionalProps={{
                isValidating: isLoading,
                getColorByDisplayName
              }}
            />
        )
      }
    </>
  );
}

export default DonutChartList;
