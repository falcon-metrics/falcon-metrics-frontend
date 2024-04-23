import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";

import { skeletonProps } from "../../utils";
import { TimeToCommitWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { isTimeToCommitEmpty } from "views/ValueStreamManagement/views/DeliveryGovernance/utils/validation/isFlowOfDemandsDataEmpty";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 140,
    width: "100%",
    fontFamily: "Open Sans",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
    alignSelf: "flex-end",
    marginBottom: 14,
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
  },
}));

type KPIProps = {
  timeToCommit?: number | null;
  isLoading?: boolean;
};

const skeletonConfig = {
  firstBlock: {
    width: 90,
    height: 30,
    style: { marginLeft: 35, marginTop: -15 },
  },
};

const KPIView = ({ timeToCommit = 0, isLoading }: KPIProps) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box display="flex">
        <Box className={classes.contentContainer}>
          <DefaultSkeleton {...skeletonProps} {...skeletonConfig} />
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Box className={classes.contentContainer}>
        <Box className={classes.kpiContainer}>
          <Typography className={classes.kpiValue}>
            {timeToCommit ? timeToCommit.toFixed(0) : null}
          </Typography>
          {timeToCommit ? (
            <Typography className={classes.description}>days</Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  isLoading?: boolean;
  data?: TimeToCommitWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const TimeToCommit = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const styles = useStyles();

  if (!isWidgetPreview) {
    const activeLight = getTrafficLightColorByPattern(data?.pattern);

    return (
      <IndicatorCard
        title="Time to Start"
        trafficLight={activeLight}
        isEmpty={!isLoading && (isEmpty || isTimeToCommitEmpty(data))}
        widgetInfo={!isLoading ? widgetInfo : []}
        isDashboardEdit={isDashboardEdit}
      >
        <Typography className={styles.subtitle}>(85th %ile)</Typography>
        <KPIView timeToCommit={data?.timeToCommit} isLoading={isLoading} />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard
        title="Time to Start"
        trafficLight={LightTypes.GREEN}
        hideWidgetInfo
      >
        <Box width={220}>
          <Typography className={styles.subtitle}>(85th %ile)</Typography>
          <KPIView timeToCommit={7} isLoading={isLoading} />
        </Box>
      </IndicatorCard>
    );
  }
};
