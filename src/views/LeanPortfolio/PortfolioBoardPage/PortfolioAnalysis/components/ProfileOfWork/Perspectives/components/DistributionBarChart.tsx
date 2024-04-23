import { useMemo } from 'react';
import ZingChart from 'zingchart-react';
import { TabProps } from '.';
import { NoDataAvailable } from '../../../NoDataAvailable';
import { ratioLegends } from 'views/LeanPortfolio/PortfolioBoardPage/PortfolioAnalysis/charts/ChartConfig';


const DistributionBarChart = ({ distributionData, customTheme, customConfig }: TabProps) => {
  const strategic = distributionData?.strategic ?? 0;
  const operational = distributionData?.operational ?? 0;
  const total = (distributionData?.strategic ?? 0) + (distributionData?.operational ?? 0);
  const chartData = useMemo(() => {
    const chartSeries = [
      {
        text: 'Strategic Initiatives',
        values: [strategic],
        legendItem: { visible: true },
        backgroundColor: '#26BDB5',
        valueBox: { text: null },
        "data-percentage": strategic > 0
          ? ((strategic / total) * 100).toFixed(2)
          : 0,
      },
      {
        text: 'Operational Work',
        values: [operational],
        legendItem: { visible: true },
        backgroundColor: '#AAEEEA',
        valueBox: { text: null },
        "data-percentage": distributionData
          ? ((operational / total) * 100).toFixed(2)
          : 0,
      },
    ];

    return {
      ...customConfig,
      scaleY: {
        label: {
          text: "Count",
        },
        minValue: 0,
        short: true
      },
      legend: ratioLegends,
      series: chartSeries
    };
  }, [operational, strategic]);

  if (!operational && !strategic) {
    return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
  }

  return <ZingChart data={chartData} theme={customTheme} />;
};

export default DistributionBarChart;
