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
    height: '100%',
  },
}));

export interface HorizontalBarProps {
  donePerc?: number;
  inProgressPerc?: number;
  toDoPerc?: number;
  percentSymbol?: string;
  customProps?: unknown;
  backgroundColor?: string;
  customStyles?: any;
}

export const HorizontalBar = ({
  donePerc = 0,
  inProgressPerc = 0,
  toDoPerc = 0,
  percentSymbol = '',
  backgroundColor = '#fff',
  customStyles = {},
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
    <Box className={classes.barchartContainer} style={{ ...customStyles }}>
      <ZingChart height='100%' data={chartConfig} />
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
    backgroundColor,
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
      // barOverlap: '10%',
      barWidth: '10px',
    },
    'scale-y': {
      'min-value': 0,
      'max-value': 100,
      // step: 25,
      // 'line-color': 'none',
      // labels: ['0%', '25%', '50%', '75%', '100%'],
      // tick: {
      //   lineWidth: 1,
      //   size: 2,
      //   'line-color': '#ccc',
      // },
      visible: false
    },
    'scale-x': {
      visible: false
    },
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
