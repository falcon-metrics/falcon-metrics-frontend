import { useMemo } from 'react';
import capitalize from 'lodash/capitalize';
import ZingChart from 'zingchart-react';
import {
  Box,
  styled,
} from '@material-ui/core';
import {
  FlowAnalysisPeriodData,
} from '../../../../../hooks/useFlowAnalysisData';
import { AggregationPeriod } from 'core/api/ApiClient/SummaryClient';
import { formatStringDate } from 'utils/dateTime';

const myTheme = {
  graph: {
    tooltip: {
      visible: true,
      callout: true,
      calloutWidth: '20px',
      backgroundColor: '#ffffff',
      fontFamily: 'Open Sans',
      fontColor: '#707070',
      fontSize: '12px',
      padding: '8px',
      htmlMode: true,
      shadow: false,
      borderColor: '#e3e3e3',
      borderWidth: '1px',
      text: "%npv% %t<br/>starting on %kl",
      decimals: 0,
    },
  },
};

type Props = {
  data?: FlowAnalysisPeriodData[];
  currentDataAggregation: AggregationPeriod;
};

const NoDataAvailable = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: 15,
  textAlign: 'center',
  color: '#b5b5b5',
  height: '480px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const FlowEfficiencyRightGraph = ({
  data,
  currentDataAggregation,
}: Props) => {
  const labels = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map(period => formatStringDate(period.startDate, "yyyy-MM-dd"));
  }, [data]);

  const chartData = useMemo(() => {
    return {
      tooltip: {
        visible: true,
        fontColor: '#333',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#EEE',
        padding: 10
      },
      graphset: [
        {
          type: 'bar',
          plotarea: {
            margin: '130 10 90 60'
          },
          scaleX: {
            labels: labels,
            label: {
              color: '#6C6C6C',
              text: '<br/>' + capitalize(currentDataAggregation),
            },
            lineColor: '#D8D8D8',
            tick: {
              visible: false,
              _lineColor: '#D8D8D8'
            },
            item: {
              color: '#6C6C6C',
              angle: '-35'
            },

          },
          plot: {
            stacked: true,
            "stack-type": "100%",
            barWidth: '25%'
          },
          scaleY: {
            lineColor: '#D8D8D8',
            guide: {
              lineStyle: 'solid'
            },
            tick: {
              lineColor: '#D8D8D8'
            },
            item: {
              color: '#6C6C6C'
            },
            label: {
              padding: '20 0 0 0',
              text: 'Process Flow Efficiency Over Time',
              color: '#6C6C6C'
            },
            values: '0:100:20'
          },
          series: [
            {
              text: 'Value-adding time',
              values: !data ? [] : data.map(period => period.activeCount),
              lineColor: '#2AD2C9',
              backgroundColor: '#2AD2C9',
              marker: {
                backgroundColor: '#2AD2C9',
                borderColor: '#2AD2C9'
              }
            },
            {
              text: 'Waiting time',
              values: !data ? [] : data.map(period => period.waitingCount),
              lineColor: '#E1523E',
              backgroundColor: '#E1523E',
              marker: {
                backgroundColor: '#E1523E',
                borderColor: '#E1523E'
              }
            }
          ]
        }
      ]
    };
  }, [data]);

  if (!data || Object.keys(data).length < 1) {
    return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
  }

  return <ZingChart style={{ marginTop: "-119px" }} data={chartData} theme={myTheme} />;
};
