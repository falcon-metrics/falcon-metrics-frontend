import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SkeletonWithTwoBars from "views/ValueStreamManagement/views/DeliveryGovernance/components/SkeletonWithTwoBars";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";

import { ChartBar } from "../ChartBar/ChartBar";
import { InflowVsOutflowWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import {
  FlowOfDemandsTabs,
  InflowVsOutflowTabComponents,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";

const useStyles = makeStyles(() => ({
  circle: {
    color: "#32383E",
  },
  indicatorDescriptionValue: {
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "Open Sans",
    marginBottom: "8px",
    padding: "0 4px",
    color: "#32383E",
  },
  contentContainer: {
    height: 200,
    width: 280,
    fontFamily: "Open Sans",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  indicatorHeader: {
    marginTop: 4,
    color: "#818589",
    fontSize: 13,
    fontFamily: "Open Sans",
  },
  indicatorDescription: {
    fontSize: 18,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    marginLeft: 10,
  },
}));

type IndicatorViewProps = {
  inflow: number;
  outflow: number;
  inflowOverOutflowPercent: number;
  wipGrowth: number;
  graphAtTheRight?: boolean;
  isLoading: boolean;
};

export const IndicatorView = ({
  inflow,
  outflow,
  inflowOverOutflowPercent,
  wipGrowth,
  graphAtTheRight,
  isLoading,
}: IndicatorViewProps) => {
  const classes = useStyles();

  const variabilityString =
    !inflow || !outflow
      ? " - "
      : inflow > outflow
      ? "higher"
      : inflow < outflow
      ? "lower"
      : "equal";

  return (
    <Box display="flex" justifyContent="center">
      {isLoading ? <SkeletonWithTwoBars invertOrder={graphAtTheRight} /> : null}
      {!isLoading ? (
        <>
          <Box
            className={classes.contentContainer}
            style={{
              width: 200,
              order: graphAtTheRight ? 3 : 1,
              marginLeft: graphAtTheRight ? -20 : 0,
            }}
          >
            <ChartBar
              firstSerieData={[inflow]}
              firsSerieName="Inflow"
              firstSerieColor="#66ADDE"
              secondSerieData={[outflow]}
              secondSerieName="Outflow"
              secondSerieColor="#005FA0"
              currentDataAggregation="weeks"
            />
          </Box>
          <Box className={classes.contentContainer} style={{ order: 2 }}>
            <Typography className={classes.indicatorHeader}>
              <span className={classes.circle}>&#9679;</span> Inflow
              <span className={classes.indicatorDescriptionValue}>
                {inflowOverOutflowPercent.toFixed(0)}%
              </span>{" "}
              <b>{variabilityString}</b> than outflow.
            </Typography>
            <Typography className={classes.indicatorHeader}>
              <span className={classes.circle}>&#9679;</span> WIP grew by
              <span className={classes.indicatorDescriptionValue}>
                {wipGrowth.toFixed(0)}
              </span>
              flow items
              <br />
            </Typography>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

type InFlowOutFlowProps = {
  data?: InflowVsOutflowWidgetData | null;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const InFlowOutFlow = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: InFlowOutFlowProps) => {
  const trafficLightColor = getTrafficLightColorByPattern(data?.pattern);
  const tabComponents: React.ReactNode[] = InflowVsOutflowTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Work Started vs Work Completed"
        trafficLight={trafficLightColor}
        isWideCard={true}
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabViewTitles={FlowOfDemandsTabs}
        tabComponents={tabComponents}
        customProps={customProps}
        isDashboardEdit={isDashboardEdit}
        isLoading={isLoading}
      >
        <IndicatorView
          inflow={data?.inflow || 0}
          outflow={data?.outflow || 0}
          inflowOverOutflowPercent={data?.inflowOverOutflowPercent || 0}
          wipGrowth={data?.wipGrowth || 0}
          isLoading={isLoading}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard
        title="Work Started vs Work Completed"
        trafficLight={LightTypes.YELLOW}
        hideWidgetInfo
      >
        <Box width={540}>
          <IndicatorView
            inflow={10}
            outflow={5}
            inflowOverOutflowPercent={50}
            wipGrowth={5}
            isLoading={isLoading}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
