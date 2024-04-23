import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  FlowEfficiencyTabComponents,
  FlowEfficiencyTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";
import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { FlowEfficiencyCriterion } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    width: "100%",
    fontFamily: "Open Sans",
  },
  description: {
    marginTop: 10,
    color: "#32383E",
    fontSize: 12,
    fontFamily: "Open Sans",
    textAlign: "center",
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
  },
  footer: {
    color: "#32383E",
    fontSize: 12,
    fontFamily: "Open Sans",
    alignSelf: "flex-end",
    display: "flex",
    width: "90%",
    justifyContent: "flex-end",
  },
}));

type KPIProps = {
  isLoading: boolean;
  averageOfWaitingTime?: number;
};

const KPIView = ({ isLoading, averageOfWaitingTime }: KPIProps) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Box className={classes.contentContainer}>
        {isLoading ? <DefaultSkeleton /> : null}
        {!isLoading ? (
          <>
            <Typography className={classes.description}>
              On average, completed flow <br />
              items are actively worked on
            </Typography>
            <Typography className={classes.kpiValue}>
              {averageOfWaitingTime && typeof averageOfWaitingTime === "number"
                ? `${averageOfWaitingTime.toFixed(0)}%`
                : "-"}
            </Typography>
            <Typography className={classes.footer}>of the time</Typography>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

const getTrafficLight = (averageOfWaitingTime?: number) => {
  const defaultLight = LightTypes.GRAY;
  if (!averageOfWaitingTime) {
    return defaultLight;
  } else if (averageOfWaitingTime < 15) {
    return LightTypes.RED;
  } else if (averageOfWaitingTime > 15 && averageOfWaitingTime < 41) {
    return LightTypes.YELLOW;
  } else if (averageOfWaitingTime >= 41) {
    return LightTypes.GREEN;
  }
  return defaultLight;
};

type Props = {
  flowEfficiency?: FlowEfficiencyCriterion;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  onClick?: (boolean) => void;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const FlowEfficiency = ({
  flowEfficiency,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  onClick,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const activeLight = getTrafficLight(flowEfficiency?.averageOfWaitingTime);
  const tabComponents: React.ReactNode[] = FlowEfficiencyTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Workflow Efficiency"
        isEmpty={!isLoading && (isEmpty || flowEfficiency === undefined)}
        isLoading={isLoading}
        customProps={customProps}
        tabViewTitles={FlowEfficiencyTabs}
        tabComponents={tabComponents}
        widgetInfo={!isLoading ? widgetInfo : []}
        trafficLight={activeLight}
        onClick={onClick}
        isVisible={true}
        isIndustryStandardVisible={true}
        industryStandardContent={flowEfficiency?.industryStandardMessage}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          averageOfWaitingTime={flowEfficiency?.averageOfWaitingTime}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Workflow Efficiency" hideWidgetInfo>
        <Box width={220}>
          <KPIView isLoading={isLoading} averageOfWaitingTime={75} />
        </Box>
      </IndicatorCard>
    );
  }
};
