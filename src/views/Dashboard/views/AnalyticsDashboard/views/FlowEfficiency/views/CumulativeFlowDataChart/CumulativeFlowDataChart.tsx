import { StateCumulativeFlowData } from 'core/api/ApiClient/FlowEfficiencyClient';
import { Component } from 'react';
import { colourPalletLine } from 'views/Dashboard/components/Charts/configuration/ChartColors';

// @ts-ignore
import ZingChart from 'zingchart-react';

interface ComponentData {
  cumulativeFlowData?: Array<StateCumulativeFlowData>;
}

class CumulativeFlowDataChart extends Component<ComponentData> {
  render() {
    return <ZingChart data={this.setupChartConfig()} />;
  }

  private setupChartConfig() {
    let colourIdxBG = 0;
    let colourIdxLine = 0;
    const rawFlowData: Array<StateCumulativeFlowData> =
      this.props.cumulativeFlowData ?? [];
    const flowData = rawFlowData.map((stateFlowData) => {
      return {
        backgroundColor: colourPalletLine[colourIdxBG++],
        lineColor: colourPalletLine[colourIdxLine++],
        text: stateFlowData.stateName,
        guideLabel: {
          fontColor: 'rgba(0, 0, 0, 0.7)',
          text: '%v work items are %t',
        },
        values: stateFlowData.cumulativeFlowData.map((dataItem) => {
          const sampleDate = new Date(dataItem.sampleDate).valueOf();
          return [sampleDate, dataItem.numberOfItems];
        }),
      };
    });

    return {
      type: 'area',
      utc: 'true',
      globals: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
      tooltip: {
        visible: false,
      },
      legend: {
        layout: '2x5',
        maxItems: '8',
        overflow: 'scroll',
        border: '0px',
        adjustLayout: 'true',
        //verticalAlign: 'bottom',
        align: 'center',
        item: {
          fontSize: '12px',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        marker: {
          type: 'circle',
        },
      },
      plot: {
        stacked: 'true',
        aspect: 'Spline',
        stacktype: '100%',
        marker: {
          visible: 'false',
        },
      },
      plotarea: {
        margin: '20px 50px 60px 60px',
      },
      'scale-y': {
        zooming: true,
        label: {
          text: 'WIP',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
      },
      'scale-x': {
        zooming: true,
        label: {
          text: 'Date',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        step: 'day',
        transform: {
          type: 'date',
          all: '%dd %M %Y',
        },
      },
      crosshairX: {
        lineStyle: 'dashed',
        lineWidth: '2px',
        fontColor: '#707070',
        marker: {
          size: '4px',
          visible: true,
        },
        plotLabel: {
          multiple: true,
          visible: true,
          callout: true,
          calloutHeight: '20px',
          backgroundColor: '#ffffff',
          fontColor: '#707070',
          fontSize: '12px',
          padding: '6px',
          borderColor: '#e3e3e3',
          borderWidth: '1px',
          text: '%kt',
        },
        scaleLabel: {
          backgroundColor: '#e3e3e3',
          fontColor: 'rgba(0, 0, 0, 0.7)',
          fontWeight: 'bold',
        },
      },
      preview: {
        adjustLayout: true,
        label: {
          fontFamily: 'Open Sans',
          fontSize: '12px',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
      },
      series: flowData,
    };
  }
}

export default CumulativeFlowDataChart;
