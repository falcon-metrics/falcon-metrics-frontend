import ZingChart from 'zingchart-react';

interface Props {
  data?: any;
  customLabelX?: string;
  customLabelY?: string;
  lineColor?: string;
}

const defaultLineColor = '#0879cb';

const ConfidenceAnalysis = ({
  data,
  customLabelX,
  customLabelY,
  lineColor,
}: Props) => {
  const config = setupConfig(data, customLabelX, customLabelY, lineColor);
  const theme = getTheme();

  return (
    <ZingChart data={config} theme={theme} />
    // <div>
    //   <DashboardCard
    //     title={title ?? `Confidence Analysis`}
    //     contentId={title ?? 'Confidence Analysis'}
    //     WidgetContent={WidgetContent ?? ConfidenceAnalysis}
    //     widgetProps={{data, activeFilters}}
    //   />
    //   <div className="widget-subtitle"></div>
    //   <ConfigurationNeededMessage
    //     missingConfigurations={[]}
    //     relevantCategories={[NormalizationCategories.DEMAND]}>
    //     {activeFilters && isEmptySummaryChart(data) ? (
    //       <ZeroState
    //         message="No data available for the selected criteria"
    //         minHeight={480}
    //       />
    //     ) : (
    //       <div className="widget-chart">
    //       </div>
    //     )}
    //   </ConfigurationNeededMessage>
    // </div>
  );
};

const defaultTextAxis = {
  fontSize: '14px',
  fontColor: 'rgba(0, 0, 0, 0.7)',
  fontFamily: 'Open Sans',
};

const setupConfig = (
  data: any[],
  customLabelX?: string,
  customLabelY?: string,
  lineColor?: string,
) => {
  return {
    type: 'line',
    backgroundColor: '#FFFFFF',
    stackType: '100%',
    plot: {
      barWidth: '25px',
      hoverState: {
        visible: false,
      },
      // animation: {
      //   effect: 2,
      //   sequence: 1,
      //   speed: 800,
      // },
    },
    scaleX: {
      zooming: true,
      scale: '0:5:1',
      values: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      step: '1',
      guide: {
        visible: true,
      },
      item: {
        fontColor: '#8B8B8B',
      },
      tick: {
        visible: false,
      },
      label: {
        visible: false,
      },
    },
    scaleY: {
      guide: {
        alpha: 0.4,
        lineColor: '#53566f',
        lineStyle: 'solid',
        lineWidth: '1px',
      },
      item: {
        fontColor: '#8B8B8B',
      },
      lineColor: '#7E7E7E',
      short: true,
      tick: {
        visible: false,
      },
      values: [0, 1, 2, 3, 4, 5],
      step: 1,
      scale: '0:5:1',
      label: {
        text: customLabelY ?? 'Hours',
      },
    },
    legend: {
      borderWidth: 0,
      layout: '2x3',
      align: 'center',
      verticalAlign: 'bottom',
      item: {
        ...defaultTextAxis,
      },
      marker: {
        visible: false,
      },
    },
    series: [
      {
        lineColor: lineColor ?? defaultLineColor,
        marker: {
          visible: false,
        },
        name: 'burndown',
        values: data,
      },
    ],
  };
};

const getTheme = () => ({
  graph: {
    plot: {
      backgroundColor: '#41B6E6',
      fontSize: '14px',
    },
    plotarea: {
      margin: '20px 50px 60px 60px',
    },
    legend: {
      visible: false,
    },
    tooltip: {
      visible: true,
      callout: true,
      calloutWidth: '20px',
      backgroundColor: '#ffffff',
      fontColor: '#707070',
      fontSize: '12px',
      fontFamily: 'Open Sans',
      padding: '8px',
      htmlMode: true,
      shadow: false,
      borderColor: '#e3e3e3',
      borderWidth: '1px',
    },
  },
});

export default ConfidenceAnalysis;
