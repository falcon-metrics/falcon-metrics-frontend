import ZingChart from 'zingchart-react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { ObeyaColors } from 'views/Governance/utils/constants';

export const useStyles = makeStyles(() => ({
  barchartContainer: {
    width: '100%',
    marginBottom: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    height: 100,
    '& > div': {
      height: '104px !important',
    },
  },
}));

export interface HorizontalBarProps {
  donePerc?: number;
  inProgressPerc?: number;
  toDoPerc?: number;
  percentSymbol?: string;
  customProps?: unknown;
  backgroundColor?: string;
}

export const HorizontalBar = ({
  donePerc = 0,
  inProgressPerc = 0,
  toDoPerc = 0,
  percentSymbol = '',
  backgroundColor = '#fff',

  customProps = {
    plot: {},
    tooltip: {},
    yScale: {},
    xScale: {},
    plotarea: {},
    allCustom: {},
  },
}: HorizontalBarProps) => {
  const classes = useStyles();
  const chartConfig = getChartConfig(
    percentSymbol,
    donePerc,
    inProgressPerc,
    toDoPerc,
    customProps,
    backgroundColor,
  );
  return (
    <Box className={classes.barchartContainer}>
      <ZingChart data={chartConfig} />
    </Box>
  );
};

const getChartConfig = (
  percentSymbol,
  donePerc,
  inProgressPerc,
  toDoPerc,
  customProps,
  backgroundColor,
) => {
  return {
    type: 'hbar',
    height: 100,
    backgroundColor,
    ...customProps.allCustom,
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
        description: 'completed',
        values: [donePerc],
        'background-color': ObeyaColors.COMPLETED,
        stack: 1,
      },
      {
        description: 'in progress',
        values: [inProgressPerc],
        'background-color': ObeyaColors.IN_PROGRESS,
        stack: 1,
      },
      {
        description: 'not started',
        values: [toDoPerc],
        'background-color': ObeyaColors.NOT_STARTED,
        stack: 1,
      },
    ],
  };
};

export default HorizontalBar;
