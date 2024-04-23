import { InventoryData } from 'core/api/ApiClient/InventoryClient';
import { Component } from 'react';
import { formatDate, formatTimeFrameForDisplay } from 'utils/dateTime';
import {
  TrendAnalysis,
  getTrendArrowImage,
} from 'utils/statistics/TrendAnalysis';

interface Props {
  data: InventoryData;
  trendAnalysis?: TrendAnalysis;
}

interface State {
  trendPeriod: string;
}

class InventoryCounts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      trendPeriod: 'month',
    };
  }

  onSelectionChange = (selectedKeys: string[]) => {
    this.setState({ trendPeriod: selectedKeys[0] });
  };

  render() {
    function trendAnalysis(trendPeriod: string, trendAnalysis?: TrendAnalysis) {
      let arrowDirection: string | undefined;
      let arrowColour: string | undefined;
      let percentage = 0;
      let text = '';
      let title = '';
      let altText = '';

      switch (trendPeriod) {
        case 'week': {
          title = 'Week';
          altText = 'Weekly Inventory Trend';
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
          altText = 'Fortnightly Inventory Trend';
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
          altText = 'Monthly Inventory Trend';
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

    return (
      <div>
        <div className="key-indicator-container">
          <div className="key-indicator">{this.props.data.count}</div>
          <div className="key-indicator-label">work items created</div>
          <div className="key-indicator-highlight">
            {this.props.data.countInDate} between
          </div>
          <div className="key-indicator-dates">
            {formatDate(this.props.data.fromDate)} -{' '}
            {formatDate(this.props.data.untilDate)}
            <br />({formatTimeFrameForDisplay(this.props.data.numDays)})
          </div>
          <div className="key-indicator-table-title">Trend Analysis</div>
          {trendAnalysis('week', this.props.trendAnalysis)}
          {trendAnalysis('fortnight', this.props.trendAnalysis)}
          {trendAnalysis('month', this.props.trendAnalysis)}
        </div>
      </div>
    );
  }
}

export default InventoryCounts;
