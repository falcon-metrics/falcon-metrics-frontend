import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { InventorySizeWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";

import { skeletonProps } from "../../utils";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import {
  InventoryTabComponents,
  InventoryTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: 175,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
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
  footer: {
    color: "rgba(50, 56, 62, 1)",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Open Sans",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0em",
  },
}));

type KPIProps = {
  valueDemandKpi: number;
  isLoading?: boolean;
  weeksWorthCount?: number;
};

const KPIView = ({ valueDemandKpi, isLoading, weeksWorthCount }: KPIProps) => {
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
    <Box className={classes.mainContainer}>
      <Box className={classes.contentContainer}>
        {valueDemandKpi ? (
          <Box className={classes.kpiContainer}>
            <Typography className={classes.kpiValue}>
              {valueDemandKpi ? `${valueDemandKpi.toFixed(0)}` : "-"}
            </Typography>
            <Typography className={classes.description}>flow items</Typography>
          </Box>
        ) : null}
      </Box>
      {weeksWorthCount ? (
        <Typography className={classes.footer}>
          ( {weeksWorthCount.toFixed(0)} weeks worth of inventory )
        </Typography>
      ) : null}
    </Box>
  );
};

type Props = {
  data?: InventorySizeWidgetData;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const InventorySize = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const tabComponents: React.ReactNode[] = InventoryTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Total Upcoming Work"
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={InventoryTabs}
        isLoading={isLoading}
        customProps={customProps}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          valueDemandKpi={data?.inventoryCount || 0}
          isLoading={isLoading}
          weeksWorthCount={data?.weeksWorthCount || 0}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Total Upcoming Work" hideWidgetInfo>
        <Box width={220}>
          <KPIView
            valueDemandKpi={10}
            isLoading={isLoading}
            weeksWorthCount={2}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
