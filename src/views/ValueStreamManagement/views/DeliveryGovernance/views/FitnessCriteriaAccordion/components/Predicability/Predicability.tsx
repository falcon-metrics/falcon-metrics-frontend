import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  PredictabilityTabComponents,
  PredictabilityTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { PredictabilityCriterion } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    width: "100%"
  },
  predicabilityTitle: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: "Open Sans",
    color: "#32383E",
    fontWeight: "bold",
  },
  predicabilityValue: {
    fontSize: 14,
    fontFamily: "Open Sans",
    color: "#32383E",
    textAlign: "center",
    padding: "8px 4px 0px 15px",
  },
  predicabilityTitleContainer: {
    // width: "100%",
    display: "flex",
    // padding: "0 4px 0 4px",
  },
  predicabilityValueContainer: {
    // width: "100%",
    display: "flex",
    marginTop: 6,
  },
  leftColumn: {
    width: "60%",
    display: "flex",
    justifyContent: "flex-start",
  },
  rightColumn: {
    // width: "40%",
    justifyContent: "center",
  },
}));

type KPIProps = {
  throughput: string;
  leadtime: string;
  isLoading?: boolean;
};

const KPIView = ({ throughput, leadtime, isLoading }: KPIProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.contentContainer}>
      <Box className={classes.predicabilityTitleContainer}>
        <Typography
          className={`${classes.predicabilityTitle} ${classes.leftColumn}`}
        >
          &nbsp;
        </Typography>
        <Typography
          className={`${classes.predicabilityTitle} ${classes.rightColumn}`}
        >
          {isLoading ? (
            <Skeleton
              width={48}
              height={14}
              style={{ marginTop: 10 }}
              variant="text"
            />
          ) : (
            "Predictability"
          )}
        </Typography>
      </Box>
      <Box className={classes.predicabilityValueContainer}>
        <Typography
          className={`${classes.predicabilityValue} ${classes.leftColumn}`}
        >
          {isLoading ? (
            <Skeleton
              width={88}
              height={14}
              style={{ marginTop: 10 }}
              variant="text"
            />
          ) : (
            "Lead Time"
          )}
        </Typography>
        <Typography
          className={`${classes.predicabilityValue} ${classes.rightColumn}`}
        >
          {isLoading ? (
            <Skeleton
              width={48}
              height={14}
              style={{ marginTop: 10 }}
              variant="text"
            />
          ) : (
            leadtime
          )}
        </Typography>
      </Box>
      <Box className={classes.predicabilityValueContainer}>
        <Typography
          className={`${classes.predicabilityValue} ${classes.leftColumn}`}
        >
          {isLoading ? (
            <Skeleton
              width={88}
              height={14}
              style={{ marginTop: 10 }}
              variant="text"
            />
          ) : (
            "Delivery Rate"
          )}
        </Typography>
        <Typography
          className={`${classes.predicabilityValue} ${classes.rightColumn}`}
        >
          {isLoading ? (
            <Skeleton
              width={48}
              height={14}
              style={{ marginTop: 10 }}
              variant="text"
            />
          ) : (
            throughput
          )}
        </Typography>
      </Box>
    </Box>
  );
};

type Props = {
  predictability?: PredictabilityCriterion;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  onClick?: (boolean) => void;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const Predicability = ({
  predictability,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  onClick,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const tabComponents: React.ReactNode[] = PredictabilityTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Delivery Predictability"
        isEmpty={!isLoading && (isEmpty || predictability === undefined)}
        isLoading={isLoading}
        customProps={customProps}
        tabViewTitles={PredictabilityTabs}
        tabComponents={tabComponents}
        widgetInfo={!isLoading ? widgetInfo : []}
        onClick={onClick}
        isVisible={true}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          throughput={predictability?.throughput || ""}
          leadtime={predictability?.leadtime || ""}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Delivery Predictability" hideWidgetInfo>
        <Box width={220}>
          <KPIView isLoading={isLoading} throughput={"High"} leadtime={"Low"} />
        </Box>
      </IndicatorCard>
    );
  }
};
