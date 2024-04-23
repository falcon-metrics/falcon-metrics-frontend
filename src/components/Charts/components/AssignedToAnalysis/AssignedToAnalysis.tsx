// @ts-ignore
import ZingChart from 'zingchart-react';
import { colourPallet } from 'views/Dashboard/components/Charts/configuration/ChartColors';
import { AssignedToDatum } from 'core/api/ApiClient/WipClient';
import { isObject } from 'lodash';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

export interface Props {
  data: Array<AssignedToDatum>;
  unassignedColor: string;
  label: string;
  widgetInfo?: WidgetInformation[];
}

const AssignedToAnalysis = ({ data, unassignedColor, label }: Props) => {
  const results = data;

  // TODO: won't be necessary after sample data is fixed.
  if (!isObject(results[0]) || !('workItems' in results[0])) {
    return null;
  }

  const mySeries: Array<any> = [];

  let colourIdx = 0;

  results
    .sort((a, b) => b.workItems.length - a.workItems.length)
    .forEach((item) => {
      const assignedName =
        item.name && item.name.length ? item.name : 'Unassigned';

      let colour = '';

      if (assignedName === 'Unassigned') {
        colour = unassignedColor;
      } else {
        colour = colourPallet[colourIdx++];
      }

      mySeries.push({
        values: [item.workItems.length],
        text: assignedName,
        backgroundColor: colour,
      });
    });

  const myTheme = {
    graph: {
      plotarea: {
        margin: '20px 50px 60px 60px',
      },
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
        text: '<p>%v work items assigned to %t</p>',
      },
    },
  };

  const config = {
    type: 'bar',
    globals: {
      fontSize: '14px',
      fontFamily: 'Open Sans',
    },
    'scale-x': {
      labels: [''],
      label: {
        text: 'Assignee',
        fontColor: 'rgba(0, 0, 0, 0.7)',
        fontSize: '14px',
      },
    },
    'scale-y': {
      label: {
        text: label,
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    legend: {
      align: 'right',
      border: '0px',
      maxItems: '10',
      item: {
        fontSize: '12px',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      marker: {
        type: 'circle',
      },
      overflow: 'scroll',
    },
    series: mySeries,
  };

  return <ZingChart data={config} theme={myTheme} />;
};

export default AssignedToAnalysis;
