import { WorkItemGroupCount } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/interfaces/profileOfWork';
import ZingChart from 'zingchart-react';
import { colourPalette } from '../../../../utils/chartColors';

interface PageProps {
  data: WorkItemGroupCount[];
}

const StaticWorkItemTypeAnalysis = ({ data }: PageProps) => {
  let colourIdx = 0;

  const mySeries = data.map((item) => {
    let colour = '';
    
    if (
      item &&
      item.groupName &&
      (item.groupName.toLowerCase().includes('bug') ||
        item.groupName.toLowerCase().includes('defect'))
    ) {
      colour = '#E1523E';
    } else if (
      item &&
      item.groupName &&
      (item.groupName.toLowerCase().includes('aligned') && !item.groupName.toLowerCase().includes('not'))
    ) {
      colour = '#ff585d';
    } else if (
      item &&
      item.groupName &&
      (item.groupName.toLowerCase().includes('not aligned'))
    ) {
      colour = '#2ad2c9';
    } else if ( // null or not classified
      item &&
      item.groupName &&
      (item.groupName.toLowerCase().includes('null'))
    ) { 
      colour = colourPalette[colourIdx++];
      return {
        values: Number.isInteger(item.count) ? [item.count] : [0],
        text: "Not classified",
        backgroundColor: colour,
      };
    }
    else {
      colour = colourPalette[colourIdx++];
    }

    return {
      values: Number.isInteger(item.count) ? [item.count] : [0],
      text: item.groupName,
      backgroundColor: colour,
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

export default StaticWorkItemTypeAnalysis;
