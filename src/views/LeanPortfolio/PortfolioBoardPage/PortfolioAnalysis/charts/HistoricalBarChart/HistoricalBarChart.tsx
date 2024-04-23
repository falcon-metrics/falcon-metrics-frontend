import ZingChart from 'zingchart-react';
import { DateTime } from 'luxon';
import { TabProps } from '.';
import { colourPalette, operationalWorkColor } from 'views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/utils/chartColors';
import { distributionLegends } from '../ChartConfig';
import { NoDataAvailable } from '../../components/NoDataAvailable';
import _ from 'lodash';
import { DEFAULT_MONTH_YEAR_FORMAT } from 'utils/dateTime';

const HistoricalBarChart = (props: TabProps) => {
  let roomNames: string[] = [];
  props.historicalData.forEach(x => {
    if (x.values) {
      roomNames = roomNames.concat(Object.keys(x.values));
    }
  });
  roomNames = _.uniq(roomNames).sort();
  const chartData = props.historicalData?.map((data: any) => {
    const parsedDate = DateTime.fromISO(data.dateStart);
    const formattedDate = parsedDate.toFormat(DEFAULT_MONTH_YEAR_FORMAT);

    return {
      date: parsedDate,
      formattedDate,
      values: data.values,
    };
  });

  chartData?.sort((a, b) => a.date.toMillis() - b.date.toMillis());

  const dates = chartData?.map(item => item.formattedDate);

  const series = roomNames.map((roomName, colourIdxBG) => {
    let color;
    if (roomName === "Operational work")
      color = operationalWorkColor;
    else
      color = colourPalette[colourIdxBG];
    const roomValues = chartData?.map(item => item.values[roomName] || 0);

    // Calculate the total value for each date
    const total = chartData?.map(item =>
      roomNames.reduce((sum, name) => sum + (item.values[name] || 0), 0)
    );

    // Calculate the data-percentage for each initiative
    const roomPercentages = roomValues.map((value, index) =>
      total[index] !== 0 ? (value / total[index]) * 100 : 0
    );

    return {
      text: roomName,
      "data-count": roomValues,
      backgroundColor: color,
      values: roomPercentages
    };
  });

  const chartConfig = {
    ...props.customConfig,
    plot: {
      stacked: true,
      barWidth: "25px",
      stackType: '100%',
    },
    scaleY: {
      format: "%v%",
      values: "0:100:20",
      label: {
        text: "Percentage",
      }
    },
    tooltip: {
      text: `${props.prefixUnit ? props.unit : ''}%data-count ${!props.prefixUnit ? props.unit + ' ' : ''}(%v%) %t`,
      decimals: 2,
      thousandsSeparator: ','
    },
    series: series,
    scaleX: {
      labels: dates,
    },
    legend: {
      ...distributionLegends,
      paddingTop: 15
    }
  };

  if (series.length <= 0) {
    return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
  }

  return (
    <div>
      <ZingChart data={chartConfig} theme={props.customTheme} />
    </div>
  );
};

export default HistoricalBarChart;