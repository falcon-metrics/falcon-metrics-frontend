import { ReactNode, useEffect, useState } from 'react';
import ZingChart from 'zingchart-react';
import { Box } from '@material-ui/core';
import { useStyles } from './styles';

type Props = {
  series: any[];
  label?: string;
  countItems: number;
  children: ReactNode;
  seriesToCreate?: any[];
};

export const CircularProgress = ({
  series,
  label,
  countItems,
  children,
  seriesToCreate,
}: Props) => {
  const classes = useStyles();

  const [config, setConfig] = useState(series);

  useEffect(() => {
    if (seriesToCreate) {
      const newConfig = setupConfig(
        seriesToCreate,
        countItems,
        `${label}${countItems === 1 ? '' : 's'}`,
      );
      setConfig(newConfig as any);
    }
  }, [
    seriesToCreate?.[0]?.values?.[0],
    seriesToCreate?.[1]?.values?.[0],
    seriesToCreate?.[2]?.values?.[0],
    seriesToCreate?.[3]?.values?.[0]
  ]);

  return (
    <Box className={classes.circularProgressWrapper}>
      {children}
      <ZingChart data={config} />
    </Box>
  );
};

const setupConfig = (
  series: any[],
  countItems?: string | number,
  label?: string,
) => {
  return {
    offsetY: 0,
    height: 290,
    type: 'ring',
    globals: {
      fontFamily: 'Open Sans',
      fontWeight: '100',
    },
    gui: {
      contextMenu: {
        button: {
          visible: false,
        },
      },
    },
    // plotarea: {
    //   padding: '0% 0% 0% -40%',
    //   marginLeft: '0% 0% 0% 120%',
    // },
    plot: {
      backgroundColor: '#41B6E6',
      fontSize: '14px',
      // animation: {
      //   delay: 0,
      //   effect: 'ANIMATION_EXPAND_VERTICAL',
      //   method: 'ANIMATION_LINEAR',
      //   sequence: 'ANIMATION_BY_PLOT',
      //   speed: '400',
      // },
      tooltip: {
        visible: true,
        callout: false,
        calloutWidth: '12px',
        backgroundColor: '#ffffff',
        fontFamily: 'Open Sans',
        fontColor: '#707070',
        fontSize: '12px',
        padding: '8px',
        htmlMode: false,
        shadow: false,
        borderColor: '#e3e3e3',
        borderWidth: '1px',
        text: '%v %t\n (%npv%)',
      },
      detach: false,
      hoverState: {
        visible: false,
      },
      refAngle: 60,
      slice: '80%',
      valueBox: [
        {
          text: countItems ? countItems : '',
          fontSize: '28px',
          fontFamily: 'Open Sans',
          color: '#787470',
          placement: 'center',
          offsetY: '-1300%',
        },
        {
          text: countItems ? label : '',
          fontSize: '12px',
          fontFamily: 'Open Sans',
          color: '#787470',
          placement: 'center',
          offsetY: '1700%',
        },
      ],
    },
    legend: {
      layout: '4x2',
      maxItems: '8',
      overflow: 'scroll',
      border: '0px',
      adjustLayout: 'true',
      verticalAlign: 'bottom',
      align: 'center',
      fontFamily: 'Open Sans',
      item: {
        fontSize: '11px',
        fontFamily: 'Open Sans',
        fontColor: 'rgba(0, 0, 0, 0.7)',
      },
      marker: {
        type: 'circle',
        size: 5,
      },
    },
    series,
  };
};
