import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  ProductivityTabComponents,
  ProductivityTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { ProductivityCriterion } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";

const useStyles = makeStyles(() => ({
  contentContainer: {
    maxHeight: 200,
    justifyContent: "center",
  },
  productivityLabel: {
    fontSize: 18,
    fontFamily: "Open Sans",
    color: "#32383E",
    fontWeight: "bold",
    textAlign: "center",
  },
  productivityLabelContainer: {
    flexDirection: "column",
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  productivityInfoContainer: {
    fontSize: 12,
    textAlign: "center",
    "& > span": {
      fontFamily: "Open Sans",
    },
  },
}));

type KPIProps = {
  mean?: number;
  lastWeek?: number;
  trendAnalysis?: any;
  productivityLabel?: string;
  isLoading: boolean;
};

export const KPIView = ({
  mean,
  lastWeek,
  trendAnalysis,
  productivityLabel,
  isLoading,
}: KPIProps) => {
  const classes = useStyles();
  const separatorBar = " | ";

  return (
    <Box className={classes.contentContainer}>
      <Box className={classes.productivityLabelContainer}>
        {isLoading ? (
          <Skeleton variant="text" width={224} height={23} />
        ) : (
          <Typography className={classes.productivityLabel}>
            {productivityLabel || ""}
          </Typography>
        )}
        <Box className={classes.productivityInfoContainer}>
          {isLoading ? (
            <Box display="flex">
              <Skeleton
                variant="text"
                style={{ marginRight: 10 }}
                width={30}
                height={16}
              />{" "}
              <Skeleton variant="text" width={30} height={16} />
            </Box>
          ) : (
            <>
              <span>Mean: {mean}</span>
              {separatorBar}
              <span>Last Week: {lastWeek}</span>
            </>
          )}
          {isLoading ? (
            <Skeleton
              variant="text"
              style={{ marginLeft: 20 }}
              width={30}
              height={16}
            />
          ) : (
            <>
              <br />
              <span>Trend: {trendAnalysis?.arrowDirection}</span>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  productivity?: ProductivityCriterion;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  onClick?: (boolean) => void;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const Productivity = ({
  productivity,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  onClick,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const {
    mean,
    lastWeek,
    trendAnalysis,
    productivityLabel,
    productivityColor,
  } = productivity || {};
  const activeLight: LightTypes =
    LightTypes[productivityColor || LightTypes.GRAY];
  const tabComponents: React.ReactNode[] = ProductivityTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        // Old title was Predictability
        title="Delivery Rate Comparison"
        isEmpty={!isLoading && (isEmpty || productivity === undefined)}
        isLoading={isLoading}
        customProps={customProps}
        tabViewTitles={ProductivityTabs}
        tabComponents={tabComponents}
        trafficLight={activeLight}
        widgetInfo={!isLoading ? widgetInfo : []}
        onClick={onClick}
        isVisible={true}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          mean={mean}
          lastWeek={lastWeek}
          trendAnalysis={trendAnalysis}
          productivityLabel={productivityLabel}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Delivery Rate Comparison" hideWidgetInfo>
        <Box width={220}>
          <KPIView
            isLoading={isLoading}
            mean={3}
            lastWeek={2}
            trendAnalysis={{
              percentage: -10,
              text: "less",
              arrowDirection: "Down",
              arrowColour: "RED",
            }}
            productivityLabel={"Slightly Under"}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
