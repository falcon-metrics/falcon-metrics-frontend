import { useMemo } from "react";
import ZingChart from "zingchart-react";
import { colourPalette, operationalWorkColor } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/utils/chartColors";
import { distributionLegends } from "../ChartConfig";
import { TabProps } from ".";
import { NoDataAvailable } from '../../components/NoDataAvailable';
import _ from "lodash";

const DistributionBarChart = (props: TabProps) => {
  const chartSeries = useMemo(() => {
    const series: any = [];
    let colourIdxBG = 0;
    // Sorting by roomname to make a best effort to show same colors for rooms on all graphs.
    const sortedDistributionData = props.distributionData.sort((a, b) => a.roomName.localeCompare(b));
    for (const obeya of sortedDistributionData) {
      let color;
      if (obeya.roomName === "Operational work")
        color = operationalWorkColor;
      else
        color = colourPalette[colourIdxBG++];

      series.push({
        text: obeya.roomName,
        values: [obeya[props.primaryValueKey]],
        backgroundColor: color,
        "data-percentage": obeya[props.secondaryValueKey] > 0
          ? ((obeya[props.primaryValueKey] / obeya[props.secondaryValueKey]) * 100).toFixed(2)
          : 0,
      });
    }

    return _.sortBy(series, (val) => val.values[0]).reverse();
  }, [props.distributionData, props.primaryValueKey, props.secondaryValueKey]);

  const config = useMemo(() => {
    if (!chartSeries || chartSeries.length === 0) {
      console.warn("Missing data on distribution chart");
      return null;
    }

    return {
      ...props.customConfig,
      legend: distributionLegends,
      series: chartSeries
    };
  }, [chartSeries]);

  if (chartSeries.length <= 0) {
    return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
  }

  return <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
    <ZingChart data={config} theme={props.customTheme} />
  </div>;
};

export default DistributionBarChart;
