import ZingChart from 'zingchart-react';
import { CFDNewDataItem } from "../../../hooks/useCumulativeFlowDiagramData";

export const cfdColourPalletLine: string[] = [
  '#66C4EB',
  '#115450',
  '#80BBE4',
  '#006D9B',
  '#6AE0D9',
  '#006BB4',
  '#4DBAE8',
  '#0D3F3C',
  '#1985CE',
  '#80CEEF',
  '#197E79',
  '#99C9E9',
  '#003E59',
  '#26BDB5',
  '#003050',
  '#009CDE',
  '#AAEDE9',
  '#00243C',
  '#99D7F2',
  '#22A8A1',
];

type Props = {
  data: {
    [state: string]: CFDNewDataItem
  };
};

export const CFDChart = ({
  data
}: Props) => {
  return (
    <ZingChart data={setupChartConfig(data)} />
  );
}

function setupChartConfig(
  cumulativeFlowData: {[state: string]: CFDNewDataItem}
) {
  const flowSeries = Object.keys(cumulativeFlowData).map((stateName, index) => {
    const colourIdxBG = index % cfdColourPalletLine.length;
    const colourIdxLine = index % cfdColourPalletLine.length;

    const stateFlowData = cumulativeFlowData[stateName];

    const values = Object.keys(stateFlowData.cumulativeFlowData).map((yearMonthDay) => {
      const amount = stateFlowData.cumulativeFlowData[yearMonthDay];
      const sampleDate = new Date(yearMonthDay + "T00:00:00Z").valueOf();

      return [sampleDate, amount];
    });

    return {
      alphaArea: 1,
      backgroundColor: cfdColourPalletLine[colourIdxBG],
      lineColor: cfdColourPalletLine[colourIdxLine],
      lineWidth: 1,
      lineStyle: 'solid',
      text: stateFlowData.stateName === 'completed' ? 'Completed' : stateFlowData.stateName,
      guideLabel: {
        visible: false
      },
      values,
    };
  });

  return {
    type: 'area',
    utc: 'true',
    globals: {
      fontSize: '12px',
      fontFamily: 'Open Sans',
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
      tooltip: {
        text: '%v items (%t)',
        backgroundColor: 'rgb(226, 226, 226)',
        fontFamily: 'Open Sans',
        border: 'none',
        color: '#000',
        htmlMode: true,
      }
    },
    plotarea: {
      margin: '20px 50px 60px 60px',
    },
    'scale-y': {
      zooming: true,
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
      lineStyle: 'solid',
      lineWidth: '1px',
      fontColor: '#000000',
      marker: {
        size: '4px',
        visible: true,
      },
      plotLabel: {
        multiple: false,
        visible: false,
        callout: false,
        calloutHeight: '20px',
        backgroundColor: '#ffffff',
        fontColor: '#707070',
        fontSize: '12px',
        padding: '6px',
        borderColor: '#e3e3e3',
        borderWidth: '1px'
      },
      scaleLabel: {
        backgroundColor: '#e3e3e3',
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontWeight: 'bold',
      },
    },
    crosshairY: {
      lineStyle: 'dashed',
      lineWidth: '2px',
      fontColor: '#707070',
      marker: {
        size: '4px',
        visible: true,
      },
      plotLabel: {
        multiple: false,
        visible: false,
        callout: false,
        calloutHeight: '20px',
        backgroundColor: '#ffffff',
        fontColor: '#707070',
        fontSize: '12px',
        padding: '6px',
        borderColor: '#e3e3e3',
        borderWidth: '1px'
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
    series: flowSeries,
  };
}