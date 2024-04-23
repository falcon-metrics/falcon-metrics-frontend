import { InOutFlowData } from 'core/api/ApiClient/FlowEfficiencyClient';
import { Component } from 'react';

// @ts-ignore
import ZingChart from 'zingchart-react';
import { DateTime } from 'luxon';
import { min, max } from 'mathjs';

interface PageProps {
  data: InOutFlowData;
  activeFilters?: boolean;
}

class InOutFlowChart extends Component<PageProps> {
  render() {
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

          rules: [
            {
              //Rule 1
              rule: '"%plot-text" == "Demand"',
              text: '%vt work items committed\nin the week starting %kt',
              //backgroundColor: '#003050',
              //fontColor: 'white'
            },
            {
              //Rule 2
              rule: '"%plot-text" == "Capacity"',
              text: '%vt work items completed\nin the week starting %kt',
              //backgroundColor: '#009CDE',
              //fontColor: "rgba(0, 0, 0, 0.7)",
            },
            {
              //Rule 3
              rule: '"%plot-text" == "Cumulative demand"',
              text: '%vt work items committed\ncumulatively by %kt',
              //backgroundColor: 'white',
              //fontColor: "rgba(0, 0, 0, 0.7)",
              //borderColor: "#003050",
              //borderWidth: "2px",
            },
            {
              //Rule 4
              rule: '"%plot-text" == "Cumulative capacity"',
              text: '%vt work items completed\ncumulatively by %kt',
              //backgroundColor: 'white',
              //fontColor: "rgba(0, 0, 0, 0.7)",
              //borderColor: "#009CDE",
              //borderWidth: "2px",
            },
          ],
        },
      },
    };

    return <ZingChart data={this.setupChartConfig()} theme={myTheme} />;
  }

  private setupChartConfig() {
    const chartSeries: Array<any> = [];

    if (this.props.data?.weeklyFlow.inflowItems.length === 0) {
      return;
    }

    // So our X-axis labels fit into the week-finishing pattern from the data,
    // set the min to be earliest minus 7 days, the max latest date plus 7 otherwise some bars don't show
    const xAxisStartDate = min(
      this.props.data?.weeklyFlow.inflowItems
        .map((item) =>
          DateTime.fromISO(item.weekStartingOn).minus({ days: 7 }).valueOf(),
        )
        .concat(
          this.props.data?.weeklyFlow.outflowItems.map((item) =>
            DateTime.fromISO(item.weekStartingOn).minus({ days: 7 }).valueOf(),
          ),
        ),
    );
    const xAxisEndDate = max(
      this.props.data?.weeklyFlow.inflowItems
        .map((item) =>
          DateTime.fromISO(item.weekStartingOn).plus({ days: 7 }).valueOf(),
        )
        .concat(
          this.props.data?.weeklyFlow.outflowItems.map((item) =>
            DateTime.fromISO(item.weekStartingOn).plus({ days: 7 }).valueOf(),
          ),
        ),
    );

    chartSeries.push({
      type: 'bar',
      text: 'Demand',
      values: this.props.data?.weeklyFlow.inflowItems.map((item) => [
        DateTime.fromISO(item.weekStartingOn).valueOf(),
        item.count,
      ]),
      scales: 'scaleX, scaleY',
      backgroundColor: '#003050',
      legendMarker: {
        type: 'square',
      },
    });

    chartSeries.push({
      type: 'line',
      text: 'Cumulative demand',
      values: this.props.data?.weeklyCumulativeFlow.inflowItems.map((item) => [
        DateTime.fromISO(item.weekStartingOn).valueOf(),
        item.count,
      ]),
      scales: 'scaleX, scaleY2',
      lineColor: '#003050',
      lineWidth: 3,
      marker: {
        backgroundColor: '#003050',
      },
      hoverMarker: {
        size: 6,
      },
      highlightMarker: {
        size: 5,
        borderColor: 'white',
        borderWidth: 1,
      },
    });

    chartSeries.push({
      type: 'bar',
      text: 'Capacity',
      values: this.props.data?.weeklyFlow.outflowItems.map((item) => [
        DateTime.fromISO(item.weekStartingOn).valueOf(),
        item.count,
      ]),
      scales: 'scaleX, scaleY',
      backgroundColor: '#009CDE',
      legendMarker: {
        type: 'square',
      },
    });

    chartSeries.push({
      type: 'line',
      text: 'Cumulative capacity',
      values: this.props.data?.weeklyCumulativeFlow.outflowItems.map((item) => [
        DateTime.fromISO(item.weekStartingOn).valueOf(),
        item.count,
      ]),
      scales: 'scaleX, scaleY2',
      lineColor: '#009CDE',
      lineWidth: 3,
      marker: {
        backgroundColor: '#009CDE',
      },
      hoverMarker: {
        size: 6,
      },
      highlightMarker: {
        size: 5,
        borderColor: 'white',
        borderWidth: 1,
      },
    });

    return {
      type: 'mixed',
      utc: true,
      globals: {
        fontFamily: 'Open Sans',
      },
      legend: {
        border: '0px',
        align: 'center',
        item: {
          fontSize: '12px',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        highlightPlot: true,
        marker: {
          type: 'circle',
        },
      },
      // plot: {
      //     barMaxWidth: 20,
      //     barsSpaceLeft: 2,
      //     barsSpaceRight: 2,
      //     marker: {
      //         visible: true,
      //     },
      // },
      scaleY: {
        label: {
          text: '# items',
          fontSize: '14px',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        guide: {
          //lineColor: "#909090",
        },
      },
      scaleY2: {
        label: {
          text: 'Cumulative',
          fontSize: '13px',
          fontColor: 'rgba(0, 0, 0, 0.7)',
          'offset-x': '-8px',
        },
        lineStyle: 'dashed',
        guide: {
          lineStyle: 'dashed',
        },
      },
      scaleX: {
        'min-value': xAxisStartDate,
        'max-value': xAxisEndDate,
        label: {
          text: 'Week',
          fontSize: '14px',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        step: 'week',
        transform: {
          type: 'date',
          all: '%dd %M %Y',
        },
      },
      series: chartSeries,
    };
  }
}

export default InOutFlowChart;
