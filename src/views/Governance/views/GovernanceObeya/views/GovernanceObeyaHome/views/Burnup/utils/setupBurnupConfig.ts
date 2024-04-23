import { ObeyaBurnupSeries } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';

export const setupBurnupConfig = (
  data: ObeyaBurnupSeries,
  customLabelX?: string,
  customLabelY?: string,
) => {
  // Chart Lines
  const defaultLineColor = '#18d0cb';
  const defaultTargetLineColor = 'rgb(0, 134, 117, 0.35)';
  const defaultScopeLineColor = '#fbbc04';

  // Chart Text
  const defaultText = {
    fontColor: 'rgba(0, 0, 0, 0.7)',
    fontFamily: 'Open Sans',
    fontWeight: '400',
  };
  const defaultLegendText = {
    ...defaultText,
    fontSize: '12px',
  }
  const defaultTextAxis = {
    ...defaultText,
    fontSize: '14px',
  };

  // Plotting Data
  const { dates, accomplishedWork, dailyTargets, scope } = data;

  const convertToUnixTime = (date: string) => Date.parse(date);
  const datesInUnixTime = (dates !== undefined)
    ? dates.map(convertToUnixTime)
    : [];

  const areYearsDifferent = (dates: string[]): boolean => {
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[dates.length - 1]);

    return firstDate.getFullYear() !== lastDate.getFullYear();
  }
  const isDataMultiYear: boolean = (dates !== undefined && areYearsDifferent(dates));
  const dateFormat = isDataMultiYear
    ? '%dd %M \'%Y'
    : '%dd %M %Y';

  return {
    type: 'mixed',
    backgroundColor: '#FFFFFF',
    stackType: '100%',
    plot: {
      barWidth: '25px',
      hoverState: {
        visible: false,
      },
      // animation: {
      //   effect: 1,
      //   speed: 300,
      // },
    },
    plotarea: { 
      margin: 'dynamic',
      marginRight: 40,
    },
    scaleX: {
      zooming: true,
      values: datesInUnixTime,
      guide: {
        visible: true,
      },
      item: {
        ...defaultText
      },
      tick: {
        visible: false,
      },
      label: {
        ...defaultTextAxis,
        text: customLabelX ?? 'Dates',
      },
      step: 'day',
      transform: {
        type: 'date',
        all: dateFormat,
      },
    },
    scaleY: {
      minValue: accomplishedWork[0],
      guide: {
        alpha: 0.4,
        lineColor: '#53566f',
        lineStyle: 'solid',
        lineWidth: '1px',
      },
      item: {
        ...defaultText
      },
      lineColor: '#7E7E7E',
      short: true,
      tick: {
        visible: false,
      },
      label: {
        ...defaultTextAxis,
        text: customLabelY ?? 'Work Items',
      },
    },
    legend: {
      borderWidth: 0,
      align: 'center',
      textAlign: 'center',
      verticalAlign: 'top',
      layout: 'float',
      item: {
        ...defaultLegendText,
      },
    },
    series: [
      {
        type: 'line',
        lineColor: defaultLineColor,
        lineWidth: '3px',
        marker: {
          visible: false,
          backgroundColor: defaultLineColor,
          borderColor: defaultLineColor,
        },
        name: 'burndown',
        text: 'Accomplished',
        values: accomplishedWork,
        legendMarker: {
          visible: false,
          lineWidth: '5px',
          size: '12px',
          showLine: true,
          lineColor: defaultLineColor,
        },
        tooltip: {
          text: "%vt work items remaining on %kt."
        }
      },
      {
        type: 'line',
        lineColor: defaultScopeLineColor,
        lineWidth: '3px',
        marker: {
          visible: false,
          backgroundColor: defaultLineColor,
          borderColor: defaultLineColor,
        },
        name: 'scope',
        text: 'Scope',
        values: scope,
        legendMarker: {
          visible: false,
          lineWidth: '5px',
          size: '12px',
          showLine: true,
          lineColor: defaultScopeLineColor,
        },
        tooltip: {
          text: "Total of %vv work items on %kt."
        }
      },
      {
        type: 'line',
        lineColor: defaultTargetLineColor,
        lineWidth: '3px',
        marker: {
          visible: false,
        },
        name: 'target',
        text: 'Target',
        values: dailyTargets,
        legendMarker: {
          visible: false,
          lineWidth: '5px',
          size: '12px',
          showLine: true,
          lineColor: defaultTargetLineColor,
        },
        tooltip: {
          text: "Target of %vv work items on %kt."
        }
      },
    ],
  };
};
