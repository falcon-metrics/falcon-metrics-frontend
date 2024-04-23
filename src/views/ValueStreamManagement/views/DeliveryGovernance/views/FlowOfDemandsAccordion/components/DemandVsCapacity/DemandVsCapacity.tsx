import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  DemandVsCapacityTabComponents,
  FlowOfDemandsTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import SkeletonWithTwoBars from "views/ValueStreamManagement/views/DeliveryGovernance/components/SkeletonWithTwoBars";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { DemandVsCapacityWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";

import { getTrafficLightColorByPattern } from "../../../../../../components/TrafficLights/getTrafficLightColorByPattern";
import { ChartBar } from "../ChartBar/ChartBar";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";

const useStyles = makeStyles(() => ({
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
}));

type IndicatorViewProps = {
  isLoading: boolean;
  demand: number;
  capacity: number;
  demandOverCapacityPercent: number;
  inventoryGrowth: number;
  graphAtTheRight?: boolean;
};

export const IndicatorView = ({
  isLoading,
  demand,
  capacity,
  demandOverCapacityPercent,
  inventoryGrowth,
  graphAtTheRight,
}: IndicatorViewProps) => {
  const classes = useStyles();

  const variabilityString =
    !demand || !capacity
      ? " - "
      : demand > capacity
      ? "higher"
      : demand < capacity
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
              width: 220,
              order: graphAtTheRight ? 3 : 1,
              marginLeft: graphAtTheRight ? -20 : 0,
            }}
          >
            <ChartBar
              firstSerieData={[demand]}
              firsSerieName="Demand"
              firstSerieColor="#22A8A1"
              secondSerieData={[capacity]}
              secondSerieName="Capacity"
              secondSerieColor="#004E6F"
              currentDataAggregation="weeks"
            />
          </Box>
          <Box className={classes.contentContainer} style={{ order: 2 }}>
            <>
              <Typography className={classes.indicatorHeader}>
                <span className={classes.circle}>&#9679;</span> Demand
                <span className={classes.indicatorDescriptionValue}>
                  {demandOverCapacityPercent.toFixed(0)}%
                </span>{" "}
                <b>{variabilityString}</b> than capacity.
              </Typography>
              <Typography className={classes.indicatorHeader}>
                <span className={classes.circle}>&#9679;</span> Inventory grew
                by
                <span className={classes.indicatorDescriptionValue}>
                  {inventoryGrowth?.toFixed(0)}
                </span>
                flow items
              </Typography>
            </>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

type DemandVsCapacityProps = {
  data?: DemandVsCapacityWidgetData;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const DemandVsCapacity = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: DemandVsCapacityProps) => {
  const trafficLightColor = getTrafficLightColorByPattern(data?.pattern);
  const tabComponents: React.ReactNode[] = DemandVsCapacityTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Demand vs Capacity"
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
          isLoading={isLoading}
          demand={data?.demand || 0}
          capacity={data?.capacity || 0}
          demandOverCapacityPercent={data?.demandOverCapacityPercent || 0}
          inventoryGrowth={data?.inventoryGrowth || 0}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard
        title="Demand vs Capacity"
        trafficLight={LightTypes.YELLOW}
        hideWidgetInfo
      >
        <Box width={540}>
          <IndicatorView
            isLoading={isLoading}
            demand={10}
            capacity={5}
            demandOverCapacityPercent={50}
            inventoryGrowth={5}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
