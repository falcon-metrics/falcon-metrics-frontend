import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  DiscardedBeforeStartTabComponents,
  DiscardedBeforeStartTabComponentsWithoutReason,
  DiscardedBeforeStartTabs,
  DiscardedBeforeStartTabsWithoutReason,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { DiscardedBeforeStartWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

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
  description: {
    fontSize: 14,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
    marginBottom: 7,
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
  value: number;
};

const KPIView = ({ value }: KPIProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.kpiContainer}>
      <Typography className={classes.kpiValue}>{value}</Typography>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: DiscardedBeforeStartWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const DiscardedBeforeStart = ({
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
    const tabComponents: React.ReactNode[] = customProps.data
      ? DiscardedBeforeStartTabComponents
      : DiscardedBeforeStartTabComponentsWithoutReason;
    const tabViewTitles = customProps.data
      ? DiscardedBeforeStartTabs
      : DiscardedBeforeStartTabsWithoutReason;

    return (
      <IndicatorCard
        title="Cancelled Work"
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={tabViewTitles}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        {isLoading && !data?.discardedCount ? (
          <Box mt={2}>
            <DefaultSkeleton />
          </Box>
        ) : null}
        {!isLoading ? (
          <Box className={styles.contentContainer}>
            <KPIView value={data?.discardedCount || 0} />
            <Box display="flex" alignSelf="left" flexDirection="column">
              <Typography className={styles.footer}>
                flow items were discarded
                <br />
                before the commitment point
              </Typography>
            </Box>
          </Box>
        ) : null}
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Cancelled Work" hideWidgetInfo>
        <Box className={styles.contentContainer} width={220}>
          <KPIView value={0} />
          <Box display="flex" alignSelf="left" flexDirection="column">
            <Typography className={styles.footer}>
              flow items were discarded
              <br />
              before the commitment point
            </Typography>
          </Box>
        </Box>
      </IndicatorCard>
    );
  }
};
