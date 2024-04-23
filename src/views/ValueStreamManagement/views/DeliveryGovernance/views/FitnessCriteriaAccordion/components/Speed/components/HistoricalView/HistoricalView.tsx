import { useEffect, useMemo } from 'react';

// @ts-ignore
import ZingChart from 'zingchart-react';

import { makeStyles } from '@material-ui/core/styles';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { AggregationKey, getAggregationQueryParam } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { getTrendChartTooltipDaysByAggregation } from 'views/ValueStreamManagement/components/SkeletonTrendChart/customLabels';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { DrillDownTelemetryAction } from 'core/api/telemetry/types';
import { DataAggregations } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import { formatStringDateArray } from 'utils/dateTime';

type LevelData = {
  values: any[],
  filler: any[];
};

type Levels = {
  ic: LevelData,
  team: LevelData,
  portfolio: LevelData;
};

interface PageProps {
  /**
   * Lead Time (Development Lead Time)
   */
  leadtimeData?: Levels,
  /**
   * Time to Commit (Discovery Lead Time)
   */
  ttcData?: Levels,

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

export const HistoricalChart = ({
  aggregateDates,
  customConfig,
  aggregationProps,
  leadtimeData,
  ttcData
}: PageProps) => {
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

  const tooltipLabel: string = getTrendChartTooltipDaysByAggregation(
    aggregationQueryParam,
  );

  const colors = {
    ic: {
      lt: '#0065cc',
      ttc: '#66b2ff'
    },
    team: {
      lt: '#65cc00',
      ttc: '#b2ff66'
    },
    portfolio: {
      lt: '#ff8000',
      ttc: '#ffb266'
    },
  };

  // Lot of code duplication here. Difficult to manage.
  //  This can be generated with a function instead
  const config =
  {
    "type": "line",
    "utc": true,
    "title": {
      "text": customConfig?.title,
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
      "layout": "3x4",
      "background-color": "none",
      "border-width": 0,
      "align": "center",
      "item": {
        "padding": 1,
        "marginRight": 5,
        "cursor": "hand",
        "fontSize": "11px",
        "fontFamily": "Open Sans"
      },
      "marker": {
        "type": "circle",
      },
      "verticalAlign": "bottom",
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
        "values": leadtimeData?.portfolio.values,
        "text": "Development Lead Time - Portfolio",
        "lineWidth": 2,
        "lineColor": colors.portfolio.lt,
        "marker": {
          "backgroundColor": colors.portfolio.lt,
        },
        "hoverMarker": {
          "borderColor": colors.portfolio.lt,
        }
      },
      {
        "values": leadtimeData?.portfolio.filler,
        "text": "Missing data point<br>(Development Lead Time - Portfolio)",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": colors.portfolio.lt,
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": colors.portfolio.lt,
        }
      },
      {
        "values": ttcData?.portfolio.values,
        "text": "Discovery Lead Time - Portfolio",
        "lineWidth": 2,
        "lineColor": colors.portfolio.ttc,
        "marker": {
          "backgroundColor": colors.portfolio.ttc,
        },
        "hoverMarker": {
          "borderColor": colors.portfolio.ttc,
        }
      },
      {
        "values": ttcData?.portfolio.filler,
        "text": "Missing data point<br>(Discovery Lead Time - Portfolio)",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": colors.portfolio.ttc,
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": colors.portfolio.ttc,
        },
      },


      {
        "values": leadtimeData?.team.values,
        "text": "Development Lead Time - Team",
        "lineWidth": 2,
        "lineColor": colors.team.lt,
        "marker": {
          "backgroundColor": colors.team.lt,
        },
        "hoverMarker": {
          "borderColor": colors.team.lt,
        }
      },
      {
        "values": leadtimeData?.team.filler,
        "text": "Missing data point<br>(Development Lead Time - Team)",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": colors.team.lt,
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": colors.team.lt,
        },
      },
      {
        "values": ttcData?.team.values,
        "text": "Discovery Lead Time - Team",
        "lineWidth": 2,
        "lineColor": colors.team.ttc,
        "marker": {
          "backgroundColor": colors.team.ttc,
        },
        "hoverMarker": {
          "borderColor": colors.team.ttc,
        }
      },
      {
        "values": ttcData?.team.filler,
        "text": "Missing data point<br>(Discovery Lead Time - Team)",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": colors.team.ttc,
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": colors.team.ttc,
        },
      },


      {
        "values": leadtimeData?.ic.values,
        "text": "Development Lead Time - IC",
        "lineWidth": 2,
        "lineColor": colors.ic.lt,
        "marker": {
          "backgroundColor": colors.ic.lt,
        },
        "hoverMarker": {
          "borderColor": colors.ic.lt,
        }
      },
      {
        "values": leadtimeData?.ic.filler,
        "text": "Missing data point<br>(Development Lead Time - IC)",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": colors.ic.lt,
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": colors.ic.lt,
        },
      },
      {
        "values": ttcData?.ic.values,
        "text": "Discovery Lead Time - IC",
        "lineWidth": 2,
        "lineColor": colors.ic.ttc,
        "marker": {
          "backgroundColor": colors.ic.ttc,
        },
        "hoverMarker": {
          "borderColor": colors.ic.ttc,
        }
      },
      {
        "values": ttcData?.ic.filler,
        "text": "Missing data point<br>(Discovery Lead Time - IC)",
        "lineStyle": "dashed",
        "lineWidth": 2,
        "lineColor": colors.ic.ttc,
        "marker": {
          "visible": false
        },
        "legendMarker": {
          "type": "line",
          "lineStyle": "dashed"
        },
        "hoverMarker": {
          "borderColor": colors.ic.ttc,
        },
      }
    ].map(c => {
      if (c.text.includes('Missing data')) {
        // Use this to hide the legends for missing data points
        // (c as any).legendItem = {
        //   visible: false,
        // };
      }
      return c;
    })
  };

  return <ZingChart data={config} />;
};

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 154,
    width: 240,
    overflow: 'hidden',
  },
  relativeContainer: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 5,
    zIndex: 1,
  },
  modalBody: {
    padding: 10,
    width: "99%"
  }
}));

type HistoricalViewProps = {
  portfolio85thChart?: [string, number][];
  team85thChart?: [string, number][];
  ic85thChart?: [string, number][];

  timeToCommit85thPercentileIC?: [string, number][];
  timeToCommit85thPercentileTeam?: [string, number][];
  timeToCommit85thPercentilePortfolio?: [string, number][];

  telemetryAction?: string;
  telemetrySource?: string;
  aggregationProps?: DataAggregations;
};


function getFillerData(source: any) {
  const len = source.length;
  const arr: any = [];

  for (let index = 0; index <= len; index++) {
    const current = source[index];
    const previous = source[(index + len - 1) % len];
    const next = source[index + 1];

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

  if (arr.length !== len && source[len - 1] === null) {
    const lastNonNull = source.filter(x => x != null).slice(-1)[0];
    arr.push([len + 1, lastNonNull]);
  }

  return arr || [];
}

export const HistoricalView = ({
  telemetryAction,
  telemetrySource,
  aggregationProps,

  portfolio85thChart,
  team85thChart,
  ic85thChart,

  timeToCommit85thPercentileIC,
  timeToCommit85thPercentileTeam,
  timeToCommit85thPercentilePortfolio
}: HistoricalViewProps) => {
  const classes = useStyles();

  const portfolio85thChartFormatted = useMemo(() => (
    portfolio85thChart || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [portfolio85thChart]);

  const team85thChartFormatted = useMemo(() => (
    team85thChart || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [team85thChart]);

  const ic85thChartFormatted = useMemo(() => (
    ic85thChart || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [ic85thChart]);

  const teamTTCFormatted = useMemo(() => (
    timeToCommit85thPercentileTeam || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [timeToCommit85thPercentileTeam]);

  const portfolioTTCFormatted = useMemo(() => (
    timeToCommit85thPercentilePortfolio || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [timeToCommit85thPercentilePortfolio]);

  const icTTCFormatted = useMemo(() => (
    timeToCommit85thPercentileIC || []).map(item =>
      item?.[1] === null ? null : Math.round(item?.[1])
    ), [timeToCommit85thPercentileIC]);


  const aggregateDates = useMemo(() => {
    if (!team85thChart || !Array.isArray(team85thChart)) {
      return [];
    }

    const dateStrings = team85thChart.map(item => (item && item[0]) || '');
    return formatStringDateArray(dateStrings);
  }, [team85thChart]);


  /*
  * Telemetry Action
  */
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    if (telemetryAction === DrillDownTelemetryAction.accessFitnessCriteriaDrillDown)
      sendTelemetry(DrillDownTelemetryAction.accessFitnessCriteriaDrillDown,
        `${telemetrySource} -> Historical View tab`, { page: "Lead Time Historical View" });
  }, [sendTelemetry]);

  return (
    <div className={classes.modalBody}>
      <HistoricalChart
        aggregateDates={aggregateDates}
        leadtimeData={{
          ic: {
            values: ic85thChartFormatted,
            filler: getFillerData(ic85thChartFormatted)
          },
          team: {
            values: team85thChartFormatted,
            filler: getFillerData(team85thChartFormatted)
          },
          portfolio: {
            values: portfolio85thChartFormatted,
            filler: getFillerData(portfolio85thChartFormatted)
          },
        }}
        ttcData={{
          ic: {
            values: icTTCFormatted,
            filler: getFillerData(icTTCFormatted)
          },
          team: {
            values: teamTTCFormatted,
            filler: getFillerData(teamTTCFormatted)
          },
          portfolio: {
            values: portfolioTTCFormatted,
            filler: getFillerData(portfolioTTCFormatted)
          },
        }}
        customConfig={{
          scaleY: {
            values: '0:100:25',
            format: '%v',
            labelText: 'Lead Time [85th percentile]',
          }
        }}
        aggregationProps={aggregationProps}
      />
    </div>
  );
};
