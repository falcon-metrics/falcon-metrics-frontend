import ZingChart from 'zingchart-react';
import Box from '@material-ui/core/Box';
import { useStyles } from './styles';

export interface HorizontalBarProps {
  totalItems: number;
  itemCount: number;
  customProps: any;
}

export const HorizontalBar = ({ itemCount, totalItems, customProps }: HorizontalBarProps) => {
  const classes = useStyles();
  const chartConfig = getChartConfig(itemCount, totalItems, customProps);
  return (
    <Box className={classes.barchartContainer}>
      <ZingChart data={chartConfig} />
    </Box>
  );
};

const getChartConfig = (itemCount, totalItems, customProps) => {
  const others = totalItems - itemCount;

  return {
    ...customProps.allCustom,
    type: 'hbar',
    height: 100,
    y: 0,
    plotarea: {
      'adjust-layout': true,
    },
    gui: {
      contextMenu: {
        button: {
          visible: false,
        },
      },
    },
    tooltip: {
      visible: true,
      backgroundColor: "#ffffff",
      fontColor: "#707070",
      fontSize: "12px",
      fontFamily: "Open Sans",
      padding: "8px",
      htmlMode: true,
      shadow: false,
      borderColor: "#e3e3e3",
      borderWidth: "1px",
      text: '%v work items %plot-description',
      rules: [
        {
          rule: '%v === 1',
          text: '%v work item %plot-description',
        },
      ],
    },
    plot: {
      stacked: true,
      'stack-type': '100%',
      // animation: {
      //   effect: 'ANIMATION_SLIDE_BOTTOM',
      //   sequence: 0,
      //   speed: 400,
      //   delay: 100,
      // },
      ...customProps.plot,
    },
    'scale-y': {
      'min-value': 0,
      'max-value': 100,
      step: 25,
      'line-color': 'none',
      labels: ['0%', '25%', '50%', '75%', '100%'],
      tick: {
        lineWidth: 1,
        size: 2,
        'line-color': '#ccc',
      },
    },
    'scale-x': {
      labels: [' ', ' '],
      tick: {
        lineWidth: 1,
        size: 2,
        'line-color': '#ccc',
      },
    },
    ...customProps.yScale,
    ...customProps.tooltip,
    series: [
      {
        description: 'on this obeya',
        values: [itemCount],
        'background-color': "#26BDB5",
        stack: 1,
      },
      {
        description: 'on others',
        values: [others <= 0 ? 0 : others],
        'background-color': "#D7D7D7",
        stack: 1,
      },
    ],
  };
};

export default HorizontalBar;
