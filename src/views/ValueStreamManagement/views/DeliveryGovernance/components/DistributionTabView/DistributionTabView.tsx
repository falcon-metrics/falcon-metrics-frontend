import { Box } from '@material-ui/core';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { useEffect } from 'react';
import { SimpleTabView } from 'views/ValueStreamManagement/components/SimpleTabView/SimpleTabView';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart';
import { DistributionHistoricalWidgetData } from '../../interfaces/common';
import DistributionChart from '../DistributionChart';
import HistoricalDataChart from '../HistoricalBarChart';
import IndicatorNoDataPanel from '../IndicatorCard/components/IndicatorNoDataPanel/IndicatorNoDataPanel';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

type TabViewProp = {
  isLoading: boolean;
  data?: DistributionHistoricalWidgetData;
  currentDataAggregation: string;
  getColorByDisplayName: (key: string) => string | undefined;
  isEmpty?: boolean;
  error?: Error;
  telemetryAction?: string;
  telemetrySource?: string;
};

const DistributionTabView = ({
  isLoading,
  data,
  currentDataAggregation,
  getColorByDisplayName,
  isEmpty,
  error,
  telemetryAction,
  telemetrySource
}: TabViewProp) => {
  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Class of Value tab`, { page: "Custom Views - Class of Value" });
  }, [sendTelemetry]);

  const tabs = [data ? data.distribution : null, data ? data.historical : null, data ? data.historical : null].map((data, i) => {
    if (error) {
      return <Box height={600} display="flex" alignItems="center" justifyContent="center" key={i}>{isDevelopmentEnv ? error.stack : 'An error occured, please try again later'}</Box>;
    }
    let component: JSX.Element;
    if (i === 0) {
      const isDistributionDataEmpty = isEmpty || !data || (data && typeof data === 'object' && Object.keys(data).length === 0);
      if (isDistributionDataEmpty) {
        if (isLoading) {
          component = <SkeletonBarChart />;
        } else {
          component = <IndicatorNoDataPanel />;
        }
      } else {
        component = <DistributionChart data={data as any} getColorByDisplayName={getColorByDisplayName} />;
      }
    } else if (i === 1) {
      const isHistoricalDataEmpty = isEmpty || !data || (data instanceof Array && data.filter(item => item.values && Object.keys(item.values).length > 0).length === 0);
      if (isHistoricalDataEmpty) {
        if (isLoading) {
          component = <SkeletonBarChart />;
        } else {
          component = <IndicatorNoDataPanel />;
        }
      } else {
        component = <HistoricalDataChart data={data as any} currentDataAggregation={currentDataAggregation} getColorByDisplayName={getColorByDisplayName} />;
      }
    } else if (i === 2) {
      const isHistoricalDataEmpty = isEmpty || !data || (data instanceof Array && data.filter(item => item.values && Object.keys(item.values).length > 0).length === 0);
      if (isHistoricalDataEmpty) {
        if (isLoading) {
          component = <SkeletonBarChart />;
        } else {
          component = <IndicatorNoDataPanel />;
        }
      } else {
        component = <HistoricalDataChart data={data as any} currentDataAggregation={currentDataAggregation} getColorByDisplayName={getColorByDisplayName} stackType='normal' />;
      }
    } else {
      component = <IndicatorNoDataPanel />;
    }
    return <Box key={i} height={550 - 37} display="flex" alignItems="center" justifyContent="center">{component}</Box>;
  });

  return (
    <Box>
      <SimpleTabView
        defaultActiveTab={1}
        tabTitles={['Distribution', 'Historical View', 'Volume count']}
        tabContents={tabs}
      />
    </Box>
  );
};

export default DistributionTabView;