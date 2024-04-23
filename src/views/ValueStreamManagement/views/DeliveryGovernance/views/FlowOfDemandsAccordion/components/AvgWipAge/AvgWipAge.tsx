import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";
import { AvgWipAgeWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";

import { skeletonProps } from "../../utils";
import { isAvgWipAgeEmpty } from "views/ValueStreamManagement/views/DeliveryGovernance/utils/validation/isFlowOfDemandsDataEmpty";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";

const useStyles = makeStyles(() => ({
  subtitle: {
    position: "absolute",
    left: 14,
    fontFamily: "Open Sans",
  },
  contentContainer: {
    height: 180,
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
}));

type KPIProps = {
  isLoading?: boolean;
  avgWipAge?: AvgWipAgeWidgetData;
};

const KPIView = ({ avgWipAge, isLoading }: KPIProps) => {
  const classes = useStyles();

  const averageAge = avgWipAge?.averageAge;

  if (isLoading) {
    return (
      <Box display="flex">
        <Box className={classes.contentContainer}>
          <DefaultSkeleton {...skeletonProps} />
        </Box>
      </Box>
    );
  }
  return (
    <Box display="flex">
      <Box className={classes.contentContainer}>
        <Box className={classes.kpiContainer}>
          <Typography className={classes.kpiValue}>
            {averageAge ? averageAge.toFixed(0) : null}
          </Typography>
          {averageAge ? (
            <Typography className={classes.description}>days</Typography>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: AvgWipAgeWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const AvgWipAge = ({
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
        title="Work in Progress Age"
        trafficLight={activeLight}
        isEmpty={!isLoading && (isEmpty || isAvgWipAgeEmpty(data))}
        widgetInfo={!isLoading ? widgetInfo : []}
        isDashboardEdit={isDashboardEdit}
      >
        <span className={styles.subtitle}>(average)</span>
        <KPIView avgWipAge={data} isLoading={isLoading} />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard
        title="Work in Progress Age"
        trafficLight={LightTypes.GREEN}
        hideWidgetInfo
      >
        <Box width={220}>
          <span className={styles.subtitle}>(average)</span>
          <KPIView
            avgWipAge={{
              averageAge: 75,
              pattern: "good",
            }}
            isLoading={isLoading}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
