import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  CustomerValueTabComponents,
  CustomerValueTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { CustomerValueCriterion } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    width: "100%",
    fontFamily: "Open Sans",
  },
  description: {
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 8,
    color: "#32383E",
    fontSize: 12,
    fontFamily: "Open Sans",
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
    textAlign: "center",
    fontFamily: "Open Sans",
  },
}));

type KPIProps = {
  customerValue?: number;
  isLoading: boolean;
};

const KPIView = ({ customerValue, isLoading }: KPIProps) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Box className={classes.contentContainer}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Skeleton
              width={60}
              height={30}
              style={{ marginLeft: 90, marginTop: 40 }}
              variant="text"
            />
            <br />
            <Skeleton
              width={168}
              height={14}
              style={{ marginLeft: 30, marginTop: 0 }}
              variant="text"
            />
            <Skeleton
              width={120}
              height={14}
              style={{ marginLeft: 30 }}
              variant="text"
            />
          </Box>
        ) : (
          <>
            <Typography className={classes.description}>
              <br />
            </Typography>
            <Typography className={classes.kpiValue}>
              {customerValue && typeof customerValue === "number"
                ? `${customerValue.toFixed(0)}%`
                : "-"}
            </Typography>
            <Typography className={classes.footer}>
              of the flow items completed in this process represent value
              demand.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

const getTrafficLight = (customerValue?: number): LightTypes => {
  const defaultLight = LightTypes.GRAY;

  if (!customerValue) {
    return defaultLight;
  } else if (customerValue <= 29) {
    return LightTypes.RED;
  } else if (customerValue > 29 && customerValue <= 40) {
    return LightTypes.YELLOW;
  } else if (customerValue > 40) {
    return LightTypes.GREEN;
  }

  return defaultLight;
};

type Props = {
  isLoading: boolean;
  customerValue?: CustomerValueCriterion;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  onClick?: (boolean) => void;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const CustomerValue = ({
  isLoading,
  customerValue,
  widgetInfo,
  isEmpty,
  customProps,
  onClick,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const activeLight = getTrafficLight(
    customerValue?.customerValueWorkPercentage
  );
  const tabComponents: React.ReactNode[] = CustomerValueTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Value Delivered"
        isEmpty={!isLoading && (isEmpty || customerValue === undefined)}
        isLoading={isLoading}
        customProps={customProps}
        tabViewTitles={CustomerValueTabs}
        tabComponents={tabComponents}
        widgetInfo={!isLoading ? widgetInfo : []}
        trafficLight={activeLight}
        onClick={onClick}
        isVisible={true}
        isIndustryStandardVisible={true}
        industryStandardContent={customerValue?.industryStandardMessage}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          customerValue={customerValue?.customerValueWorkPercentage || 0}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Value Delivered" hideWidgetInfo>
        <Box width={220}>
          <KPIView isLoading={isLoading} customerValue={100} />
        </Box>
      </IndicatorCard>
    );
  }
};
