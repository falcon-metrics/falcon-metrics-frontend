import Box from '@material-ui/core/Box';

import { ApiQueryParameters } from 'core/api/ApiClient/ApiClient';
import 'components/Charts/components/DashboardCard/DashboardCardSizes.css';
import {
  ChartSizes
} from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';
import {
  ErrorMessageInfo,
} from 'components/Charts/components/DashboardCard/views/Content/components/ErrorMessage';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart/SkeletonBarChart';
import { DEFAULT_EMPTY_DATA_TEXT } from 'views/ValueStreamManagement/utils/constants';

import { TimeDistributionData } from '../../interfaces/timeDistribution';
import {
  isHistogramEmpty,
  isScatterplotEmpty,
} from '../../utils/validation/isTimeDistributionDataEmpty';
import ItemTimeHistogram from './components/ItemTimeHistogram/ItemTimeHistogram';
import ItemTimeScatterplot from './components/ItemTimeScatterplot/ItemTimeScatterplot';
import { getPerspectiveProfile } from './utils/perspective';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

export type TimeDistributionProps = {
  data: TimeDistributionData | undefined;
  histogramWidgetInfo?: WidgetInformation[];
  scatterplotWidgetInfo?: WidgetInformation[];
  isValidatingTimeDistribution: boolean;
  apiQueryParameters: ApiQueryParameters;
  perspective: string;
};

export const TimeDistributionSection = ({
  data,
  histogramWidgetInfo,
  scatterplotWidgetInfo,
  isValidatingTimeDistribution,
  perspective,
  apiQueryParameters,
}: TimeDistributionProps) => {
  const { ageFieldLabel } = getPerspectiveProfile(perspective);

  // "No Data" Messages
  const { scatterplot, histogram } = data || {};

  const histogramNoDataInfo = new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    !isValidatingTimeDistribution && isScatterplotEmpty(scatterplot),
  );
  const histogramErrorMessages: ErrorMessageInfo[] = [
    histogramNoDataInfo,
  ];

  const scatterplotNoDataInfo = new ErrorMessageInfo(
    DEFAULT_EMPTY_DATA_TEXT,
    !isValidatingTimeDistribution && isHistogramEmpty(histogram),
  );
  const scatterplotErrorMessages: ErrorMessageInfo[] = [
    scatterplotNoDataInfo,
  ];

  const upperOutliers: number[] = data?.boxPlot
    ? data.boxPlot.upperOutliers
    : [];

  return (
    <Box className="full-width-chart">
      <Box className="obeya-container charts-page-grid" style={{ padding: '13px 4px', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <DashboardCard
          title={`${ageFieldLabel} Histogram`}
          size={ChartSizes.fixed2}
          errorMessagesInfo={histogramErrorMessages}
          hideDefaultLoadingAnimation={true}
        >
          {isValidatingTimeDistribution || !data
            ? <SkeletonBarChart />
            : <ItemTimeHistogram
              histogram={data.histogram}
              boxPlot={data.boxPlot}
              targetForPredictability={data.distribution.targetForPredictability}
              percentile50th={data.distribution.percentile50th}
              percentile85th={data.distribution.percentile85th}
              percentile98th={data.distribution.percentile98th}
              perspective={perspective}
              isValidatingTimeDistribution={isValidatingTimeDistribution}
            />
          }

          {!isValidatingTimeDistribution && ((histogramWidgetInfo?.length !== 0) ?
            <ExtendedTooltip maxWidth="md" content={histogramWidgetInfo} /> : <></>)}
        </DashboardCard>
        <DashboardCard
          title={`${ageFieldLabel} Scatterplot`}
          size={ChartSizes.fixed2}
          errorMessagesInfo={scatterplotErrorMessages}
          hideDefaultLoadingAnimation={true}
        >
          {isValidatingTimeDistribution || !data
            ? <SkeletonBarChart />
            : <ItemTimeScatterplot
              scatterplot={data.scatterplot}
              targetForPredictability={data.distribution.targetForPredictability}
              percentile50th={data.distribution.percentile50th}
              percentile85th={data.distribution.percentile85th}
              percentile98th={data.distribution.percentile98th}
              filters={apiQueryParameters}
              upperOutliers={upperOutliers}
              perspective={perspective}
              isValidatingTimeDistribution={isValidatingTimeDistribution}
            />
          }

          {!isValidatingTimeDistribution && ((scatterplotWidgetInfo?.length !== 0) ?
            <ExtendedTooltip maxWidth="md" content={scatterplotWidgetInfo} /> : <></>)}
        </DashboardCard>
      </Box>
    </Box>
  );
};

export default TimeDistributionSection;
