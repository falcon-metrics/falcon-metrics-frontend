import { PredictabilityItem } from 'core/api/ApiClient/LeadTimeClient';
import { getTrendArrowImage } from 'utils/statistics/TrendAnalysis';
import ZeroState from 'components/ZeroState';

interface PageProps {
  data: Array<PredictabilityItem>;
}

const LeadTimeSLE = ({ data: predictability }: PageProps) => {
  const displayRows = predictability.map((row, i) => {
    const serviceLevelPercent = row.serviceLevelPercent;
    const rowHasData: boolean = serviceLevelPercent !== null;
    let percentRow;
    let trendIcon;
    let targetColour = 'yellow';

    if (rowHasData) {
      const targetMet = Math.round(serviceLevelPercent * 100);

      switch (true) {
        case targetMet < 70:
          targetColour = '#E1523E';
          break;
        case targetMet >= 70 && targetMet <= 84:
          targetColour = '#F5B24B';
          break;
        case targetMet >= 85:
          targetColour = '#2AD2C9';
          break;
        default:
          break;
      }
      percentRow = (
        <div
          className="sle-table-content-percent"
          style={{ color: targetColour, fontWeight: 'bolder' }}
        >
          {targetMet}%
        </div>
      );

      if (row.trendAnalysis.lastWeek?.text !== '') {
        const trendColour = row.trendAnalysis.lastWeek?.arrowColour;

        trendIcon = (
          <img
            src={getTrendArrowImage(
              row.trendAnalysis.lastWeek?.arrowDirection,
              trendColour,
            )}
            className="sle-trend-icon"
            alt="Service Level Expectation Trend"
          />
        );
      } else trendIcon = '-';
    } else {
      percentRow = <div className="sle-table-content-percent"> - </div>;
      trendIcon = '-';
    }

    let rowResponse;
    if (rowHasData) {
      rowResponse = (
        <div className="sle-row" key={i}>
          <div className="sle-table-content">{row.itemTypeName}</div>
          <div className="sle-table-content">
            {row.serviceLevelExpectationDays} days or less
          </div>
          {percentRow}
          <div className="sle-table-content-center">
            {/* {row.trendAnalysis.lastWeek?.arrowDirection} {row.trendAnalysis.lastWeek?.arrowColour} */}
            {trendIcon}
          </div>
        </div>
      );
    } else {
      rowResponse = null;
    }

    return rowResponse;
  });

  if (!displayRows.length || displayRows.filter((row) => !!row).length === 0) {
    return (
      <ZeroState
        message="No data available for the selected criteria"
        minHeight={340}
      />
    );
  }

  return (
    <div className="sle-table">
      <div className="sle-row-header">
        <div className="sle-table-title">Work Item Type</div>
        <div className="sle-table-title">Service Level Expectation</div>
        <div className="sle-table-title-center">Lead Time Target Met</div>
        <div className="sle-table-title-center">Trend</div>
      </div>
      {displayRows}
    </div>
  );
};

export default LeadTimeSLE;
