import { useMemo } from 'react';
import { daysToIntervalString } from 'utils/daysToIntervalString';
import ZingChart from 'zingchart-react';

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
            text: "%plot-description",
            decimals: 0,
            align: 'left'
        },
    },
};

type Props = {
    data: { text: string; value: number; description?: string; percentile85?: number }[];
};

const colors = [
    '#0077C8',
    '#3392D3',
    '#66ADDE',
    '#99C9E9',
    '#BEDBF0',
    '#C3C8D1',
];

const TimeInStageGraph = ({ data }: Props) => {
    const chartData = useMemo(() => {
        const total = data.reduce((last, curr) => last + curr.value, 0);
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
                    plot: {
                        stacked: true,
                        'stack-type': '100%',
                        'scale-y': {
                            'min-value': 0,
                            'max-value': 1600
                        },
                        'value-box': [{
                            text: '%t',
                            placement: 'middle',
                            'font-color': 'white'
                        }, {
                            visible: false,
                        }],
                        barWidth: '50%',
                    },
                    plotarea: {
                        margin: '130 10 90 60'
                    },
                    scaleX: {
                        labels: [""],
                        visible: true,
                        label: {
                            color: '#6C6C6C',
                            text: 'Workflow stages',
                        },
                        lineColor: '#D8D8D8',
                        tick: {
                            visible: true,
                            _lineColor: '#D8D8D8'
                        },
                        item: {
                            color: '#6C6C6C',
                            angle: '-35'
                        },
                    },
                    scaleY: {
                        lineColor: '#D8D8D8',
                        'min-value': 0,
                        'max-value': 100,
                        format: '%v%',
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
                            visible: false,
                        },
                    },
                    series: data.map(({ text, value, description, percentile85 }, index) => {
                        text = text + ' (' + (100 * value / total).toFixed(0) + '%)';
                        return {
                            text,
                            values: [value],
                            'background-color': colors[index % colors.length],
                            // If there's no description, use the text as description. 
                            // If the description is a blank string, there's an error from ZingCharts
                            // That's why we need this workaround
                            description: description ?? `${daysToIntervalString(value)} ${text} | 85th percentile: ${percentile85}`
                        };
                    })
                }
            ]
        };
    }, [data]);

    return <ZingChart style={{ flexBasis: '50%', marginTop: '-119px' }} data={chartData} theme={myTheme} />;
};

export default TimeInStageGraph;