import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";
import { CommitmentRateWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";

import { skeletonProps } from "../../utils";
import { isCommitmentRateEmpty } from "views/ValueStreamManagement/views/DeliveryGovernance/utils/validation/isFlowOfDemandsDataEmpty";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";

const useStyles = makeStyles(() => ({
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
}));

type KPIProps = {
  commitmentRatePercent?: number | null;
  isLoading?: boolean;
};

const KPIView = ({ commitmentRatePercent = 0, isLoading }: KPIProps) => {
  const classes = useStyles();

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
            {commitmentRatePercent
              ? `${commitmentRatePercent.toFixed(0)}%`
              : null}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  isLoading?: boolean;
  data?: CommitmentRateWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const CommitmentRate = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  if (!isWidgetPreview) {
    const activeLight = getTrafficLightColorByPattern(data?.pattern);

    return (
      <IndicatorCard
        title="Committed Work Rate"
        trafficLight={activeLight}
        isEmpty={!isLoading && (isEmpty || isCommitmentRateEmpty(data))}
        widgetInfo={!isLoading ? widgetInfo : []}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          commitmentRatePercent={data?.commitmentRatePercent}
          isLoading={isLoading}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard
        title="Committed Work Rate"
        trafficLight={LightTypes.GREEN}
        hideWidgetInfo
      >
        <Box width={220}>
          <KPIView commitmentRatePercent={100} isLoading={isLoading} />
        </Box>
      </IndicatorCard>
    );
  }
};
