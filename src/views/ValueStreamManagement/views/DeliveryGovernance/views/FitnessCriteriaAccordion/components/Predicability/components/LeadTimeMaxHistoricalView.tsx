import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { AggregationKey, getAggregationQueryParam } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { getPredictabilityTooltip } from 'views/ValueStreamManagement/components/SkeletonTrendChart/customLabels';

import ZingChart from 'zingchart-react';
import { getPredictabilityColor, predictabilityColors } from 'views/ValueStreamManagement/components/SkeletonHeatMap/customizations';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { useEffect } from 'react';
import { DataAggregations } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Typography } from '@material-ui/core';
import { formatStringDate } from 'utils/dateTime';
interface PageProps {
  leadTimeHistoricalChart?: Array<Array<any>>;
  customConfig?: {
    scaleY?: {
      values: string;
      format: string;
      labelText: string;
    },
    maximizeView: boolean;
    title?: string;
  };
  telemetryAction?: string;
  telemetrySource?: string;
  aggregationProps?: DataAggregations;
}


function getLabelListFromData(
  leadTimeHistoricalChart: any
): string[] {
  return leadTimeHistoricalChart.map(item => {
    return formatStringDate(item[0]);
  });
}

export const LeadTimeMaxHistoricalView = ({
  leadTimeHistoricalChart,
  customConfig,
  telemetryAction,
  telemetrySource,
  aggregationProps
}: PageProps) => {
  const results = (leadTimeHistoricalChart || [])
    .map((item) => [item[0], item[1]]);

  let aggregation;
  const { selectedFilters } = useFilterPanelContext();
  if (aggregationProps) {
    aggregation = aggregationProps;
  } else {
    aggregation = selectedFilters['currentDataAggregation'];
  }
  const aggregationQueryParam: AggregationKey = getAggregationQueryParam(
    aggregation
  );

  const tooltipLabel: string = getPredictabilityTooltip(
    aggregationQueryParam,
  );

  const labels = getLabelListFromData(leadTimeHistoricalChart);

  
  const config =
  {
    height: 430,
    globals: {
      fontFamily: 'Open Sans',
    },
    graphset: [
      {
        type: 'heatmap',
        theme: 'classic',
        backgroundColor: '#fff',
        title: {
          text: customConfig?.title || "",
          adjustLayout: true,
          paddingBottom: '25px',
          backgroundColor: 'none',
          fontFamily: "Open Sans",
          fontSize: '20px',
          fontColor: '#707070',
          textAlign: 'left',
          fontWeight: 400
        },
        legend: {
          visible: false,
        },
        plot: {
          tooltip: {
            visible: true,
            callout: true,
            calloutWidth: '20px',
            backgroundColor: '#ffffff',
            fontColor: '#707070',
            fontSize: '12px',
            padding: '8px',
            htmlMode: true,
            shadow: false,
            borderColor: '#e3e3e3',
            borderWidth: '1px',
            text: tooltipLabel,
          },
          aspect: 'none',
          borderColor: '#fff',
          borderRadius: '10px',
          borderWidth: '5px',
          rules: [
            {
              backgroundColor: getPredictabilityColor('Low'),
              rule: '"%v" == "Low"',
            },
            {
              backgroundColor: getPredictabilityColor('High'),
              rule: '"%v" == "High"',
            },
            {
              backgroundColor: '#EEEEEE',
              rule: '"%v" == ""',
            },
          ],
        },
        plotarea: {
          margin: "70 0 0 10",
        },
        "tooltip": {
          "visible": true,
        },
        scaleX: {
          guide: {
            visible: false,
          },
          item: {
            borderColor: 'none',
            fontColor: '#05636c',
            fontSize: '10px',
            fontAngle: -90
          },
          lineWidth: '0px',
          placement: 'opposite',
          tick: {
            visible: false,
          },
          labels: labels
        },
        scaleY: {
          visible: false,
          guide: {
            visible: false,
          },
        },
        series: [
          {
            values: results,
          }
        ],
      },
    ],
  };

  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Lead Time Predictability (Historical) tab`, { page: "Lead Time Predictability" });
  }, [sendTelemetry]);

  return (
    <>
      <ZingChart data={config} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
        {
          predictabilityColors.map((item, index) => (
            <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 15 }} key={index}>
              <FiberManualRecordIcon style={{ fontSize: 15, color: item.color }} />
              <Typography key={index} style={{ lineHeight: 1, fontFamily: "Open Sans", paddingLeft: 10 }}>{item.label}</Typography>
            </div>
          ))
        }
      </div>
    </>
  );
};