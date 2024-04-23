import { ThroughputRunChartData } from 'core/api/ApiClient/ThroughputClient';
// @ts-ignore
import ZingChart from 'zingchart-react';
import { round, isNumeric } from 'mathjs';
import { DateTime } from 'luxon';
import { Component } from 'react';

interface Props {
  data: ThroughputRunChartData;
  percentile05th?: number;
  percentile15th?: number;
  percentile50th?: number;
  percentile85th?: number;
  percentile95th?: number;
  lowerOutliers?: Array<number>;
  upperOutliers?: Array<number>;
}

class ThroughputChart extends Component<Props> {
  render() {
    const chartSeries: Array<Array<number>> = [];
    let xAxisStart = DateTime.fromObject({
      year: 9999,
      month: 12,
      day: 31,
    });
    let xAxisEnd = DateTime.fromObject({ year: 1970, month: 1, day: 1 });

    this.props.data.throughputSeries.forEach((item) => {
      const itemWeekStart = item.weekEndingOn.minus({ days: 6 });

      if (itemWeekStart < xAxisStart) xAxisStart = itemWeekStart;
      if (itemWeekStart > xAxisEnd) xAxisEnd = itemWeekStart;

      chartSeries.push([itemWeekStart.valueOf(), item.workItems.length]);
    });

    let minLowerOutliers,
      maxLowerOutliers,
      minUpperOutliers,
      maxUpperOutliers = 0;

    if (this.props.lowerOutliers && this.props.lowerOutliers.length) {
      minLowerOutliers = this.props.lowerOutliers[0];
      maxLowerOutliers = this.props.lowerOutliers[
        this.props.lowerOutliers.length - 1
      ];
    }

    if (this.props.upperOutliers && this.props.upperOutliers.length) {
      minUpperOutliers = this.props.upperOutliers[0];
      maxUpperOutliers = this.props.upperOutliers[
        this.props.upperOutliers.length - 1
      ];
    }

    const percentile50Marker = isNumeric(this.props.percentile50th)
      ? {
          type: 'line',
          range: [this.props.percentile50th],
          lineColor: '#e3e3e3',
          lineWidth: 2,
          lineStyle: 'dashed',
          labelPlacement: 'opposite',
          label: {
            text:
              '50% of confidence [' + round(this.props.percentile50th) + ']',
            padding: '2 8 2 8',
            backgroundColor: '#e3e3e3',
            fontColor: 'rgba(0, 0, 0, 0.7)',
            fontSize: '12px',
          },
        }
      : {};

    const percentile85Marker = isNumeric(this.props.percentile85th)
      ? {
          type: 'line',
          range: [this.props.percentile85th],
          lineColor: '#e3e3e3',
          lineWidth: 2,
          lineStyle: 'dashed',
          labelPlacement: 'opposite',
          label: {
            text:
              '85% of confidence [' + round(this.props.percentile85th) + ']',
            padding: '2 8 2 8',
            backgroundColor: '#e3e3e3',
            fontColor: 'rgba(0, 0, 0, 0.7)',
            fontSize: '12px',
          },
        }
      : {};

    const myTheme = {
      graph: {
        plot: {
          backgroundColor: '#41B6E6',
        },
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
          text:
            '<p>%vt work items were completed</p><p>in the week starting %kt</p>',
        },
      },
    };

    const config = {
      type: 'bar',
      utc: true,
      globals: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
      },
      'scale-x': {
        'min-value': xAxisStart.valueOf(),
        'max-value': xAxisEnd.valueOf(),
        label: {
          text: 'Date',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        step: 'week',
        transform: {
          type: 'date',
          all: '%dd %M %Y',
        },
      },
      'scale-y': {
        label: {
          text: 'Throughput',
          fontColor: 'rgba(0, 0, 0, 0.7)',
        },
        markers: [
          percentile50Marker,
          percentile85Marker,
          {
            type: 'area',
            range: [minLowerOutliers, maxLowerOutliers],
            backgroundColor: '#e3e3e3',
            alpha: 0.2,
          },
          {
            type: 'area',
            range: [minUpperOutliers, maxUpperOutliers],
            backgroundColor: '#e3e3e3',
            alpha: 0.2,
          },
        ],
      },
      series: [{ values: chartSeries }],
    };

    return <ZingChart data={config} theme={myTheme} />;
  }
}

export default ThroughputChart;
