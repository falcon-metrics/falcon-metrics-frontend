import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ThroughputTabComponents,
  ThroughputTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { ThroughputWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";

import { skeletonProps } from "../../utils";

const useStyles = makeStyles(() => ({
  subtitle: {
    position: "absolute",
    left: 16,
    fontFamily: "Open Sans",
  },
  mainContainer: {
    height: 175,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
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
  avgThroughput: number;
};

const KPIView = ({ valueDemandKpi, isLoading, avgThroughput }: KPIProps) => {
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
      {avgThroughput ? (
        <Typography className={classes.footer}>
          ( Avg. of {avgThroughput} flow items per week )
        </Typography>
      ) : null}
    </Box>
  );
};

type Props = {
  data?: ThroughputWidgetData;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const Throughput = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const styles = useStyles();
  const tabComponents: React.ReactNode[] = ThroughputTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Total Work Completed"
        isEmpty={!isLoading && (data === undefined || isEmpty)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={ThroughputTabs}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        <span className={styles.subtitle}>(total)</span>
        <KPIView
          valueDemandKpi={data?.count || 0}
          isLoading={isLoading}
          avgThroughput={data?.avgThroughput || 0}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Total Work Completed" hideWidgetInfo>
        <Box width={220}>
          <span className={styles.subtitle}>(total)</span>
          <KPIView
            valueDemandKpi={30}
            isLoading={isLoading}
            avgThroughput={6}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
