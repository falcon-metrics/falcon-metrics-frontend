import { memo, useMemo } from 'react';
import ZingChart from 'zingchart-react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { DateTime } from 'luxon';
import './style.css';
import { formatDate } from 'utils/dateTime';

export const useStyles = makeStyles(() => ({
  barchartContainer: {
    position: 'relative',
    marginBottom: 2,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 75,
    '& > div': {
      height: '104px !important',
    },
  },
}));

export interface TimeLapseProps {
  customProps?: unknown;
  startDate?: string;
  endDate?: string;
  completedCount?: number;
  remainingCount?: number;
}

export const TimeLapse = ({
  completedCount = 0,
  remainingCount = 0,
  customProps = { plot: {}, tooltip: {}, yScale: {}, xScale: {} },
  startDate,
  endDate,
}: TimeLapseProps) => {
  const classes = useStyles();
  const chartConfig = useMemo(
    () =>
      getChartConfig(
        completedCount,
        remainingCount,
        customProps,
        startDate,
        endDate,
      ),
    [completedCount, remainingCount, customProps, startDate, endDate],
  );

  return (
    <Box className={`${classes.barchartContainer} timelapse-bar-chart`}>
      <ZingChart data={chartConfig} id="timelapse" className="timelapse" />
    </Box>
  );
};

const getChartConfig = (
  completedCount,
  remainingCount,
  customProps,
  startDate,
  endDate,
) => {
  const formattedStartDate = DateTime.fromISO(startDate);
  const formattedEndDate = DateTime.fromISO(endDate);

  const totalOfDays = formattedEndDate.diff(formattedStartDate).as('days');
  const passedDays = DateTime.now().diff(formattedStartDate).as('days');
  const isValidCountOfDays = isNaN(totalOfDays) ||
    isNaN(passedDays) || totalOfDays === 0 ||
    passedDays === 0 || passedDays >= totalOfDays;

  const percentofPassedDays: Number = isValidCountOfDays
    ? 0 : Math.round((Number(passedDays) / Number(totalOfDays)) * 100);

  const remainingPercentDays: Number = percentofPassedDays > 0
    ?  100 - Number(percentofPassedDays) : 0;

  const minValue = startDate
    ? formattedStartDate.valueOf()
    : DateTime.now().valueOf();

  const maxValue = endDate
    ? formattedEndDate.valueOf()
    : DateTime.now().valueOf();

  const diff = formattedEndDate.diff(DateTime.now());
  const valueBoxDate =
    endDate && diff.as('minutes') <= 0
      ? formatDate(endDate)
      : formatDate(DateTime.now());

  return {
    type: 'hbullet',
    width: '100%',
    height: 64,
    utc: true,
    y: '0%',
    x: 0,
    id: 'timelapse',
    class: 'timelapse',
    margin: 2,
    globals: {
      fontFamily: 'Open Sans',
    },
    plotarea: {
      'adjust-layout': true,
      padding: '0% 0% 0% 0%,',
      id: 'timelapse',
      class: 'timelapse',
    },
    gui: {
      contextMenu: {
        button: {
          visible: false,
        },
      },
    },
    plot: {
      stacked: true,
      borderRadius: 20,
      // animation: {
      //   effect: 'ANIMATION_SLIDE_BOTTOM',
      //   sequence: 0,
      //   speed: 400,
      //   delay: 100,
      // },
      goal: {
        alpha: 0.9,
        borderWidth: 1,
        height: 45,
      },
      ...customProps.plot,
      valueBox: [
        {
          color: '#000',
          placement: 'top-out',
          offsetY: 20,
          offsetX: -30,
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          callout: true,
          text: valueBoxDate || '-',
          type: 'last',
        },
        {
          color: '#000',
          placement: 'top-out',
          offsetY: -15,
          offsetX: -20,
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          callout: true,
          text: '',
          type: 'last',
        },
    ],
    },
    'scale-y': {
      'min-value': minValue,
      'max-value': maxValue,
      lineColor: 'none',
      tick: {
        visible: false,
      },
      values: [minValue, '', maxValue],
      visible: false,
      step: 'day',
    },
    'scale-y-2': {
      'min-value': minValue,
      'max-value': maxValue,
      lineColor: 'none',
      tick: {
        visible: false,
      },
      values: [minValue, '', maxValue],
      label: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      step: 'day',
      transform: {
        type: 'date',
        all: '%dd %M %Y',
      },
    },
    'scale-x': {
      labels: [''],
      lineColor: 'none',
      tick: {
        visible: false,
      },
      label: {
        fontSize: '14px',
        fontFamily: 'Open Sans',
        offsetX: 20,
      },
      guide: {
        visible: false,
      },
    },
    ...customProps.yScale,
    ...customProps.tooltip,
    tooltip: {
      visible: true,
    },
    series: [
      {
        values: [[DateTime.now().valueOf(), completedCount]],
        backgroundColor: '#0077C8',
        stack: 1,
        goal: {
          backgroundColor: '#0077C8',
          height: 50,
          borderColor: '#0077C8',
          alpha: 1,
          size: 50,
          size2: 50,
          tooltip: {
            text: `${percentofPassedDays}%`,
          }
        },
        tooltipText: `${percentofPassedDays}%`,
        goals: [
          [
            maxValue < DateTime.now().valueOf()
              ? maxValue
              : DateTime.now().valueOf(),
            completedCount,
          ],
        ],
      },
      {
        tooltipText: `${remainingPercentDays}%`,
        values: [[DateTime.now().valueOf(), remainingCount]],
        backgroundColor: '#E2E2E2',
        stack: 1,
        valueBox: {
          text: '',
        },
      },
    ],
  };
};

export default memo(TimeLapse);
