import { ThroughputData } from 'core/api/ApiClient/ThroughputClient';
import { formatDate, formatTimeFrameForDisplay } from 'utils/dateTime';
import {
  getTrendArrowImage,
  TrendAnalysis,
} from 'utils/statistics/TrendAnalysis';
import ZeroState from 'components/ZeroState';
import { Component } from 'react';

interface Props {
  data: ThroughputData;
  trendAnalysis?: TrendAnalysis;
}

interface State {
  trendPeriod: string;
}

class ThroughputCounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      trendPeriod: 'month',
    };

    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  onSelectionChange(selectedKeys: string[]) {
    this.setState({ trendPeriod: selectedKeys[0] });
  }

  render() {
    function trendAnalysis(trendPeriod: string, trendAnalysis?: TrendAnalysis) {
      let arrowDirection: string | undefined;
      let arrowColour: string | undefined;
      let percentage = 0;
      let text = '';
      let title = '';
      let altText = '';

      // some of this code should be refactored so that text and formatting decisions
      // are made in the front-end project, and the data driving those decisions should
      // be provided by api. But... for the time being.. :shrug:
      switch (trendPeriod) {
        case 'week': {
          title = 'Week';
          altText = 'Weekly Throughput Trend';
          arrowDirection = trendAnalysis?.lastWeek?.arrowDirection;
          arrowColour = trendAnalysis?.lastWeek?.arrowColour;
          percentage = trendAnalysis?.lastWeek?.percentage ?? 0;
          text = trendAnalysis?.lastWeek?.text ?? '';
          if (text && text.startsWith('more'))
            text = 'more compared to last week';
          if (text && text.startsWith('less'))
            text = 'less compared to last week';

          break;
        }
        case 'fortnight': {
          title = 'Fortnight';
          altText = 'Fortnightly Throughput Trend';
          arrowDirection = trendAnalysis?.lastTwoWeeks?.arrowDirection;
          arrowColour = trendAnalysis?.lastTwoWeeks?.arrowColour;
          percentage = trendAnalysis?.lastTwoWeeks?.percentage ?? 0;
          text = trendAnalysis?.lastTwoWeeks?.text ?? '';
          if (text && text.startsWith('more'))
            text = 'more compared to last 2 weeks';
          if (text && text.startsWith('less'))
            text = 'less compared to last 2 weeks';

          break;
        }
        case 'month': {
          title = 'Month';
          altText = 'Monthly Throughput Trend';
          arrowDirection = trendAnalysis?.lastFourWeeks?.arrowDirection;
          arrowColour = trendAnalysis?.lastFourWeeks?.arrowColour;
          percentage = trendAnalysis?.lastFourWeeks?.percentage ?? 0;
          text = trendAnalysis?.lastFourWeeks?.text ?? '';
          if (text && text.startsWith('more'))
            text = 'more compared to last month';
          if (text && text.startsWith('less'))
            text = 'less compared to last month';

          break;
        }
      }

      if (text !== '') {
        return (
          <div className="key-indicator-row">
            <div className="key-indicator-table-content">{title}</div>
            <div className="key-indicator-table-content-percent">
              {percentage}%
            </div>
            <div className="key-indicator-table-content">
              <img
                src={getTrendArrowImage(arrowDirection, arrowColour)}
                className="key-indicator-trend-icon"
                alt={altText}
              />
            </div>
            <div className="key-indicator-table-content">{text}</div>
          </div>
        );
      }
    }

    const trendWeek = trendAnalysis('week', this.props.trendAnalysis);
    const trendFortnight = trendAnalysis('fortnight', this.props.trendAnalysis);
    const trendMonth = trendAnalysis('month', this.props.trendAnalysis);

    return (
      <>
        <div className="key-indicator-container">
          <div className="key-indicator">{this.props.data.count}</div>
          <div className="key-indicator-label">work items</div>
          <div className="key-indicator-dates">
            {formatDate(this.props.data.fromDate)} -{' '}
            {formatDate(this.props.data.untilDate)}
            <br />({formatTimeFrameForDisplay(this.props.data.numDays)})
          </div>
          <div className="key-indicator-table-title">Trend Analysis</div>
          {trendWeek}
          {trendFortnight}
          {trendMonth}
          {!trendWeek && !trendMonth ? (
            // <div style={{ width: '100%', border: '1px solid blue' }}>
            <ZeroState
              message="No data available for the selected criteria"
              minHeight={100}
            />
          ) : // </div>
            null}
        </div>
      </>
    );
  }
}

export default ThroughputCounts;
