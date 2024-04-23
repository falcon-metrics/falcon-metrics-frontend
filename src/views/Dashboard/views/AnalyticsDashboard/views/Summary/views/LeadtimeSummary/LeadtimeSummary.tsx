import { QualitySummaryData } from 'core/api/ApiClient/SummaryClient';
import { useMemo } from 'react';
import BarChart from 'views/Dashboard/components/Charts/components/BarChart/BarChart';
import { ChartProps } from '../../interfaces/ChartProps';
import { defaultColorMap } from './LeadtimeSummary.styles';
import { seriesGenerator } from './utils/utils';

const LeadtimeSummary = (props: ChartProps<QualitySummaryData>) => {
  const tooltipText =
    props.currentDataAggregation?.toLowerCase() === 'weeks'
      ? 'week starting'
      : '';
  const zingchartOptions = useMemo(
    () => ({
      type: 'line',
      stacked: false,
      stackType: '100%',
      scaleY: {
        label: {
          text: 'Days',
        },
      },
      legend: {
        layout: '2x3',
      },
      tooltip: {
        rules: [
          {
            rule: '%vt == 1',
            text: `Lead Time of %vt day in ${tooltipText} %kt`,
          },
          {
            rule: '%vt > 1',
            text: `Lead Time of %vt days in ${tooltipText} %kt`,
          },
          {
            rule: '%vt == 0',
            text: `Lead Time of %vt days in ${tooltipText} %kt`,
          },
        ],
      },
    }),
    [tooltipText],
  );

  return (
    <BarChart<QualitySummaryData>
      {...props}
      defaultColorMap={defaultColorMap}
      zingchartConfigs={zingchartOptions}
      seriesGenerator={seriesGenerator}
    />
  );
};

export default LeadtimeSummary;
