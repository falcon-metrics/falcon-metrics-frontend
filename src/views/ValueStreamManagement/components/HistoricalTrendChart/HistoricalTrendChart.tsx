import { useEffect, useMemo } from 'react';

// @ts-ignore
import ZingChart from 'zingchart-react';

import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { AggregationKey, getAggregationQueryParam } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { getTrendChartTooltipPercentageByAggregation } from 'views/ValueStreamManagement/components/SkeletonTrendChart/customLabels';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { useStyles } from './styles';
import { DataAggregations } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';

interface PageProps {
  data?: any[];
  filler?: any[];
  aggregateDates?: string[];
  customConfig: {
    scaleY: {
      values: string;
      format: string;
      labelText: string;
    },
    title?: string;
  };
  aggregationProps?: DataAggregations;
}

export const TrendChart = ({
  data,
  filler,
  aggregateDates,
  customConfig,
  aggregationProps
}: PageProps) => {
  let aggregation;
  if (aggregationProps) {
    aggregation = aggregationProps;
  } else {
    const { selectedFilters } = useFilterPanelContext();
    aggregation = selectedFilters['currentDataAggregation'];
  }
  const aggregationQueryParam: AggregationKey = getAggregationQueryParam(
    aggregation
  );

  const tooltipLabel: string = getTrendChartTooltipPercentageByAggregation(
    aggregationQueryParam,
  );

  const title = customConfig?.title || "Valid data";
  const config =
  {
    "type": "line",
    "utc": true,
    "title": {
      "text": "",
      "fontFamily": "Open Sans",
      "fontSize": "20px",
      "fontColor": "#707070",
      "textAlign": "left",
      "fontWeight": 400
    },
    "plotarea": {
      "margin": "75 45 60 dynamic",
    },
    "legend": {
      "background-color": "none",
      "border-width": 0,
      "align": "center",
      "item": {
        "padding": 7,
        "marginRight": 17,
        "cursor": "hand",
        "fontSize": "13px",
        "fontFamily": "Open Sans"
      },
      "marker": {
        "type": "circle",
      },
      "verticalAlign": "bottom"
    },
    "scale-x": {
      "zooming": true,
      "label": {
        "text": aggregation ? aggregation?.charAt(0)?.toUpperCase() + aggregation?.substring(1) : "",
        "fontSize": "12px",
        "fontColor": 'rgba(0, 0, 0, 0.7)',
      },
      "visible": true,
      "values": aggregateDates
    },
    "scale-y": {
      "format": customConfig?.scaleY?.format,
      "label": {
        "text": customConfig?.scaleY?.labelText,
        "fontSize": "12px",
        "fontColor": 'rgba(0, 0, 0, 0.7)',
      },
      "line-color": "#F6F7F8",
      "shadow": 0,
      "guide": {
        "line-style": "dashed"
      }
    },
    "plot": {
      "tooltip": {
        "visible": true,
        "callout": true,
        "calloutWidth": "20px",
        "backgroundColor": "#FFF",
        "fontColor": "#707070",
        "fontSize": "12px",
        "padding": "8px",
        "htmlMode": true,
        "shadow": false,
        "borderColor": "#E3E3E3",
        "borderWidth": "1px",
        "text": tooltipLabel,
      },
      "animation": {
        "effect": 1,
        "sequence": 2,
        "speed": 100,
      },
      "aspect": "spline",
      "hoverMarker": {
        "visible": true,
        "type": "circle",
        "borderWidth": "3px",
        "size": 5,
        "borderColor": "#005E85",
        "backgroundColor": "#FFF",
      },
      "marker": {
        "visible": true,
        "type": "circle",
        "borderWidth": "3px",
        "size": 6,
        "borderColor": "#FFF",
      },
      "highlight": true,
      "highlight-state": {
        "line-width": 3
      },
    },
    "series": [
      {
        "values": data,
        "text": title,
        "lineWidth": 2,
        "lineColor": "#4A9AD7",
        "marker": {
          "backgroundColor": "#4A9AD7",
        },
        "hoverMarker": {
          "borderColor": "#4A9AD7",
        }
      },
      {
        "values": filler,
        "text": "Missing data point",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": "#4A9AD7",
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": "#4A9AD7",
        }
      }
    ]
  };

  return <ZingChart data={config} />;
};

type HistoricalTrendChartProps = {
  historicalData?: [string, number][];
  chartTitle?: string;
  telemetryAction?: string;
  telemetrySource?: string;
  aggregationProps?: DataAggregations;
};

export const HistoricalTrendChart = ({
  historicalData,
  chartTitle,
  telemetryAction,
  telemetrySource,
  aggregationProps
}: HistoricalTrendChartProps) => {
  const classes = useStyles();

  const historicalDataFormatted = useMemo(() => (
    historicalData || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [historicalData]);

  const aggregateDates = useMemo(() => (
    historicalData || []).map(item => item[0]
    ), [historicalData]);

  function getFillerData() {
    const len = historicalDataFormatted.length;
    const arr: any = [];

    for (let index = 0; index < len; index++) {
      const current = historicalDataFormatted[index];
      const previous = historicalDataFormatted[(index + len - 1) % len];
      const next = historicalDataFormatted[index + 1];

      if (current === null) {
        if (index === 0) {
          // do nothing
        }
        else {
          if (previous !== null) {
            arr.push(null);
            arr.push([index - 1, previous]);
          }

          if (next !== null && next !== undefined) {
            arr.push([index + 1, next]);
          }

          if (index === len) {
            arr.push([index + 1, previous]);
          }

        }
      }
    }

    if (arr.length !== len && historicalDataFormatted[len - 1] === null) {
      const lastNonNull = historicalDataFormatted.filter(x => x !== null).slice(-1)[0];
      arr.push([len - 1, lastNonNull]);
    }

    return arr || [];
  }

  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Historical View tab`, { page: `${telemetrySource} Historical View` });
  }, [sendTelemetry]);

  return (
    <div className={classes.modalBody}>
      <TrendChart
        data={historicalDataFormatted}
        filler={getFillerData()}
        aggregateDates={aggregateDates}
        customConfig={{
          scaleY: {
            values: '0:100:25',
            format: '%v%',
            labelText: 'Percent',
          },
          title: chartTitle
        }}
        aggregationProps={aggregationProps}
      />
    </div>
  );
};
