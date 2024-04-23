import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { DateTime } from 'luxon';
import { Box } from '@material-ui/core';

import { AntTab, AntTabs } from 'views/ValueStreamManagement/components/TabView/TabView';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart/SkeletonBarChart'
import { AggregationKey, getDateFormatByAggregation, getXAxisLabelByAggregation } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';

import { RunChartData } from '../../../../interfaces/runChart';
import { getRunChartTooltipByPerspective } from '../../utils/customLabels';
import RunChart from '../RunChart';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';


export interface RunChartSelectionPanelProps {
  data: RunChartData;
  aggregation: AggregationKey;
  perspective: string;
  isValidatingRunChart: boolean;
  tabSelection: number;
  setTabSelection: Dispatch<SetStateAction<number>>;
  widgetInfo?: WidgetInformation[];
};

const getChartType = (
  perspective: string,
  aggregation: AggregationKey,
  isRunChartSelected: boolean
) => {
  if (aggregation === 'day') {
    return 'area';
  }

  if (isRunChartSelected || perspective === 'past') {
    return 'bar';
  }

  return 'area';
}

const RunChartSelectionPanel = ({
  data,
  aggregation,
  perspective,
  isValidatingRunChart,
  tabSelection,
  setTabSelection,
}: RunChartSelectionPanelProps) => {
  const { totalItemsData, newItemsData } = data;
  
  const handleTabChange = (
    _event: ChangeEvent<{}>, newValue: number
  ): void => {
    setTabSelection(newValue);
  }

  const isRunChartSelected = tabSelection === 0;

  // Chart Data
  const selectedData: Array<[DateTime, number]> = isRunChartSelected
    ? newItemsData
    : totalItemsData;
  const chartType = getChartType(perspective, aggregation, isRunChartSelected);

  // Tab Labels
  const totalChartType = getChartType(perspective, aggregation, false);
  const totalTabLabel = totalChartType === 'bar'
    ? 'Accumulated'
    : 'Level';

  const tabTitles = ['Rate', totalTabLabel];

  // Chart Labels
  const xAxisLabel: string = getXAxisLabelByAggregation(aggregation);
  const dateFormat: string = getDateFormatByAggregation(aggregation);
  const tooltipLabel: string = getRunChartTooltipByPerspective(
    perspective,
    aggregation,
    isRunChartSelected,
  );

  return (
    <Box>
      <Box>
        <AntTabs value={tabSelection} onChange={handleTabChange}>
          {tabTitles.map(
            (title: string, key: number) => <AntTab key={key} label={title} />
          )}
        </AntTabs>
      </Box>
      <Box>
        {isValidatingRunChart
          ? <SkeletonBarChart />
          : <RunChart
              runChartSeries={selectedData}
              chartType={chartType}
              customXAxisLabel={xAxisLabel}
              customDateFormat={dateFormat}
              customTooltipLabel={tooltipLabel}
            />
        }
      </Box>
    </Box>
  )
}

export default RunChartSelectionPanel;