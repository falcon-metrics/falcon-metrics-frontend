import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";
import { StaleWorkWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import {
  StaleWorkTabComponents,
  StaleWorkTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    display: "flex",
    fontFamily: "Open Sans",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
  },
  kpiSubValue: {
    fontSize: 12,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
  },
  footer: {
    fontSize: 12,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
    display: "flex",
    alignSelf: "left",
  },
}));

type KPIProps = {
  stalePercent?: number;
  staleCount?: number;
};

const KPIView = ({ stalePercent = 0, staleCount = 0 }: KPIProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.kpiContainer}>
      <Typography className={classes.kpiValue}>
        {stalePercent ? `${stalePercent}%` : "-"}
      </Typography>
      <Typography className={classes.kpiSubValue}>
        ({staleCount ? `${staleCount}` : "-"} flow items)
      </Typography>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: StaleWorkWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const StaleWork = ({
  isLoading,
  data,
  widgetInfo,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const styles = useStyles();

  if (!isWidgetPreview) {
    const activeLight = getTrafficLightColorByPattern(data?.pattern);
    const tabComponents: React.ReactNode[] = StaleWorkTabComponents;
    
    return (
      <IndicatorCard
        title="Stale Work"
        trafficLight={activeLight}
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={StaleWorkTabs}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        {isLoading && !data?.stalePercent ? (
          <Box mt={2}>
            <DefaultSkeleton />
          </Box>
        ) : null}
        {!isLoading ? (
          <Box className={styles.contentContainer}>
            <KPIView
              stalePercent={data?.stalePercent}
              staleCount={data?.staleCount}
            />
            <Box display="flex" alignSelf="left" flexDirection="column">
              <Typography className={styles.footer}>
                of the work that is in-process had no recent activity.
              </Typography>
            </Box>
          </Box>
        ) : null}
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Stale Work" hideWidgetInfo>
        <Box className={styles.contentContainer} width={220}>
          <KPIView stalePercent={0} staleCount={0} />
          <Box display="flex" alignSelf="left" flexDirection="column">
            <Typography className={styles.footer}>
              of the work that is in-process had no recent activity.
            </Typography>
          </Box>
        </Box>
      </IndicatorCard>
    );
  }
};
