import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  DelayedTabComponents,
  DelayedTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { DelayedItemsWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

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
    marginTop: 16,
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
  },
  footer: {
    marginTop: 6,
    fontSize: 12,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
    display: "flex",
    alignSelf: "left",
  },
}));

type KPIProps = {
  delayedItems?: number;
};

const KPIView = ({ delayedItems }: KPIProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.kpiContainer}>
      <Typography className={classes.kpiValue}>
        {delayedItems ? delayedItems : 0}
      </Typography>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: DelayedItemsWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const DelayedItems = ({
  isLoading,
  data,
  widgetInfo,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const styles = useStyles();
  const tabComponents: React.ReactNode[] = DelayedTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Returned to Backlog"
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={DelayedTabs}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        {isLoading && !data?.count ? (
          <Box mt={2}>
            <DefaultSkeleton />
          </Box>
        ) : null}
        {!isLoading ? (
          <Box className={styles.contentContainer}>
            <KPIView delayedItems={data?.count} />
            <Box display="flex" alignSelf="left" flexDirection="column">
              <Typography className={styles.footer}>
                flow items have been abandoned
              </Typography>
            </Box>
          </Box>
        ) : null}
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Returned to Backlog" hideWidgetInfo>
        <Box className={styles.contentContainer} width={220}>
          <KPIView delayedItems={0} />
          <Box display="flex" alignSelf="left" flexDirection="column">
            <Typography className={styles.footer}>
              flow items have been abandoned
            </Typography>
          </Box>
        </Box>
      </IndicatorCard>
    );
  }
};
