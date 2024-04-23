import { useMemo } from 'react';
import ZingChart from 'zingchart-react';
import { NoDataAvailable } from '../../components/NoDataAvailable';
import { PortfolioAnalysisCounts } from 'views/LeanPortfolio/interfaces/PortfolioAnalysis';
import { donutChartConfig } from '../ChartConfig';

type Props = {
  data: PortfolioAnalysisCounts | undefined;
  customTheme?: any;
};

const DonutChart = ({ data, customTheme }: Props) => {
  const chartData = useMemo(() => {
    const strategic = data && data.strategic ? data.strategic : 0;
    const operational= data && data.operational? data.operational: 0;

    const chartSeries = [
      {
        text: 'Strategic Initiatives',
        values: [strategic],
        legendItem: { visible: true },
        backgroundColor: '#26BDB5',
        valueBox: [
          {
            connected: 'false',
            placement: 'center',
            text: '%npv%',
            decimals: 0,
            offsetY: '-1700%',
            fontSize: '35px',
            fontWeight: 'bold',
            fontColor: 'rgba(0, 0, 0, 0.7)',
          },
          {
            connected: 'false',
            placement: 'center',
            text: 'Strategic Initiatives',
            fontSize: '15px',
            offsetY: '2200%',
            fontWeight: 'normal',
            fontColor: 'rgba(0, 0, 0, 0.7)',
          },
        ],
      },
      {
        text: 'Operational Work',
        values: [operational],
        legendItem: { visible: true },
        backgroundColor: '#AAEEEA',
        valueBox: { text: null },
      },
    ];

    return {
      ...donutChartConfig,
      series: chartSeries,
    };

  }, [data?.operational, data?.strategic]);

  if (!data || (!data.operational&& !data.strategic)) {
    return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
  }

  return <ZingChart data={chartData} theme={customTheme} />;
};

export default DonutChart;