import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { AggregationKey, getAggregationQueryParam } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { getProductivityTooltip } from 'views/ValueStreamManagement/components/SkeletonTrendChart/customLabels';

import ZingChart from 'zingchart-react';
import { getProductivityColor, productivityColors } from 'views/ValueStreamManagement/components/SkeletonHeatMap/customizations';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { useEffect } from 'react';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { DataAggregations } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Typography } from '@material-ui/core';
import { formatStringDate } from 'utils/dateTime';

interface PageProps {
  productivityHistoricalChart?: Array<Array<any>>;
  telemetryAction?: string;
  telemetrySource?: string;
  aggregationProps?: DataAggregations;
}

export const ProductivityMaxHistoricalView = ({
  productivityHistoricalChart,
  telemetryAction,
  telemetrySource,
  aggregationProps
}: PageProps) => {

  const results = (productivityHistoricalChart || [])
    .map((item) => [formatStringDate(item[0]), item[1], item[2]]); // on larger dataset, the results are in month/yr already

  const dataRatings = (productivityHistoricalChart || [])
    .map((item) => [item[2]]);

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

  const tooltipLabel: string = getProductivityTooltip(
    aggregationQueryParam,
  );

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
          adjustLayout: true,
          backgroundColor: 'none',
        },
        legend: {
          visible: false,
        },
        plot: {
          "data-rating": dataRatings,
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
          borderRadius: '15px',
          borderWidth: '5px',
          rules: [
            {
              backgroundColor: getProductivityColor('No work completed'),
              rule: '"%data-rating" == "No work completed"',
            },
            {
              backgroundColor: getProductivityColor('Terrible'),
              rule: '"%data-rating" == "Terrible"',
            },
            {
              backgroundColor: getProductivityColor('Bad'),
              rule: '"%data-rating" == "Bad"',
            },
            {
              backgroundColor: getProductivityColor('Poor'),
              rule: '"%data-rating" == "Poor"',
            },
            {
              backgroundColor: getProductivityColor('Slightly Under'),
              rule: '"%data-rating" == "Slightly Under"',
            },
            {
              backgroundColor: getProductivityColor('Average'),
              rule: '"%data-rating" == "Average"',
            },
            {
              backgroundColor: getProductivityColor('Good'),
              rule: '"%data-rating" == "Good"',
            },
            {
              backgroundColor: getProductivityColor('Great'),
              rule: '"%data-rating" == "Great"',
            },
            {
              backgroundColor: getProductivityColor('Excellent'),
              rule: '"%data-rating" == "Excellent"',
            },
            {
              backgroundColor: getProductivityColor('Phenomenal'),
              rule: '"%data-rating" == "Phenomenal"',
            },
            {
              backgroundColor: getProductivityColor('Out of range'),
              rule: '"%data-rating" == "Out of range"',
            },
          ],
        },
        plotarea: {
          margin: "70 0 0 10",
        },
        "tooltip": {
          "visible": true
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
        },
        scaleY: {
          visible: false,
        },
        series: [
          {
            values: results,
          },
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
        `${telemetrySource} -> Historical View tab`, { page: "Productivity Historical View" });
  }, [sendTelemetry]);

  return (
    <>
      <ZingChart data={config} />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
        {
          productivityColors.map((item, index) => (
            <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 15 }} key={index}>
              <FiberManualRecordIcon style={{ fontSize: 15, color: item.color }} />
              <Typography key={index} style={{ lineHeight: 1.25, fontFamily: "Open Sans", fontSize: 12, paddingLeft: 10 }}>{item.label}</Typography>
            </div>
          ))
        }
      </div>
    </>
  );
};