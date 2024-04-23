import ZingChart from 'zingchart-react';
import { DateTime } from 'luxon';
import { TabProps } from '.';
import { NoDataAvailable } from '../../../NoDataAvailable';
import { ratioLegends } from 'views/LeanPortfolio/PortfolioBoardPage/PortfolioAnalysis/charts/ChartConfig';
import { DEFAULT_MONTH_YEAR_FORMAT } from 'utils/dateTime';

const calculatePercentage = (value, total) => {
    return ((value / total) * 100);
};

const HistoricalBarChart = ({ historicalData, customConfig, customTheme }: TabProps) => {
    const chartData = historicalData?.map(data => {
        const parsedDate = DateTime.fromISO(data.dateStart.toString());
        const formattedDate = parsedDate.toFormat(DEFAULT_MONTH_YEAR_FORMAT);

        const total = data.values.operational + data.values.strategic;
        const percentageStrategic = calculatePercentage(data.values.strategic, total);
        const percentageOperational = calculatePercentage(data.values.operational, total);

        return {
            date: parsedDate,
            formattedDate,
            strategicValue: data.values.strategic,
            operationalValue: data.values.operational,
            percentageStrategic,
            percentageOperational
        };
    });

    // Sort the chartData by date in ascending order
    chartData?.sort((a, b) => a.date.toMillis() - b.date.toMillis());

    const dates = chartData?.map(item => item.formattedDate);
    const strategicValues = chartData?.map(item => item.strategicValue.toFixed(0));
    const operationalValues = chartData?.map(item => item.operationalValue.toFixed(0));
    const percentageStrategic = chartData?.map(item => item.percentageStrategic);
    const percentageOperational = chartData?.map(item => item.percentageOperational);

    const chartConfig = {
        ...customConfig,

        plot: {
            stacked: true,
            barWidth: "25px",
            stackType: '100%',
        },
        scaleY: {
            format: "%v%",
            label: {
                text: "Percentage",
            }
        },
        tooltip: {
            text: "%data-count items (%v%) %t",
            decimals: 2,
            thousandsSeparator: ','
        },

        // TODO: fix series coz data-percentage and values are interchanged. that is just to fix the tooltip
        series: [
            {
                text: 'Strategic Initiatives',
                values: percentageStrategic,
                backgroundColor: '#26BDB5',
                "data-count": strategicValues,
            },
            {
                text: 'Operational Work',
                values: percentageOperational,
                backgroundColor: '#AAEEEA',
                "data-count": operationalValues,
            },
        ],
        scaleX: {
            labels: dates,
        },
        legend: {
            ...ratioLegends,
            paddingTop: 15
        }
    };

    if (!strategicValues && !operationalValues) {
        return <NoDataAvailable>No data available for the selected criteria</NoDataAvailable>;
    }

    return (
        <div>
            <ZingChart data={chartConfig} theme={customTheme} />
        </div>
    );
};

export default HistoricalBarChart;