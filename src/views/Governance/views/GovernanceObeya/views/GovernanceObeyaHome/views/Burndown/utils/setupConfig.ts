import { ObeyaBurndownSeries } from "views/Governance/views/GovernanceObeya/hooks/useObeya";

export const setupConfig = (
  data: ObeyaBurndownSeries,
  customLabelX?: string,
  customLabelY?: string,
  lineColor?: string,
  targetLineColor?: string,
) => {
  // Chart Lines
  const defaultLineColor = '#18d0cb';
  const defaultTargetLineColor = 'rgb(0, 134, 117, 0.35)';

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
  const { dates, remainingWork, dailyTargets } = data;

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
        text: customLabelX ?? 'Date',
      },
      step: 'day',
      transform: {
        type: 'date',
        all: dateFormat,
      },
    },
    scaleY: {
      minValue: '0',
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
      verticalAlign: 'top',
      item: {
        ...defaultLegendText,
      },
    },
    series: [
      {
        type: 'line',
        lineColor: lineColor ?? defaultLineColor,
        lineWidth: '3px',
        marker: {
          visible: false,
          backgroundColor: lineColor ?? defaultLineColor,
          borderColor: lineColor ?? defaultLineColor,
        },
        name: 'burndown',
        text: 'Remaining',
        values: remainingWork,
        legendMarker: {
          visible: false,
          lineWidth: '5px',
          size: '12px',
          showLine: true,
          lineColor: lineColor ?? defaultLineColor,
        },
        tooltip: {
          text: "%vt work items remaining on %kt."
        }
      },
      {
        type: 'line',
        lineColor: targetLineColor ?? defaultTargetLineColor,
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
          lineColor: targetLineColor ?? defaultTargetLineColor,
        },
        tooltip: {
          text: "Target of %vv work items on %kt."
        }
      },
    ],
  };
};
