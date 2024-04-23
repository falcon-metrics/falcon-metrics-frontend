import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DefaultSkeleton from 'views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton';
import { getTrafficLightColorByPattern } from 'views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern';
import { TargetWipWidgetData } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay';
import IndicatorCard from 'views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard';
import { WidgetInformation } from 'views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common';

const useStyles = makeStyles(() => ({
  contentContainer: {
    width: 230,
    height: 190,
    display: 'flex',
    fontFamily: 'Open Sans',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    color: '#32383E',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#32383E',
    marginBottom: 7,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#32383E',
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    color: '#32383E',
    display: 'flex',
    alignSelf: 'left',
  }
}));

type KPIProps = {
  value?: number | null;
};

const KPIView = ({ value }: KPIProps) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Box className={classes.kpiContainer}>
        <Typography className={classes.kpiValue}>{
          typeof value === 'number' ? value.toFixed(0) : '-'
        }</Typography>
        <Typography className={classes.description}>
          {typeof value === 'number' ? 'flow units' : ''}
        </Typography>
      </Box>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: TargetWipWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
};

export const TargetWip = ({
  isLoading,
  data,
  widgetInfo,
  isEmpty,
}: Props) => {
  const styles = useStyles();
  const activeLight = getTrafficLightColorByPattern(data?.pattern);
  
  return (
    <IndicatorCard
      title="WIP Excess"
      trafficLight={activeLight}
      isEmpty={!isLoading && (isEmpty || data === undefined)}
      widgetInfo={!isLoading ? widgetInfo : []}
    >
      {isLoading
        ? <Box mt={2}>
            <DefaultSkeleton />
          </Box>
        : <Box className={styles.contentContainer}>
            <Typography className={styles.subtitle}>
              {data?.wipExcessTitle}
            </Typography>
            <KPIView value={data?.wipExcessValue} />
            <Box display="flex" alignSelf="left" flexDirection="column">
              <Typography className={styles.footer}>
                Current WIP: &nbsp; <b>{(data?.currentWip || 0).toFixed(0)}</b> &nbsp; flow items
              </Typography>
              <Typography className={styles.footer}>
                Target WIP: &nbsp; <b>{(data?.targetWip || 0).toFixed(0)}</b> &nbsp; flow items
              </Typography>
            </Box>
          </Box>
        }
    </IndicatorCard>
  );
};
