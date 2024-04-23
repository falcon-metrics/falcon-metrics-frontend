import ZingChart from 'zingchart-react';
import { colourPalletLine } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/utils/chartColors';
import { EMPTY_LABEL } from '../../../../utils/constants';

interface PageProps {
  data: { type: string; count: number; }[];
  getColorByDisplayName?: (displayName: string) => string | undefined;
}


function getColorListFromData(
  data: { type: string; count: number; }[],
  getColorByDisplayName?: (key: string) => string | undefined
) {
  const colorRecord: Record<string, string> = {};
  {
    const seriesNameList: string[] = [];

    for (const item of data) {
      if (item.type && !seriesNameList.includes(item.type)) {
        seriesNameList.push(item.type);
      }
    }

    seriesNameList.sort((a, b) => a.localeCompare(b));

    let colourIdxBG = 0;
    for (let i = 0; i < seriesNameList.length; i++) {
      const seriesName = seriesNameList[i];
      const normalizationColor = getColorByDisplayName ? (
        seriesName === EMPTY_LABEL ? '#DDDDDD' : getColorByDisplayName(seriesName)
      ) : undefined;
      colorRecord[seriesName] = normalizationColor || colourPalletLine[colourIdxBG++];
    }
  }
  return colorRecord;
}

const DynamicWorkItemTypeAnalysis = ({
  data: workItemTypeAnalysisData,
  getColorByDisplayName
}: PageProps) => {

  const colorRecord = getColorListFromData(workItemTypeAnalysisData, getColorByDisplayName);

  const mySeries = workItemTypeAnalysisData.map((item) => {
    // Transform series record into zingchart series object
    return {
      values: [item.count],
      text: item.type,
      backgroundColor: colorRecord[item.type],
    };
  });

  const myTheme = {
    graph: {
      tooltip: {
        visible: true,
        callout: true,
        calloutWidth: '20px',
        backgroundColor: '#ffffff',
        fontFamily: 'Open Sans',
        fontColor: '#707070',
        fontSize: '12px',
        padding: '8px',
        htmlMode: true,
        shadow: false,
        borderColor: '#e3e3e3',
        borderWidth: '1px',
        text: '%v %t\n (%npv%)',
      },
    },
  };

  const config = {
    type: 'ring',
    globals: {
      fontFamily: 'Open Sans',
    },
    plot: {
      detach: false,
      slice: '80%',
      valueBox: {
        placement: 'out',
        connected: 'false',
        text: '%npv%',
        fontSize: '17px',
        fontWeight: 'bold',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    legend: {
      layout: '4x2',
      maxItems: '8',
      overflow: 'scroll',
      border: '0px',
      adjustLayout: 'true',
      verticalAlign: 'bottom',
      align: 'center',
      item: {
        fontSize: '12px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
        maxWidth: '150px',
        wrapText: true,

      },
      marker: {
        type: 'circle',
      },
    },
    series: mySeries,
  };

  return <ZingChart data={config} theme={myTheme} />;
};

export default DynamicWorkItemTypeAnalysis;
